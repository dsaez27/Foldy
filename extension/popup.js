const PLATFORM_LIST = [
  { key: 'gemini', name: 'Google Gemini', host: 'gemini.google.com', url: 'https://gemini.google.com/app', storageKey: 'gcm_folders_data_v2', color: '#4285f4' },
  { key: 'chatgpt', name: 'OpenAI ChatGPT', host: 'chatgpt.com', altHost: 'chat.openai.com', url: 'https://chatgpt.com/', storageKey: 'gcm_chatgpt_folders_data_v1', color: '#10a37f' },
  { key: 'claude', name: 'Anthropic Claude', host: 'claude.ai', url: 'https://claude.ai/new', storageKey: 'gcm_claude_folders_data_v1', color: '#d97757' },
  { key: 'deepseek', name: 'DeepSeek Chat', host: 'deepseek.com', url: 'https://chat.deepseek.com/', storageKey: 'gcm_deepseek_folders_data_v1', color: '#4d6bfe' },
  { key: 'opencode', name: 'OpenCode AI', host: 'opencode.ai', url: 'https://opencode.ai/', storageKey: 'gcm_opencode_folders_data_v1', color: '#a142f4' }
];

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    node.setAttribute(k, String(v));
  }
  for (const c of children) {
    node.appendChild(c);
  }
  return node;
}

const POPUP_ICONS = {
  folder: () =>
    svgEl('svg', { viewBox: '0 0 24 24', width: 11.5, height: 11.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 2.1, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      svgEl('path', { d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z' })
    ]),
  chat: () =>
    svgEl('svg', { viewBox: '0 0 24 24', width: 11.5, height: 11.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 2.1, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      svgEl('path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' })
    ]),
  lock: () =>
    svgEl('svg', { viewBox: '0 0 24 24', width: 11.5, height: 11.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 2.1, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      svgEl('rect', { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
      svgEl('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
    ])
};

function makeStatPill(iconBuilder, count) {
  const wrap = document.createElement('span');
  wrap.className = 'cf-stat-item';
  wrap.appendChild(iconBuilder());
  const num = document.createElement('span');
  num.textContent = String(count);
  wrap.appendChild(num);
  return wrap;
}

function detectActivePlatformKey(urlStr) {
  if (!urlStr) return null;
  try {
    const { hostname } = new URL(urlStr);
    const found = PLATFORM_LIST.find(
      (p) => hostname.endsWith(p.host) || (p.altHost && hostname.endsWith(p.altHost))
    );
    return found ? found.key : null;
  } catch (_) {
    return null;
  }
}

const POPUP_I18N = {
  es: {
    syncActive: 'Cloud Sync',
    quotaTrackTitle: 'Uso de cuota de chrome.storage.sync por plataforma (Máx 8 KB)',
    platformsTitle: 'Plataformas IA Soportadas',
    actionsTitle: 'Acciones en Pestaña Activa',
    activeBadge: 'ACTIVA',
    statsTooltip: (f, c, l) => `${f} carpetas · ${c} chats en carpetas · ${l} protegidos`,
    btnPanel: 'Panel',
    btnPrompts: 'Prompts',
    btnBackup: 'Guardar',
    btnImport: 'Importar',
    inactiveHint: 'Abre una pestaña de Gemini, ChatGPT, Claude, DeepSeek u OpenCode para usar estas acciones.',
    footerShortcuts: ['Atajos: ', ' Panel · ', ' Buscar'],
    langBtnTitle: 'Cambiar idioma (Español / English)'
  },
  en: {
    syncActive: 'Cloud Sync',
    quotaTrackTitle: 'chrome.storage.sync quota usage per platform (Max 8 KB)',
    platformsTitle: 'Supported AI Platforms',
    actionsTitle: 'Active Tab Actions',
    activeBadge: 'ACTIVE',
    statsTooltip: (f, c, l) => `${f} folders · ${c} chats in folders · ${l} protected`,
    btnPanel: 'Panel',
    btnPrompts: 'Prompts',
    btnBackup: 'Backup',
    btnImport: 'Import',
    inactiveHint: 'Open a Gemini, ChatGPT, Claude, DeepSeek or OpenCode tab to use these actions.',
    footerShortcuts: ['Shortcuts: ', ' Panel · ', ' Search'],
    langBtnTitle: 'Switch language (English / Español)'
  }
};

let currentPopupLang = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
let cachedSyncData = {};
let cachedActiveKey = null;

function applyPopupTranslations() {
  const tr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('cf-lang-label', currentPopupLang.toUpperCase());
  const langBtn = document.getElementById('cf-lang-btn');
  if (langBtn) langBtn.title = tr.langBtnTitle;
  setTxt('cf-sync-text', tr.syncActive);
  const quotaTrack = document.getElementById('cf-quota-track');
  if (quotaTrack) quotaTrack.title = tr.quotaTrackTitle;
  setTxt('cf-platforms-title', tr.platformsTitle);
  setTxt('cf-actions-title', tr.actionsTitle);
  setTxt('cf-lbl-toggle', tr.btnPanel);
  setTxt('cf-lbl-prompts', tr.btnPrompts);
  setTxt('cf-lbl-backup', tr.btnBackup);
  setTxt('cf-lbl-import', tr.btnImport);
  setTxt('cf-inactive-hint', tr.inactiveHint);

  const footer = document.getElementById('cf-footer-text');
  if (footer) {
    footer.textContent = '';
    footer.appendChild(document.createTextNode(tr.footerShortcuts[0]));
    const k1 = document.createElement('kbd');
    k1.textContent = 'Alt+Shift+F';
    footer.appendChild(k1);
    footer.appendChild(document.createTextNode(tr.footerShortcuts[1]));
    const k2 = document.createElement('kbd');
    k2.textContent = 'Alt+Shift+S';
    footer.appendChild(k2);
    footer.appendChild(document.createTextNode(tr.footerShortcuts[2]));
  }
}

const SYNC_ITEM_QUOTA_BYTES = 8192; // chrome.storage.sync.QUOTA_BYTES_PER_ITEM

function measureKeyBytes(storageKey, dataObj) {
  try {
    if (!dataObj || Object.keys(dataObj).length === 0) return 0;
    const raw = JSON.stringify(dataObj);
    return new Blob([raw]).size + storageKey.length;
  } catch (_) {
    return 0;
  }
}

function updateQuotaMeter(syncData = {}, activePlatformKey = null) {
  const quotaText = document.getElementById('cf-quota-text');
  const quotaFill = document.getElementById('cf-quota-fill');
  if (!quotaText || !quotaFill) return;

  let targetBytes = 0;
  const activePlat = PLATFORM_LIST.find((p) => p.key === activePlatformKey);
  if (activePlat && syncData[activePlat.storageKey]) {
    targetBytes = measureKeyBytes(activePlat.storageKey, syncData[activePlat.storageKey]);
  } else {
    PLATFORM_LIST.forEach((p) => {
      const b = measureKeyBytes(p.storageKey, syncData[p.storageKey]);
      if (b > targetBytes) targetBytes = b;
    });
  }

  const kbUsed = (targetBytes / 1024).toFixed(1);
  const pct = Math.min(100, Math.round((targetBytes / SYNC_ITEM_QUOTA_BYTES) * 100));
  quotaText.textContent = `${kbUsed} / 8.0 KB`;
  quotaFill.style.width = `${targetBytes > 0 ? Math.max(4, pct) : 0}%`;
  quotaFill.dataset.level = pct >= 85 ? 'danger' : pct >= 65 ? 'warn' : 'ok';
}

function renderPlatforms(syncData = {}, activePlatformKey = null) {
  const container = document.getElementById('cf-platforms-list');
  if (!container) return;
  container.textContent = '';
  const tr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;

  updateQuotaMeter(syncData, activePlatformKey);

  PLATFORM_LIST.forEach((p) => {
    const data = syncData[p.storageKey] || {};
    const foldersCount = Array.isArray(data.folders) ? data.folders.length : 0;
    const assignedCount = data.assignments && typeof data.assignments === 'object' ? Object.keys(data.assignments).length : 0;
    const lockedCount = data.protectedIds && typeof data.protectedIds === 'object' ? Object.keys(data.protectedIds).length : 0;
    const keyBytes = measureKeyBytes(p.storageKey, data);

    const isCurrent = p.key === activePlatformKey;
    const card = document.createElement('a');
    card.className = 'cf-platform-card' + (isCurrent ? ' cf-active-platform' : '');
    card.style.setProperty('--cf-plat-color', p.color);
    card.href = p.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const topRow = document.createElement('div');
    topRow.className = 'cf-platform-top';

    const left = document.createElement('div');
    left.className = 'cf-platform-left';

    const dot = document.createElement('span');
    dot.className = 'cf-platform-dot';
    dot.style.backgroundColor = p.color;
    dot.style.boxShadow = `0 0 8px ${p.color}`;

    const name = document.createElement('span');
    name.className = 'cf-platform-name';
    name.textContent = p.name;

    left.appendChild(dot);
    left.appendChild(name);

    if (isCurrent) {
      const badge = document.createElement('span');
      badge.className = 'cf-live-badge';
      badge.textContent = tr.activeBadge;
      left.appendChild(badge);
    }

    const stats = document.createElement('span');
    stats.className = 'cf-platform-stats';
    stats.title = `${tr.statsTooltip(foldersCount, assignedCount, lockedCount)} · ${(keyBytes / 1024).toFixed(1)}/8.0 KB`;
    stats.appendChild(makeStatPill(POPUP_ICONS.folder, foldersCount));
    stats.appendChild(makeStatPill(POPUP_ICONS.chat, assignedCount));
    stats.appendChild(makeStatPill(POPUP_ICONS.lock, lockedCount));

    topRow.appendChild(left);
    topRow.appendChild(stats);

    const meterTrack = document.createElement('div');
    meterTrack.className = 'cf-card-meter';

    const totalActivity = Math.max(10, assignedCount + lockedCount);
    const assignedPct = Math.min(100, Math.round((assignedCount / totalActivity) * 100));
    const lockedPct = Math.min(100 - assignedPct, Math.round((lockedCount / totalActivity) * 100));

    const fillAssigned = document.createElement('span');
    fillAssigned.className = 'cf-card-meter-assigned';
    fillAssigned.style.width = `${assignedPct}%`;

    const fillLocked = document.createElement('span');
    fillLocked.className = 'cf-card-meter-locked';
    fillLocked.style.width = `${lockedPct}%`;

    meterTrack.appendChild(fillAssigned);
    meterTrack.appendChild(fillLocked);

    card.appendChild(topRow);
    card.appendChild(meterTrack);
    container.appendChild(card);
  });
}

function sendToActiveTab(action, extra = {}, closePopup = true) {
  if (typeof chrome === 'undefined' || !chrome.tabs?.query) return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs?.[0];
    if (!activeTab?.id) return;
    chrome.tabs.sendMessage(activeTab.id, { action, ...extra }, () => {
      void chrome.runtime?.lastError;
      if (closePopup) window.close();
    });
  });
}

function togglePopupLanguage() {
  currentPopupLang = currentPopupLang === 'es' ? 'en' : 'es';
  applyPopupTranslations();
  renderPlatforms(cachedSyncData, cachedActiveKey);

  // Actualizar el idioma en el almacenamiento sincronizado solo si ya existe un estado válido con carpetas
  if (typeof chrome !== 'undefined' && chrome.storage?.sync?.set) {
    const targetPlatform = PLATFORM_LIST.find((p) => p.key === cachedActiveKey);
    if (targetPlatform) {
      const existing = cachedSyncData[targetPlatform.storageKey];
      if (existing && typeof existing === 'object' && Array.isArray(existing.folders)) {
        cachedSyncData[targetPlatform.storageKey] = { ...existing, lang: currentPopupLang };
        chrome.storage.sync.set({ [targetPlatform.storageKey]: cachedSyncData[targetPlatform.storageKey] });
      }
    } else {
      const patch = {};
      PLATFORM_LIST.forEach((p) => {
        const existing = cachedSyncData[p.storageKey];
        if (existing && typeof existing === 'object' && Array.isArray(existing.folders)) {
          cachedSyncData[p.storageKey] = { ...existing, lang: currentPopupLang };
          patch[p.storageKey] = cachedSyncData[p.storageKey];
        }
      });
      if (Object.keys(patch).length > 0) {
        chrome.storage.sync.set(patch);
      }
    }
  }

  sendToActiveTab('SET_LANG', { lang: currentPopupLang }, false);
}

function triggerPopupBackupImport() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      sendToActiveTab('IMPORT_BACKUP', { rawJson: String(reader.result) }, true);
    };
    reader.readAsText(file);
  });
  input.click();
}

document.addEventListener('DOMContentLoaded', () => {
  applyPopupTranslations();
  renderPlatforms({}, null);

  const verEl = document.getElementById('cf-version');
  if (verEl && typeof chrome !== 'undefined' && chrome.runtime?.getManifest) {
    verEl.textContent = `v${chrome.runtime.getManifest().version}`;
  }

  const keys = PLATFORM_LIST.map((p) => p.storageKey);

  const initUI = (activeUrl = '', activeTabId = null) => {
    cachedActiveKey = detectActivePlatformKey(activeUrl);
    const actionsSection = document.getElementById('cf-active-actions');
    const hintEl = document.getElementById('cf-inactive-hint');
    const btns = document.querySelectorAll('.cf-actions-row .cf-btn');

    if (!cachedActiveKey) {
      actionsSection?.classList.add('cf-disabled-section');
      btns.forEach((b) => {
        b.disabled = true;
      });
      if (hintEl) hintEl.style.display = 'block';
    } else {
      if (hintEl) hintEl.style.display = 'none';
    }

    if (typeof chrome !== 'undefined' && chrome.storage?.sync?.get) {
      chrome.storage.sync.get(keys, (res) => {
        cachedSyncData = res || {};
        const activePlatform = PLATFORM_LIST.find((p) => p.key === cachedActiveKey);
        const syncedLang =
          (activePlatform && cachedSyncData[activePlatform.storageKey]?.lang) ||
          PLATFORM_LIST.map((p) => cachedSyncData[p.storageKey]?.lang).find((l) => l === 'es' || l === 'en');
        if (syncedLang === 'es' || syncedLang === 'en') {
          currentPopupLang = syncedLang;
        }
        applyPopupTranslations();
        renderPlatforms(cachedSyncData, cachedActiveKey);
      });
    } else {
      applyPopupTranslations();
      renderPlatforms({}, cachedActiveKey);
    }

    if (cachedActiveKey && activeTabId && typeof chrome !== 'undefined' && chrome.tabs?.sendMessage) {
      chrome.tabs.sendMessage(activeTabId, { action: 'GET_STATE' }, (resp) => {
        void chrome.runtime?.lastError;
        if (resp?.lang === 'es' || resp?.lang === 'en') {
          currentPopupLang = resp.lang;
          applyPopupTranslations();
          renderPlatforms(cachedSyncData, cachedActiveKey);
        }
      });
    }
  };

  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      initUI(tabs?.[0]?.url || '', tabs?.[0]?.id || null);
    });
  } else {
    initUI('');
  }

  document.getElementById('cf-lang-btn')?.addEventListener('click', togglePopupLanguage);
  document.getElementById('cf-btn-toggle')?.addEventListener('click', () => sendToActiveTab('TOGGLE_PANEL'));
  document.getElementById('cf-btn-prompts')?.addEventListener('click', () => sendToActiveTab('OPEN_PROMPTS'));
  document.getElementById('cf-btn-backup')?.addEventListener('click', () => sendToActiveTab('EXPORT_BACKUP'));
  document.getElementById('cf-btn-import')?.addEventListener('click', triggerPopupBackupImport);
});
