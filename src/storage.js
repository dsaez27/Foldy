import { I18N, detectInitialLang } from './i18n.js';
import { P, THEME_STORAGE_KEY, applyThemePreset, normalizeThemePreset } from './platform.js';

export const SHARED_CONFIG_KEY = 'gcm_shared_config_v1';

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
let lastSelfWrittenSharedJson = null;
let lastSelfWrittenSharedContentJson = null;

function getCurrentThemePreset() {
  try {
    const attr = typeof document !== 'undefined' ? document.documentElement?.getAttribute('data-gcm-style') : null;
    if (attr) return normalizeThemePreset(attr);
    if (typeof localStorage !== 'undefined') {
      return normalizeThemePreset(localStorage.getItem(THEME_STORAGE_KEY));
    }
  } catch (_) {}
  return 'adaptive';
}

function buildQuotaSafeSharedPayload(sharedPayload) {
  const base = {
    folders: Array.isArray(sharedPayload.folders) ? sharedPayload.folders : [],
    prompts: Array.isArray(sharedPayload.prompts) ? sharedPayload.prompts : [],
    lang: sharedPayload.lang === 'en' || sharedPayload.lang === 'es' ? sharedPayload.lang : 'es',
    themePreset: normalizeThemePreset(sharedPayload.themePreset),
    updatedAt: Number.isFinite(sharedPayload.updatedAt) ? sharedPayload.updatedAt : Date.now()
  };

  let json = JSON.stringify(base);
  if (json.length <= 7200) return { payload: base, json };

  base.prompts = base.prompts.slice(0, 15);
  json = JSON.stringify(base);
  while (json.length > 7200 && base.prompts.length > 0) {
    base.prompts = base.prompts.slice(0, Math.floor(base.prompts.length / 2));
    json = JSON.stringify(base);
  }
  while (json.length > 7400 && base.folders.length > 0) {
    base.folders = base.folders.slice(0, -1);
    json = JSON.stringify(base);
  }
  return { payload: base, json };
}

function sharedContentSignature(sharedPayload) {
  return JSON.stringify({
    folders: sharedPayload.folders,
    prompts: sharedPayload.prompts,
    lang: sharedPayload.lang,
    themePreset: sharedPayload.themePreset
  });
}

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
      const { payload: sharedPayload, json: nextSharedJson } = buildQuotaSafeSharedPayload({
        folders: data.folders,
        prompts: data.prompts,
        lang: data.lang,
        themePreset: getCurrentThemePreset(),
        updatedAt: Date.now()
      });
      const nextSharedContentJson = sharedContentSignature(sharedPayload);

      const patch = {};
      if (nextJson !== lastSelfWrittenSyncJson) {
        lastSelfWrittenSyncJson = nextJson;
        patch[P.storageKey] = payload;
      }
      if (nextSharedContentJson !== lastSelfWrittenSharedContentJson) {
        lastSelfWrittenSharedContentJson = nextSharedContentJson;
        lastSelfWrittenSharedJson = nextSharedJson;
        patch[SHARED_CONFIG_KEY] = sharedPayload;
      }

      if (Object.keys(patch).length > 0) {
        chrome.storage.sync.set(patch, () => {
          void chrome.runtime?.lastError;
        });
      }
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

    chrome.storage.sync.get([P.storageKey, SHARED_CONFIG_KEY], (res) => {
      try {
        void chrome.runtime?.lastError;
        const cloudData = res?.[P.storageKey];
        const sharedData = res?.[SHARED_CONFIG_KEY];
        const current = getState();
        const hasCloud = !!(cloudData && typeof cloudData === 'object');
        const hasShared = !!(sharedData && typeof sharedData === 'object');

        if (hasCloud || hasShared) {
          if (hasShared) {
            lastSelfWrittenSharedJson = JSON.stringify(sharedData);
            if (sharedData.themePreset) {
              const normalizedTheme = applyThemePreset(sharedData.themePreset, { persist: false });
              try {
                if (typeof localStorage !== 'undefined') {
                  localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
                }
              } catch (_) {}
            }
          }

          const mergedFolders = mergeFoldersOrPrompts(
            hasShared ? sharedData.folders : null,
            mergeFoldersOrPrompts(hasCloud ? cloudData.folders : null, current.folders)
          );
          const mergedPrompts = mergeFoldersOrPrompts(
            hasShared ? sharedData.prompts : null,
            mergeFoldersOrPrompts(hasCloud ? cloudData.prompts : null, current.prompts)
          );

          const mergedRaw = {
            ...current,
            ...(hasCloud ? cloudData : {}),
            lang:
              (hasShared && (sharedData.lang === 'en' || sharedData.lang === 'es') ? sharedData.lang : null) ||
              (hasCloud && (cloudData.lang === 'en' || cloudData.lang === 'es') ? cloudData.lang : null) ||
              current.lang,
            folders: mergedFolders,
            prompts: mergedPrompts,
            assignments: { ...(current.assignments || {}), ...(hasCloud ? cloudData.assignments || {} : {}) },
            protectedIds: { ...(current.protectedIds || {}), ...(hasCloud ? cloudData.protectedIds || {} : {}) },
            pos: current.pos,
            toolbarPos: current.toolbarPos,
            view: current.view
          };
          const merged = normalizeStoredState(mergedRaw, current.lang);
          const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...syncPayload } = merged;
          lastSelfWrittenSyncJson = buildQuotaSafeSyncPayload(syncPayload).json;
          if (hasShared) {
            lastSelfWrittenSharedContentJson = sharedContentSignature({
              folders: merged.folders,
              prompts: merged.prompts,
              lang: merged.lang,
              themePreset: sharedData.themePreset || getCurrentThemePreset()
            });
          }
          localStorage.setItem(P.storageKey, JSON.stringify(merged));
          applyIncoming(merged);
        } else {
          saveFolderData(current);
        }
      } catch (_) {}
    });

    if (chrome.storage.onChanged?.addListener) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync') return;
        const platformChange = changes[P.storageKey]?.newValue;
        const sharedChange = changes[SHARED_CONFIG_KEY]?.newValue;
        if (!platformChange && !sharedChange) return;

        try {
          const current = getState();
          let nextRaw = { ...current };
          let changed = false;

          if (platformChange && typeof platformChange === 'object') {
            const incomingJson = JSON.stringify(platformChange);
            if (incomingJson !== lastSelfWrittenSyncJson) {
              lastSelfWrittenSyncJson = incomingJson;
              nextRaw = {
                ...platformChange,
                pos: current.pos,
                toolbarPos: current.toolbarPos,
                view: current.view
              };
              changed = true;
            }
          }

          if (sharedChange && typeof sharedChange === 'object') {
            const incomingSharedJson = JSON.stringify(sharedChange);
            if (incomingSharedJson !== lastSelfWrittenSharedJson) {
              lastSelfWrittenSharedJson = incomingSharedJson;
              if (sharedChange.themePreset) {
                const normalizedTheme = applyThemePreset(sharedChange.themePreset, { persist: false });
                try {
                  if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
                  }
                } catch (_) {}
              }
              nextRaw = {
                ...nextRaw,
                folders: Array.isArray(sharedChange.folders) ? sharedChange.folders : nextRaw.folders,
                prompts: Array.isArray(sharedChange.prompts) ? sharedChange.prompts : nextRaw.prompts,
                lang: sharedChange.lang === 'en' || sharedChange.lang === 'es' ? sharedChange.lang : nextRaw.lang,
                assignments: nextRaw.assignments,
                protectedIds: nextRaw.protectedIds,
                pos: current.pos,
                toolbarPos: current.toolbarPos,
                view: current.view
              };
              lastSelfWrittenSharedContentJson = sharedContentSignature({
                folders: nextRaw.folders,
                prompts: nextRaw.prompts,
                lang: nextRaw.lang,
                themePreset: sharedChange.themePreset || getCurrentThemePreset()
              });
              changed = true;
            }
          }

          if (!changed) return;

          const merged = normalizeStoredState(nextRaw, current.lang);
          localStorage.setItem(P.storageKey, JSON.stringify(merged));
          applyIncoming(merged);
        } catch (_) {}
      });
    }
  } catch (_) {}
}
