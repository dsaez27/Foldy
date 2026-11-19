import { I18N, detectInitialLang } from './i18n.js';
import { P } from './platform.js';

// Copia segura de un mapa {idConversación: valor}: descarta arrays, claves peligrosas y valores inválidos.
export function sanitizeMap(src, mapValue) {
  const out = {};
  if (!src || typeof src !== 'object' || Array.isArray(src)) return out;
  for (const key of Object.keys(src)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    const v = mapValue(src[key]);
    if (v !== undefined) out[key] = v;
  }
  return out;
}

// Convierte lo guardado (JSON ya parseado) en un estado válido; descarta datos corruptos.
export function normalizeStoredState(parsed, defaultLang) {
  const isPlainObj = (o) => o && typeof o === 'object' && !Array.isArray(o);
  parsed = isPlainObj(parsed) ? parsed : {};
  const lang = parsed.lang === 'en' || parsed.lang === 'es' ? parsed.lang : defaultLang;
  const fallbackPrompts = (I18N[lang]?.defaultPrompts || I18N.es.defaultPrompts).map((p) => ({ ...p }));
  return {
    lang,
    folders: Array.isArray(parsed.folders)
      ? parsed.folders
          .filter((f) => f && typeof f.id === 'string' && typeof f.name === 'string')
          .map((f) => ({
            id: f.id,
            name: f.name,
            color: /^#[0-9a-fA-F]{6}$/.test(f.color) ? f.color : '#4285f4',
            keywords: Array.isArray(f.keywords)
              ? f.keywords.filter((k) => typeof k === 'string').map((k) => k.toLowerCase())
              : []
          }))
      : [],
    prompts: Array.isArray(parsed.prompts)
      ? parsed.prompts
          .filter((p) => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.content === 'string')
          .map((p) => ({
            id: p.id,
            title: p.title,
            content: p.content
          }))
      : fallbackPrompts,
    assignments: sanitizeMap(parsed.assignments, (v) => (typeof v === 'string' && v ? v : undefined)),
    protectedIds: sanitizeMap(parsed.protectedIds, (v) => (v ? true : undefined)),
    minimized: !!parsed.minimized,
    pos:
      parsed.pos && Number.isFinite(parsed.pos.left) && Number.isFinite(parsed.pos.bottom)
        ? { left: parsed.pos.left, bottom: parsed.pos.bottom }
        : null,
    toolbarPos:
      parsed.toolbarPos && Number.isFinite(parsed.toolbarPos.left) && Number.isFinite(parsed.toolbarPos.top)
        ? { left: parsed.toolbarPos.left, top: parsed.toolbarPos.top }
        : null,
    // Última vista usada (filtro, orden y disposición de la barra) para retomarla tras recargar la página.
    view: {
      filter: typeof parsed.view?.filter === 'string' ? parsed.view.filter : 'ALL',
      sort: ['DEFAULT', 'AZ', 'ZA'].includes(parsed.view?.sort) ? parsed.view.sort : 'DEFAULT',
      toolbarCollapsed: !!parsed.view?.toolbarCollapsed,
      toolbarVertical: !!parsed.view?.toolbarVertical
    }
  };
}

export function loadFolderData() {
  const defaultLang = detectInitialLang();
  try {
    const raw =
      localStorage.getItem(P.storageKey) ||
      (P.legacyStorageKey ? localStorage.getItem(P.legacyStorageKey) : null);
    if (raw) {
      return normalizeStoredState(JSON.parse(raw), defaultLang);
    }
  } catch (_) {}

  const initial = {
    lang: defaultLang,
    folders: I18N[defaultLang].defaultFolders.map((f) => ({ ...f, keywords: [...f.keywords] })),
    prompts: I18N[defaultLang].defaultPrompts.map((p) => ({ ...p })),
    assignments: {},
    protectedIds: {},
    minimized: false,
    pos: null,
    toolbarPos: null,
    view: { filter: 'ALL', sort: 'DEFAULT', toolbarCollapsed: false, toolbarVertical: false }
  };
  saveFolderData(initial);
  return initial;
}

let lastSelfWrittenSyncJson = null;

function buildQuotaSafeSyncPayload(syncPayload) {
  const rawJson = JSON.stringify(syncPayload);
  if (rawJson.length <= 7200) return { payload: syncPayload, json: rawJson };

  const base = {
    lang: syncPayload.lang,
    minimized: !!syncPayload.minimized,
    folders: Array.isArray(syncPayload.folders) ? syncPayload.folders : [],
    prompts: Array.isArray(syncPayload.prompts) ? syncPayload.prompts.slice(0, 15) : [],
    protectedIds: {},
    assignments: {}
  };

  let size = JSON.stringify(base).length;
  const protEntries = Object.entries(syncPayload.protectedIds || {});
  for (let i = protEntries.length - 1; i >= 0; i--) {
    const [k, v] = protEntries[i];
    const entryLen = k.length + 10;
    if (size + entryLen > 4500) break;
    base.protectedIds[k] = v;
    size += entryLen;
  }

  const assignEntries = Object.entries(syncPayload.assignments || {});
  for (let i = assignEntries.length - 1; i >= 0; i--) {
    const [k, v] = assignEntries[i];
    const entryLen = k.length + String(v).length + 8;
    if (size + entryLen > 7000) break;
    base.assignments[k] = v;
    size += entryLen;
  }

  let finalJson = JSON.stringify(base);
  if (finalJson.length > 7400) {
    base.prompts = [];
    finalJson = JSON.stringify(base);
  }
  return { payload: base, json: finalJson };
}

export function saveFolderData(data, options = {}) {
  try {
    localStorage.setItem(P.storageKey, JSON.stringify(data));
  } catch (_) {}

  if (options.localOnly) return;

  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.sync?.set) {
      const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...syncPayload } = data;
      const { payload, json: nextJson } = buildQuotaSafeSyncPayload(syncPayload);
      if (nextJson === lastSelfWrittenSyncJson) return;
      lastSelfWrittenSyncJson = nextJson;
      chrome.storage.sync.set({ [P.storageKey]: payload }, () => {
        void chrome.runtime?.lastError;
      });
    }
  } catch (_) {}
}

function mergeFoldersOrPrompts(cloudArr, localArr) {
  if (!Array.isArray(cloudArr) || cloudArr.length === 0) return Array.isArray(localArr) ? localArr : [];
  if (!Array.isArray(localArr) || localArr.length === 0) return cloudArr;
  const seen = new Set(cloudArr.map((item) => item?.id).filter(Boolean));
  const combined = [...cloudArr];
  for (const item of localArr) {
    if (item?.id && !seen.has(item.id)) {
      seen.add(item.id);
      combined.push(item);
    }
  }
  return combined;
}

/**
 * Sincroniza bidireccionalmente con `chrome.storage.sync` para compartir carpetas,
 * asignaciones, protegidos y prompts entre dispositivos con la cuenta del navegador.
 */
export function initCloudSync(getState, applyIncoming) {
  try {
    if (typeof chrome === 'undefined' || !chrome.storage?.sync?.get) return;

    chrome.storage.sync.get([P.storageKey], (res) => {
      try {
        void chrome.runtime?.lastError;
        const cloudData = res?.[P.storageKey];
        const current = getState();
        if (cloudData && typeof cloudData === 'object') {
          const mergedRaw = {
            ...current,
            ...cloudData,
            folders: mergeFoldersOrPrompts(cloudData.folders, current.folders),
            prompts: mergeFoldersOrPrompts(cloudData.prompts, current.prompts),
            assignments: { ...(current.assignments || {}), ...(cloudData.assignments || {}) },
            protectedIds: { ...(current.protectedIds || {}), ...(cloudData.protectedIds || {}) },
            pos: current.pos,
            toolbarPos: current.toolbarPos,
            view: current.view
          };
          const merged = normalizeStoredState(mergedRaw, current.lang);
          const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...syncPayload } = merged;
          lastSelfWrittenSyncJson = buildQuotaSafeSyncPayload(syncPayload).json;
          localStorage.setItem(P.storageKey, JSON.stringify(merged));
          applyIncoming(merged);
        } else {
          saveFolderData(current);
        }
      } catch (_) {}
    });

    if (chrome.storage.onChanged?.addListener) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync' || !changes[P.storageKey]?.newValue) return;
        try {
          const incomingVal = changes[P.storageKey].newValue;
          const incomingJson = JSON.stringify(incomingVal);
          if (incomingJson === lastSelfWrittenSyncJson) return;

          const current = getState();
          const merged = normalizeStoredState(
            {
              ...incomingVal,
              pos: current.pos,
              toolbarPos: current.toolbarPos,
              view: current.view
            },
            current.lang
          );
          lastSelfWrittenSyncJson = incomingJson;
          localStorage.setItem(P.storageKey, JSON.stringify(merged));
          applyIncoming(merged);
        } catch (_) {}
      });
    }
  } catch (_) {}
}
