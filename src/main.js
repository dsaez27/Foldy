import { applyFolderBadgesAndFilter, runAutoClassification } from './folders.js';
import { injectSidebarFoldersPanel, registerGlobalListeners } from './panel.js';
import { applyThemePreset, syncHostTheme, THEME_STORAGE_KEY } from './platform.js';
import { injectCheckboxes, setupDelegatedSidebarListener } from './selection.js';
import { getConversationRows, getSidebarElement } from './sidebar.js';
import { state } from './state.js';
import { createToolbar, updateToolbarState } from './toolbar.js';

const attachedStorageListeners = new WeakSet();
const attachedRuntimeListeners = new WeakSet();

function initThemeEngine() {
  let fallbackPreset = null;
  try {
    if (typeof localStorage !== 'undefined') {
      fallbackPreset = localStorage.getItem(THEME_STORAGE_KEY);
    }
  } catch (_) {}
  applyThemePreset(fallbackPreset, { persist: false });

  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.local?.get) {
      chrome.storage.local.get([THEME_STORAGE_KEY], (res) => {
        void chrome.runtime?.lastError;
        const stored = res?.[THEME_STORAGE_KEY];
        if (stored) {
          const normalized = applyThemePreset(stored, { persist: false });
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem(THEME_STORAGE_KEY, normalized);
            }
          } catch (_) {}
        }
      });
    }
  } catch (_) {}

  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.sync?.get) {
      chrome.storage.sync.get([THEME_STORAGE_KEY], (res) => {
        void chrome.runtime?.lastError;
        const synced = res?.[THEME_STORAGE_KEY];
        if (synced) {
          const normalized = applyThemePreset(synced, { persist: false });
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem(THEME_STORAGE_KEY, normalized);
            }
          } catch (_) {}
          try {
            if (chrome.storage?.local?.set) {
              const p = chrome.storage.local.set({ [THEME_STORAGE_KEY]: normalized });
              if (p && typeof p.catch === 'function') p.catch(() => {});
            }
          } catch (_) {}
        }
      });
    }
  } catch (_) {}

  try {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage?.onChanged?.addListener &&
      !attachedStorageListeners.has(chrome.storage.onChanged)
    ) {
      attachedStorageListeners.add(chrome.storage.onChanged);
      chrome.storage.onChanged.addListener((changes, area) => {
        if ((area !== 'local' && area !== 'sync') || !changes?.[THEME_STORAGE_KEY]) return;
        const normalized = applyThemePreset(changes[THEME_STORAGE_KEY].newValue, { persist: false });
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(THEME_STORAGE_KEY, normalized);
          }
        } catch (_) {}
      });
    }
  } catch (_) {}

  try {
    if (
      typeof chrome !== 'undefined' &&
      chrome.runtime?.onMessage?.addListener &&
      !attachedRuntimeListeners.has(chrome.runtime.onMessage)
    ) {
      attachedRuntimeListeners.add(chrome.runtime.onMessage);
      chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
        if (msg?.type === 'SET_THEME_PRESET') {
          const applied = applyThemePreset(msg.preset);
          sendResponse?.({ ok: true, preset: applied });
        }
      });
    }
  } catch (_) {}
}

function scheduleRefresh(delay = 120) {
  if (state.refreshDebounceTimer) return;
  state.refreshDebounceTimer = setTimeout(() => {
    state.refreshDebounceTimer = null;
    if (!document.hidden) {
      requestAnimationFrame(refreshUI);
    }
  }, delay);
}

export function refreshUI() {
  if (state.isRefreshing || document.hidden) return;
  state.isRefreshing = true;
  try {
    syncHostTheme();
    createToolbar();
    const items = getConversationRows();
    runAutoClassification(items);
    applyFolderBadgesAndFilter(items);
    injectCheckboxes(items);
    injectSidebarFoldersPanel(items);
    updateToolbarState();
  } finally {
    state.isRefreshing = false;
  }
}

export function init() {
  if (!document.body) {
    setTimeout(init, 300);
    return;
  }
  syncHostTheme();
  initThemeEngine();
  registerGlobalListeners();
  setupDelegatedSidebarListener();
  setTimeout(refreshUI, 800);

  // Observar cambios de clase/atributos de tema en html y body
  const themeObserver = new MutationObserver(() => {
    syncHostTheme();
  });
  if (document.documentElement) {
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-color-scheme', 'data-mode', 'style']
    });
  }
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'data-color-scheme', 'data-mode', 'style']
  });

  // MutationObserver: reacciona solo cuando el sidebar cambia (más eficiente que setInterval)
  const isOwnNode = (n) => {
    const el = n.nodeType === 1 ? n : n.parentElement;
    return !!el && !!el.closest('[id^="gcm-"], [class*="gcm-"]');
  };
  const hasNonOwnNode = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (!isOwnNode(list[i])) return true;
    }
    return false;
  };
  const isInsideStreamingMain = (targetNode) => {
    const el = targetNode?.nodeType === 1 ? targetNode : targetNode?.parentElement;
    if (!el) return false;
    const mainEl = el.closest('main, [role="main"]');
    if (!mainEl) return false;
    const sidebar = getSidebarElement();
    return !sidebar || !mainEl.contains(sidebar);
  };
  const observer = new MutationObserver((mutations) => {
    if (document.hidden || state.isRefreshing) return;
    // Solo procesar si hay nodos relevantes añadidos (conversaciones nuevas)
    // Ignorar los cambios que provoca la propia extensión (badges, candados, checkboxes) o el streaming dentro de <main>.
    for (let i = 0; i < mutations.length; i++) {
      const m = mutations[i];
      if (isOwnNode(m.target) || isInsideStreamingMain(m.target)) continue;
      if (hasNonOwnNode(m.addedNodes) || hasNonOwnNode(m.removedNodes)) {
        scheduleRefresh(150);
        return;
      }
    }
  });

  let observedTarget = null;
  const startObserving = () => {
    const sidebar = getSidebarElement();
    const target = sidebar || document.body;
    observer.disconnect();
    observer.observe(target, { childList: true, subtree: true });
    observedTarget = target;
  };

  // Intentar observar inmediatamente o esperar a que cargue el sidebar
  if (getSidebarElement()) {
    startObserving();
  } else {
    // Fallback: esperar hasta 5s a que aparezca el sidebar
    let attempts = 0;
    const waitForSidebar = setInterval(() => {
      attempts++;
      if (getSidebarElement() || attempts >= 25) {
        clearInterval(waitForSidebar);
        startObserving();
      }
    }, 200);
  }

  // Intervalo de seguridad reducido a 4s (solo reengancha el observer si la SPA re-renderizó el sidebar)
  setInterval(() => {
    if (!document.hidden && observedTarget) {
      const sidebar = getSidebarElement();
      if (!observedTarget.isConnected || (sidebar && sidebar !== observedTarget)) {
        startObserving();
        scheduleRefresh(0);
      }
    }
  }, 4000);
}
