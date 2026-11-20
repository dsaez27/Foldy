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

const THEME_STORAGE_KEY = 'gcm_ui_theme_preset';
const SHARED_CONFIG_KEY = 'gcm_shared_config_v1';
const GIST_FILENAME = 'foldy-sync.json';
const GIST_STORAGE_KEY = 'gcm_gist_config';
const THEME_PRESETS = ['adaptive', 'neo-brutal', 'terminal', 'minimal-flat', 'neon-synth'];

function normalizeThemePreset(val) {
  return THEME_PRESETS.includes(val) ? val : 'adaptive';
}

const POPUP_I18N = {
  es: {
    syncActive: 'Cloud Sync',
    quotaTrackTitle: 'Uso de cuota de chrome.storage.sync por plataforma (Máx 8 KB)',
    platformsTitle: 'Plataformas IA Soportadas',
    actionsTitle: 'Acciones en Pestaña Activa',
    themeTitle: 'Estilo Visual',
    themes: {
      adaptive: { label: 'Adaptativo', title: 'Estilo adaptativo por plataforma' },
      'neo-brutal': { label: 'Neo-Brutal', title: 'Bordes marcados y sombras duras' },
      terminal: { label: 'Terminal', title: 'Estética consola monospace' },
      'minimal-flat': { label: 'Minimal Flat', title: 'Superficies planas sin sombras' },
      'neon-synth': { label: 'Neon Synth', title: 'Brillo neón y contraste oscuro' }
    },
    activeBadge: 'ACTIVA',
    statsTooltip: (f, c, l) => `${f} carpetas · ${c} chats en carpetas · ${l} protegidos`,
    btnPanel: 'Panel',
    btnPrompts: 'Prompts',
    btnBackup: 'Guardar',
    btnImport: 'Importar',
    syncCodeTitle: 'Sincronización Multi-Navegador',
    copySyncCodeBtn: 'Copiar código',
    copySyncCodeTitle: 'Copiar código de sincronización',
    pasteSyncCodeBtn: 'Aplicar',
    pasteSyncCodeTitle: 'Aplicar código de sincronización',
    syncCodePlaceholder: 'Pega código foldy1:...',
    syncCodeCopied: 'Código copiado al portapapeles',
    syncCodeApplied: 'Configuración aplicada y sincronizada',
    syncCodeInvalid: 'Código inválido o corrupto',
    gistTitle: 'GitHub Gist Sync (Opcional)',
    gistTokenPlaceholder: 'GitHub Token (scope: gist)',
    gistIdPlaceholder: 'Gist ID (auto)',
    gistSyncBtn: 'Sincronizar',
    gistClearBtn: 'Limpiar',
    gistSynced: (action) => action === 'pulled' ? 'Gist: config descargada' : action === 'created' ? 'Gist privado creado' : 'Gist actualizado',
    gistError: 'Error de Gist Sync',
    gistCleared: 'Configuración de Gist eliminada',
    inactiveHint: 'Abre una pestaña de Gemini, ChatGPT, Claude, DeepSeek u OpenCode para usar estas acciones.',
    footerShortcuts: ['Atajos: ', ' Panel · ', ' Buscar'],
    langBtnTitle: 'Cambiar idioma (Español / English)'
  },
  en: {
    syncActive: 'Cloud Sync',
    quotaTrackTitle: 'chrome.storage.sync quota usage per platform (Max 8 KB)',
    platformsTitle: 'Supported AI Platforms',
    actionsTitle: 'Active Tab Actions',
    themeTitle: 'Visual Style',
    themes: {
      adaptive: { label: 'Adaptive', title: 'Platform-adaptive glass style' },
      'neo-brutal': { label: 'Neo-Brutal', title: 'Crisp borders and hard offset shadows' },
      terminal: { label: 'Terminal', title: 'Monospace console aesthetic' },
      'minimal-flat': { label: 'Minimal Flat', title: 'Clean flat surfaces without shadows' },
      'neon-synth': { label: 'Neon Synth', title: 'Deep contrast with neon rim glow' }
    },
    activeBadge: 'ACTIVE',
    statsTooltip: (f, c, l) => `${f} folders · ${c} chats in folders · ${l} protected`,
    btnPanel: 'Panel',
    btnPrompts: 'Prompts',
    btnBackup: 'Backup',
    btnImport: 'Import',
    syncCodeTitle: 'Cross-Browser Sync',
    copySyncCodeBtn: 'Copy code',
    copySyncCodeTitle: 'Copy sync code',
    pasteSyncCodeBtn: 'Apply',
    pasteSyncCodeTitle: 'Apply sync code',
    syncCodePlaceholder: 'Paste foldy1:... code',
    syncCodeCopied: 'Sync code copied to clipboard',
    syncCodeApplied: 'Config applied and synced',
    syncCodeInvalid: 'Invalid or corrupted sync code',
    gistTitle: 'GitHub Gist Sync (Optional)',
    gistTokenPlaceholder: 'GitHub Token (scope: gist)',
    gistIdPlaceholder: 'Gist ID (auto)',
    gistSyncBtn: 'Sync',
    gistClearBtn: 'Clear',
    gistSynced: (action) => action === 'pulled' ? 'Gist: pulled newer config' : action === 'created' ? 'Private Gist created' : 'Gist updated',
    gistError: 'Gist Sync failed',
    gistCleared: 'Gist config cleared',
    inactiveHint: 'Open a Gemini, ChatGPT, Claude, DeepSeek or OpenCode tab to use these actions.',
    footerShortcuts: ['Shortcuts: ', ' Panel · ', ' Search'],
    langBtnTitle: 'Switch language (English / Español)'
  }
};

let currentPopupLang = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
let cachedSyncData = {};
let cachedSharedConfig = null;
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
  setTxt('cf-theme-title', tr.themeTitle);
  document.querySelectorAll('#cf-theme-grid .cf-theme-chip').forEach((chip) => {
    const preset = chip.dataset.themePreset;
    const meta = tr.themes?.[preset];
    if (!meta) return;
    chip.title = meta.title;
    const lbl = chip.querySelector('.cf-theme-label');
    if (lbl) lbl.textContent = meta.label;
  });
  setTxt('cf-lbl-toggle', tr.btnPanel);
  setTxt('cf-lbl-prompts', tr.btnPrompts);
  setTxt('cf-lbl-backup', tr.btnBackup);
  setTxt('cf-lbl-import', tr.btnImport);
  setTxt('cf-sync-code-title', tr.syncCodeTitle);
  setTxt('cf-lbl-copy-sync', tr.copySyncCodeBtn);
  setTxt('cf-lbl-apply-sync', tr.pasteSyncCodeBtn);
  const copyBtn = document.getElementById('cf-copy-sync-code');
  if (copyBtn) copyBtn.title = tr.copySyncCodeTitle;
  const applyBtn = document.getElementById('cf-apply-sync-code');
  if (applyBtn) applyBtn.title = tr.pasteSyncCodeTitle;
  const syncInput = document.getElementById('cf-sync-code-input');
  if (syncInput) syncInput.placeholder = tr.syncCodePlaceholder;
  setTxt('cf-gist-summary', tr.gistTitle);
  const gistTokenInput = document.getElementById('cf-gist-token');
  if (gistTokenInput) gistTokenInput.placeholder = tr.gistTokenPlaceholder;
  const gistIdInput = document.getElementById('cf-gist-id');
  if (gistIdInput) gistIdInput.placeholder = tr.gistIdPlaceholder;
  setTxt('cf-gist-sync-btn', tr.gistSyncBtn);
  setTxt('cf-gist-clear-btn', tr.gistClearBtn);
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

  const updatedAt = Date.now();
  const baseShared = buildSharedConfigSnapshot();
  cachedSharedConfig = { ...baseShared, lang: currentPopupLang, updatedAt };
  persistStoragePatch({ [SHARED_CONFIG_KEY]: cachedSharedConfig });

  sendToActiveTab('SET_LANG', { lang: currentPopupLang }, false);
}

function persistStoragePatch(patch) {
  if (typeof chrome !== 'undefined' && chrome.storage?.sync?.set) {
    chrome.storage.sync.set(patch, () => {
      void chrome.runtime?.lastError;
    });
  }
  if (typeof chrome !== 'undefined' && chrome.storage?.local?.set) {
    chrome.storage.local.set(patch, () => {
      void chrome.runtime?.lastError;
    });
  }
}

function mergeUniqueById(lists) {
  const seen = new Set();
  const out = [];
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      if (!item || typeof item !== 'object') continue;
      const key = item.id !== undefined && item.id !== null ? String(item.id) : JSON.stringify(item);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

function buildSharedConfigSnapshot() {
  const currentTheme = normalizeThemePreset(document.body?.getAttribute('data-gcm-style'));
  if (cachedSharedConfig && typeof cachedSharedConfig === 'object') {
    return {
      folders: Array.isArray(cachedSharedConfig.folders) ? cachedSharedConfig.folders : [],
      prompts: Array.isArray(cachedSharedConfig.prompts) ? cachedSharedConfig.prompts : [],
      lang: cachedSharedConfig.lang === 'es' || cachedSharedConfig.lang === 'en' ? cachedSharedConfig.lang : currentPopupLang,
      themePreset: normalizeThemePreset(cachedSharedConfig.themePreset || currentTheme),
      updatedAt: typeof cachedSharedConfig.updatedAt === 'number' ? cachedSharedConfig.updatedAt : Date.now()
    };
  }
  const folderLists = PLATFORM_LIST.map((p) => cachedSyncData[p.storageKey]?.folders);
  const promptLists = PLATFORM_LIST.map((p) => cachedSyncData[p.storageKey]?.prompts);
  return {
    folders: mergeUniqueById(folderLists),
    prompts: mergeUniqueById(promptLists),
    lang: currentPopupLang,
    themePreset: currentTheme,
    updatedAt: Date.now()
  };
}

function bytesToBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(b64) {
  const padded = b64.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((b64.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function encodeSyncCode(config) {
  const payload = {
    folders: Array.isArray(config?.folders) ? config.folders : [],
    prompts: Array.isArray(config?.prompts) ? config.prompts : [],
    lang: config?.lang === 'es' || config?.lang === 'en' ? config.lang : currentPopupLang,
    themePreset: normalizeThemePreset(config?.themePreset),
    updatedAt: typeof config?.updatedAt === 'number' ? config.updatedAt : Date.now()
  };
  let bytes = new TextEncoder().encode(JSON.stringify(payload));
  if (typeof CompressionStream === 'function') {
    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    writer.write(bytes);
    writer.close();
    bytes = new Uint8Array(await new Response(cs.readable).arrayBuffer());
  }
  return `foldy1:${bytesToBase64Url(bytes)}`;
}

async function decodeSyncCode(code) {
  if (typeof code !== 'string') throw new Error('Invalid sync code');
  const trimmed = code.trim();
  if (!trimmed.startsWith('foldy1:')) throw new Error('Invalid sync code prefix');
  let bytes = base64UrlToBytes(trimmed.slice('foldy1:'.length));
  if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
    if (typeof DecompressionStream !== 'function') {
      throw new Error('Gzip decompression unavailable');
    }
    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    bytes = new Uint8Array(await new Response(ds.readable).arrayBuffer());
  }
  const parsed = JSON.parse(new TextDecoder().decode(bytes));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Invalid sync code payload');
  }
  if (!Array.isArray(parsed.folders) || !Array.isArray(parsed.prompts)) {
    throw new Error('Invalid sync code schema');
  }
  return {
    folders: parsed.folders,
    prompts: parsed.prompts,
    lang: parsed.lang === 'es' || parsed.lang === 'en' ? parsed.lang : currentPopupLang,
    themePreset: normalizeThemePreset(parsed.themePreset),
    updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now()
  };
}

let syncStatusTimer = null;
function showSyncStatus(message, status = 'ok') {
  const el = document.getElementById('cf-sync-status');
  if (!el) return;
  el.textContent = message;
  el.dataset.status = status;
  if (syncStatusTimer) clearTimeout(syncStatusTimer);
  syncStatusTimer = setTimeout(() => {
    el.textContent = '';
    delete el.dataset.status;
  }, 3500);
}

async function handleCopySyncCode() {
  const tr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
  try {
    const snapshot = buildSharedConfigSnapshot();
    const code = await encodeSyncCode(snapshot);
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(code);
    } else {
      const input = document.getElementById('cf-sync-code-input');
      if (input) {
        input.value = code;
        input.select();
        document.execCommand('copy');
      }
    }
    showSyncStatus(tr.syncCodeCopied, 'ok');
  } catch (_) {
    showSyncStatus(tr.syncCodeInvalid, 'error');
  }
}

async function handleApplySyncCode() {
  const tr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
  const input = document.getElementById('cf-sync-code-input');
  const raw = input?.value?.trim() || '';
  if (!raw) {
    showSyncStatus(tr.syncCodeInvalid, 'error');
    return;
  }
  try {
    const decoded = await decodeSyncCode(raw);
    cachedSharedConfig = decoded;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, decoded.themePreset);
    } catch (_) {
      // ignore storage errors
    }
    persistStoragePatch({
      [SHARED_CONFIG_KEY]: decoded,
      [THEME_STORAGE_KEY]: decoded.themePreset
    });

    applyPopupThemePreset(decoded.themePreset);
    if (decoded.lang === 'es' || decoded.lang === 'en') {
      currentPopupLang = decoded.lang;
    }
    applyPopupTranslations();
    renderPlatforms(cachedSyncData, cachedActiveKey);

    if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs?.[0];
        if (!activeTab?.id || !chrome.tabs?.sendMessage) return;
        chrome.tabs.sendMessage(activeTab.id, { type: 'SET_THEME_PRESET', preset: decoded.themePreset }, () => {
          void chrome.runtime?.lastError;
        });
        chrome.tabs.sendMessage(activeTab.id, { action: 'SET_LANG', lang: currentPopupLang }, () => {
          void chrome.runtime?.lastError;
        });
      });
    }

    if (input) input.value = '';
    const updatedTr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
    showSyncStatus(updatedTr.syncCodeApplied, 'ok');
  } catch (_) {
    showSyncStatus(tr.syncCodeInvalid, 'error');
  }
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

function applyPopupThemePreset(preset) {
  const normalized = normalizeThemePreset(preset);
  document.body?.setAttribute('data-gcm-style', normalized);
  document.querySelectorAll('#cf-theme-grid .cf-theme-chip').forEach((chip) => {
    const isActive = chip.dataset.themePreset === normalized;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
  return normalized;
}

function selectThemePreset(preset) {
  const normalized = applyPopupThemePreset(preset);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, normalized);
  } catch (_) {
    // ignore storage errors
  }
  const baseShared = buildSharedConfigSnapshot();
  cachedSharedConfig = { ...baseShared, themePreset: normalized, updatedAt: Date.now() };
  persistStoragePatch({
    [THEME_STORAGE_KEY]: normalized,
    [SHARED_CONFIG_KEY]: cachedSharedConfig
  });
  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs?.[0];
      if (!activeTab?.id || !chrome.tabs?.sendMessage) return;
      chrome.tabs.sendMessage(activeTab.id, { type: 'SET_THEME_PRESET', preset: normalized }, () => {
        void chrome.runtime?.lastError;
      });
    });
  }
}

async function syncWithGist({ token, gistId = '', localConfig, fetchFn = fetch }) {
  const cleanToken = String(token || '').trim();
  if (!cleanToken) throw new Error('GitHub token is required');

  const headers = {
    Authorization: `Bearer ${cleanToken}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  let targetId = String(gistId || '').trim();
  if (!targetId) {
    const listRes = await fetchFn('https://api.github.com/gists?per_page=30', {
      headers,
      signal: AbortSignal.timeout?.(10000)
    });
    if (!listRes.ok) throw new Error(`GitHub API ${listRes.status}`);
    const gists = await listRes.json();
    const found = Array.isArray(gists)
      ? gists.find((g) => g?.files && Object.prototype.hasOwnProperty.call(g.files, GIST_FILENAME))
      : null;
    if (found?.id) {
      targetId = found.id;
    } else {
      const createRes = await fetchFn('https://api.github.com/gists', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          public: false,
          description: 'Foldy Sync Config',
          files: { [GIST_FILENAME]: { content: JSON.stringify(localConfig, null, 2) } }
        }),
        signal: AbortSignal.timeout?.(10000)
      });
      if (!createRes.ok) throw new Error(`GitHub API ${createRes.status}`);
      const created = await createRes.json();
      return { action: 'created', gistId: created.id, config: localConfig };
    }
  }

  const getRes = await fetchFn(`https://api.github.com/gists/${encodeURIComponent(targetId)}`, {
    headers,
    signal: AbortSignal.timeout?.(10000)
  });
  if (!getRes.ok) throw new Error(`GitHub API ${getRes.status}`);
  const gistData = await getRes.json();
  const rawContent = gistData?.files?.[GIST_FILENAME]?.content;
  let remoteConfig = null;
  if (rawContent) {
    try {
      remoteConfig = JSON.parse(rawContent);
    } catch (_) {
      remoteConfig = null;
    }
  }

  const remoteUpdated = typeof remoteConfig?.updatedAt === 'number' ? remoteConfig.updatedAt : 0;
  const localUpdated = typeof localConfig?.updatedAt === 'number' ? localConfig.updatedAt : 0;
  if (remoteConfig && remoteUpdated > localUpdated) {
    return { action: 'pulled', gistId: targetId, config: remoteConfig };
  }

  const patchRes = await fetchFn(`https://api.github.com/gists/${encodeURIComponent(targetId)}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      files: { [GIST_FILENAME]: { content: JSON.stringify(localConfig, null, 2) } }
    }),
    signal: AbortSignal.timeout?.(10000)
  });
  if (!patchRes.ok) throw new Error(`GitHub API ${patchRes.status}`);
  return { action: 'pushed', gistId: targetId, config: localConfig };
}

let gistStatusTimer = null;
function showGistStatus(message, status = 'ok') {
  const el = document.getElementById('cf-gist-status');
  if (!el) return;
  el.textContent = message;
  el.dataset.status = status;
  if (gistStatusTimer) clearTimeout(gistStatusTimer);
  gistStatusTimer = setTimeout(() => {
    el.textContent = '';
    delete el.dataset.status;
  }, 4000);
}

let cachedGistConfig = null;

async function runGistSync({ silent = false } = {}) {
  const tr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
  const tokenInput = document.getElementById('cf-gist-token');
  const gistIdInput = document.getElementById('cf-gist-id');
  const syncBtn = document.getElementById('cf-gist-sync-btn');

  const token = (tokenInput?.value ?? cachedGistConfig?.token ?? '').trim();
  const gistId = (gistIdInput?.value ?? cachedGistConfig?.gistId ?? '').trim();
  if (!token) {
    if (!silent) showGistStatus(tr.gistError, 'error');
    return;
  }

  if (syncBtn && !silent) syncBtn.disabled = true;
  try {
    const localConfig = buildSharedConfigSnapshot();
    const result = await syncWithGist({ token, gistId, localConfig });

    if (result.action === 'pulled' && result.config) {
      const pulled = {
        folders: Array.isArray(result.config.folders) ? result.config.folders : [],
        prompts: Array.isArray(result.config.prompts) ? result.config.prompts : [],
        lang: result.config.lang === 'es' || result.config.lang === 'en' ? result.config.lang : currentPopupLang,
        themePreset: normalizeThemePreset(result.config.themePreset),
        updatedAt: typeof result.config.updatedAt === 'number' ? result.config.updatedAt : Date.now()
      };
      cachedSharedConfig = pulled;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, pulled.themePreset);
      } catch (_) {
        // ignore storage errors
      }
      persistStoragePatch({
        [SHARED_CONFIG_KEY]: pulled,
        [THEME_STORAGE_KEY]: pulled.themePreset
      });
      applyPopupThemePreset(pulled.themePreset);
      currentPopupLang = pulled.lang;
      applyPopupTranslations();
      renderPlatforms(cachedSyncData, cachedActiveKey);

      if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs?.[0];
          if (!activeTab?.id || !chrome.tabs?.sendMessage) return;
          chrome.tabs.sendMessage(activeTab.id, { type: 'SET_THEME_PRESET', preset: pulled.themePreset }, () => {
            void chrome.runtime?.lastError;
          });
          chrome.tabs.sendMessage(activeTab.id, { action: 'SET_LANG', lang: currentPopupLang }, () => {
            void chrome.runtime?.lastError;
          });
        });
      }
    }

    cachedGistConfig = { token, gistId: result.gistId, lastSyncAt: Date.now() };
    if (gistIdInput) gistIdInput.value = result.gistId;
    if (typeof chrome !== 'undefined' && chrome.storage?.local?.set) {
      chrome.storage.local.set({ [GIST_STORAGE_KEY]: cachedGistConfig }, () => {
        void chrome.runtime?.lastError;
      });
    }

    const updatedTr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
    if (!silent || result.action === 'pulled') {
      showGistStatus(updatedTr.gistSynced(result.action), 'ok');
    }
  } catch (err) {
    if (!silent) {
      showGistStatus(`${tr.gistError}: ${err?.message || ''}`.trim(), 'error');
    }
  } finally {
    if (syncBtn && !silent) syncBtn.disabled = false;
  }
}

function clearGistConfig() {
  const tr = POPUP_I18N[currentPopupLang] || POPUP_I18N.es;
  cachedGistConfig = null;
  const tokenInput = document.getElementById('cf-gist-token');
  const gistIdInput = document.getElementById('cf-gist-id');
  if (tokenInput) tokenInput.value = '';
  if (gistIdInput) gistIdInput.value = '';
  if (typeof chrome !== 'undefined' && chrome.storage?.local?.remove) {
    chrome.storage.local.remove(GIST_STORAGE_KEY, () => {
      void chrome.runtime?.lastError;
    });
  }
  showGistStatus(tr.gistCleared, 'ok');
}

document.addEventListener('DOMContentLoaded', () => {
  applyPopupTranslations();
  renderPlatforms({}, null);

  let initialTheme = 'adaptive';
  try {
    initialTheme = normalizeThemePreset(localStorage.getItem(THEME_STORAGE_KEY));
  } catch (_) {
    initialTheme = 'adaptive';
  }
  applyPopupThemePreset(initialTheme);

  if (typeof chrome !== 'undefined' && chrome.storage?.local?.get) {
    chrome.storage.local.get([THEME_STORAGE_KEY, SHARED_CONFIG_KEY, GIST_STORAGE_KEY], (res) => {
      void chrome.runtime?.lastError;
      if (res?.[SHARED_CONFIG_KEY] && typeof res[SHARED_CONFIG_KEY] === 'object') {
        cachedSharedConfig = res[SHARED_CONFIG_KEY];
      }
      const localTheme = res?.[THEME_STORAGE_KEY] || res?.[SHARED_CONFIG_KEY]?.themePreset;
      if (localTheme) {
        applyPopupThemePreset(localTheme);
      }
      if (res?.[GIST_STORAGE_KEY] && typeof res[GIST_STORAGE_KEY] === 'object') {
        cachedGistConfig = res[GIST_STORAGE_KEY];
        const tokenInput = document.getElementById('cf-gist-token');
        const gistIdInput = document.getElementById('cf-gist-id');
        if (tokenInput && cachedGistConfig.token) tokenInput.value = cachedGistConfig.token;
        if (gistIdInput && cachedGistConfig.gistId) gistIdInput.value = cachedGistConfig.gistId;
      }
    });
  }

  const verEl = document.getElementById('cf-version');
  if (verEl && typeof chrome !== 'undefined' && chrome.runtime?.getManifest) {
    verEl.textContent = `v${chrome.runtime.getManifest().version}`;
  }

  const keys = [...PLATFORM_LIST.map((p) => p.storageKey), THEME_STORAGE_KEY, SHARED_CONFIG_KEY];

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
        void chrome.runtime?.lastError;
        cachedSyncData = res || {};
        if (res?.[SHARED_CONFIG_KEY] && typeof res[SHARED_CONFIG_KEY] === 'object') {
          cachedSharedConfig = res[SHARED_CONFIG_KEY];
        }
        const syncedTheme = res?.[THEME_STORAGE_KEY] || cachedSharedConfig?.themePreset;
        if (syncedTheme) {
          applyPopupThemePreset(syncedTheme);
        }
        const activePlatform = PLATFORM_LIST.find((p) => p.key === cachedActiveKey);
        const syncedLang =
          cachedSharedConfig?.lang ||
          (activePlatform && cachedSyncData[activePlatform.storageKey]?.lang) ||
          PLATFORM_LIST.map((p) => cachedSyncData[p.storageKey]?.lang).find((l) => l === 'es' || l === 'en');
        if (syncedLang === 'es' || syncedLang === 'en') {
          currentPopupLang = syncedLang;
        }
        applyPopupTranslations();
        renderPlatforms(cachedSyncData, cachedActiveKey);
        if (cachedGistConfig?.token) {
          void runGistSync({ silent: true });
        }
      });
    } else {
      applyPopupTranslations();
      renderPlatforms({}, cachedActiveKey);
      if (cachedGistConfig?.token) {
        void runGistSync({ silent: true });
      }
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

  document.getElementById('cf-theme-grid')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.cf-theme-chip');
    if (!chip) return;
    selectThemePreset(chip.dataset.themePreset);
  });

  document.getElementById('cf-copy-sync-code')?.addEventListener('click', handleCopySyncCode);
  document.getElementById('cf-apply-sync-code')?.addEventListener('click', handleApplySyncCode);
  document.getElementById('cf-sync-code-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplySyncCode();
    }
  });

  document.getElementById('cf-gist-sync-btn')?.addEventListener('click', () => {
    void runGistSync({ silent: false });
  });
  document.getElementById('cf-gist-clear-btn')?.addEventListener('click', clearGistConfig);

  document.getElementById('cf-lang-btn')?.addEventListener('click', togglePopupLanguage);
  document.getElementById('cf-btn-toggle')?.addEventListener('click', () => sendToActiveTab('TOGGLE_PANEL'));
  document.getElementById('cf-btn-prompts')?.addEventListener('click', () => sendToActiveTab('OPEN_PROMPTS'));
  document.getElementById('cf-btn-backup')?.addEventListener('click', () => sendToActiveTab('EXPORT_BACKUP'));
  document.getElementById('cf-btn-import')?.addEventListener('click', triggerPopupBackupImport);
});
