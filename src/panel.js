import { toggleAutoScrollHistory } from './autoscroll.js';
import { exportBackupConfig, importBackupConfig } from './backup.js';
import { openCreateFolderModal } from './dialogs.js';
import { applyFolderBadgesAndFilter, deleteFolderById } from './folders.js';
import { ICONS, createIconElement, setButtonIconText } from './icons.js';
import { refreshUI } from './main.js';
import { P } from './platform.js';
import { openPromptsModal } from './prompts.js';
import { getConversationRows } from './sidebar.js';
import { BUILTIN_FILTERS, autoClassifiedVisited, saveView, state, t } from './state.js';
import { initCloudSync, normalizeStoredState, saveFolderData } from './storage.js';
import { applyToolbarLayout, clampToolbarPosition } from './toolbar.js';

function setAppLanguage(nextLang) {
  const normalized = nextLang === 'en' || nextLang === 'es' ? nextLang : state.folderState.lang === 'es' ? 'en' : 'es';
  if (state.folderState.lang === normalized) return;
  state.folderState.lang = normalized;
  saveFolderData(state.folderState);

  document.getElementById('gcm-toolbar')?.remove();
  document.getElementById('gcm-folders-box')?.remove();
  document.getElementById('gcm-folder-popover')?.remove();
  refreshUI();
}

export function injectSidebarFoldersPanel(items) {
  let box = document.getElementById('gcm-folders-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'gcm-folders-box';
    document.body.appendChild(box);
    buildFoldersPanelDOM(box);
    // Posicionar sin animar la transición CSS (evita que el panel "viaje" desde la esquina al cargar).
    box.classList.add('gcm-dragging');
    clampBoxPosition(box);
    void box.offsetWidth;
    requestAnimationFrame(() => box.classList.remove('gcm-dragging'));
  }

  const isMin = box.classList.contains('gcm-minimized');
  if (state.folderState.minimized && !isMin) {
    box.classList.add('gcm-minimized');
    clampBoxPosition(box);
  } else if (!state.folderState.minimized && isMin) {
    box.classList.remove('gcm-minimized');
    // El tamaño cambia al instante (sin transición de layout): reajustar de inmediato para no salir de pantalla.
    clampBoxPosition(box);
  }

  const counts = {
    ALL: items.length,
    UNASSIGNED: 0,
    PROTECTED: 0
  };
  for (let i = 0; i < state.folderState.folders.length; i++) {
    counts[state.folderState.folders[i].id] = 0;
  }

  for (let i = 0; i < items.length; i++) {
    const id = items[i].id;
    const fId = state.folderState.assignments[id];
    if (fId && counts[fId] !== undefined) {
      counts[fId]++;
    } else {
      counts.UNASSIGNED++;
    }
    if (state.folderState.protectedIds[id]) {
      counts.PROTECTED++;
    }
  }

  const pillsContainer = document.getElementById('gcm-pills-container');
  if (!pillsContainer) return;

  updateEmptyState(items, pillsContainer);

  const signature = JSON.stringify({
    lang: state.folderState.lang,
    folders: state.folderState.folders,
    active: state.activeFolderFilter,
    counts,
    sortMode: state.sortMode,
    autoScrollActive: state.autoScrollActive
  });

  if (pillsContainer.dataset.sig === signature) return;
  pillsContainer.dataset.sig = signature;

  const frag = document.createDocumentFragment();

  frag.appendChild(
    createFolderPill({ id: 'ALL', name: t().pillAll, color: null, count: counts.ALL, deletable: false })
  );

  for (let i = 0; i < state.folderState.folders.length; i++) {
    const f = state.folderState.folders[i];
    frag.appendChild(
      createFolderPill({
        id: f.id,
        name: f.name,
        color: f.color,
        count: counts[f.id] || 0,
        deletable: true,
        keywords: f.keywords
      })
    );
  }

  if (counts.PROTECTED > 0 || state.activeFolderFilter === 'PROTECTED') {
    frag.appendChild(
      createFolderPill({ id: 'PROTECTED', name: t().pillProtected, color: '#fbbc04', count: counts.PROTECTED, deletable: false })
    );
  }

  frag.appendChild(
    createFolderPill({ id: 'UNASSIGNED', name: t().pillUnassigned, color: '#8e918f', count: counts.UNASSIGNED, deletable: false })
  );

  pillsContainer.textContent = '';
  pillsContainer.appendChild(frag);

  const sortBtn = document.getElementById('gcm-sort-btn');
  if (sortBtn) {
    const sortLabel = state.sortMode === 'DEFAULT' ? t().sortRecent : state.sortMode === 'AZ' ? t().sortAZ : t().sortZA;
    setButtonIconText(sortBtn, ICONS.sort, sortLabel);
  }

  const scrollBtn = document.getElementById('gcm-autoscroll-btn');
  if (scrollBtn) {
    if (state.autoScrollActive) {
      scrollBtn.classList.add('active');
      setButtonIconText(scrollBtn, ICONS.stop, t().stopLoadBtn);
    } else {
      scrollBtn.classList.remove('active');
      setButtonIconText(scrollBtn, ICONS.chevronsDown, t().loadAllBtn);
    }
  }
}

// Aplica la posición guardada (si existe) manteniendo el panel dentro de la ventana.
function clampBoxPosition(box) {
  const pos = state.folderState.pos;
  if (!box || !box.isConnected || !pos) return;
  const rect = box.getBoundingClientRect();
  // El panel se ancla por su borde INFERIOR: al expandir crece hacia arriba y al minimizar
  // vuelve a la misma línea. Solo se limita lo que se muestra; la posición guardada no se altera.
  const left = Math.min(Math.max(0, pos.left), Math.max(0, window.innerWidth - rect.width));
  const bottom = Math.min(Math.max(0, pos.bottom), Math.max(0, window.innerHeight - rect.height));
  box.style.setProperty('left', `${left}px`, 'important');
  box.style.setProperty('bottom', `${bottom}px`, 'important');
  box.style.setProperty('top', 'auto', 'important');
}

function enablePanelDrag(box, handle) {
  const DRAG_THRESHOLD = 4;
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;
  let dragging = false;

  // Los eventos de movimiento/soltar se escuchan en document (no en el encabezado) para no perder
  // el arrastre cuando el puntero sale del panel, y sin alterar el destino de un clic normal.
  // Las lecturas/escrituras de layout se agrupan en un solo requestAnimationFrame por cuadro.
  let rafId = 0;
  let lastDx = 0;
  let lastDy = 0;
  let boxW = 0;
  let boxH = 0;
  const applyDrag = () => {
    rafId = 0;
    const left = Math.min(Math.max(0, originLeft + lastDx), Math.max(0, window.innerWidth - boxW));
    const top = Math.min(Math.max(0, originTop + lastDy), Math.max(0, window.innerHeight - boxH));
    const bottom = Math.max(0, window.innerHeight - (top + boxH));
    box.style.setProperty('left', `${left}px`, 'important');
    box.style.setProperty('bottom', `${bottom}px`, 'important');
    box.style.setProperty('top', 'auto', 'important');
    state.folderState.pos = { left, bottom };
  };

  const onMove = (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      dragging = true;
      box.classList.add('gcm-dragging');
      const rect = box.getBoundingClientRect();
      boxW = rect.width;
      boxH = rect.height;
    }
    lastDx = dx;
    lastDy = dy;
    if (!rafId) rafId = requestAnimationFrame(applyDrag);
    e.preventDefault();
  };

  const onEnd = () => {
    document.removeEventListener('pointermove', onMove, true);
    document.removeEventListener('pointerup', onEnd, true);
    document.removeEventListener('pointercancel', onEnd, true);
    if (dragging) {
      dragging = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        applyDrag();
      }
      box.classList.remove('gcm-dragging');
      saveFolderData(state.folderState);
      // Evita que el "click" que sigue al arrastre minimice/expanda el panel.
      state.panelJustDragged = true;
      setTimeout(() => {
        state.panelJustDragged = false;
      }, 0);
    }
  };

  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    // Los botones del encabezado (idioma, nueva carpeta, minimizar) conservan su función normal.
    if (e.target instanceof Element && e.target.closest('button')) return;
    const rect = box.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    originLeft = rect.left;
    originTop = rect.top;
    dragging = false;
    document.addEventListener('pointermove', onMove, true);
    document.addEventListener('pointerup', onEnd, true);
    document.addEventListener('pointercancel', onEnd, true);
  });
}

export function registerGlobalListeners() {
  const applyExternalState = (incoming) => {
    const keepView = {
      filter: state.activeFolderFilter,
      sort: state.sortMode,
      toolbarCollapsed: state.toolbarCollapsed,
      toolbarVertical: state.toolbarVertical
    };
    const langChanged = incoming.lang !== state.folderState.lang;
    state.folderState = { ...incoming, view: keepView };
    if (!BUILTIN_FILTERS.includes(state.activeFolderFilter) && !state.folderState.folders.some((f) => f.id === state.activeFolderFilter)) {
      state.activeFolderFilter = 'ALL';
    }
    autoClassifiedVisited.clear();
    if (langChanged) {
      document.getElementById('gcm-toolbar')?.remove();
      document.getElementById('gcm-folders-box')?.remove();
    } else {
      const box = document.getElementById('gcm-folders-box');
      if (box) {
        box.classList.toggle('gcm-minimized', state.folderState.minimized);
        clampBoxPosition(box);
      }
      applyToolbarLayout();
      const pills = document.getElementById('gcm-pills-container');
      if (pills) delete pills.dataset.sig;
    }
    refreshUI();
  };

  // Otra pestaña (del mismo sitio) guardó cambios: adoptarlos para no pisarlos con datos viejos
  // al próximo guardado. Se conserva la vista (filtro/orden) de ESTA pestaña.
  window.addEventListener('storage', (e) => {
    if (e.key !== P.storageKey || !e.newValue) return;
    try {
      const incoming = normalizeStoredState(JSON.parse(e.newValue), state.folderState.lang);
      applyExternalState(incoming);
    } catch (_) {}
  });

  // Sincronización en la nube con chrome.storage.sync
  initCloudSync(
    () => state.folderState,
    (merged) => applyExternalState(merged)
  );

  // Atajos de teclado globales: Alt+Shift+F (minimizar/expandir panel) y Alt+Shift+S (buscar conversación)
  document.addEventListener('keydown', (e) => {
    if (!e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return;
    const key = (e.key || '').toUpperCase();
    const code = e.code || '';
    if (key === 'F' || code === 'KeyF') {
      e.preventDefault();
      state.folderState.minimized = !state.folderState.minimized;
      saveFolderData(state.folderState);
      refreshUI();
    } else if (key === 'S' || code === 'KeyS') {
      e.preventDefault();
      if (state.folderState.minimized) {
        state.folderState.minimized = false;
        saveFolderData(state.folderState);
        refreshUI();
      }
      const input = document.querySelector('#gcm-folders-box .gcm-search-input');
      input?.focus();
      input?.select();
    }
  });

  // Mensajes desde el Popup de la extensión (popup.js)
  try {
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage?.addListener) {
      chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
        if (!msg || typeof msg.action !== 'string') return;
        if (msg.action === 'TOGGLE_PANEL') {
          state.folderState.minimized = !state.folderState.minimized;
          saveFolderData(state.folderState);
          refreshUI();
          sendResponse?.({ ok: true, minimized: state.folderState.minimized });
        } else if (msg.action === 'OPEN_PROMPTS') {
          openPromptsModal();
          sendResponse?.({ ok: true });
        } else if (msg.action === 'EXPORT_BACKUP') {
          exportBackupConfig();
          sendResponse?.({ ok: true });
        } else if (msg.action === 'IMPORT_BACKUP') {
          importBackupConfig(msg.rawJson);
          sendResponse?.({ ok: true });
        } else if (msg.action === 'SET_LANG' || msg.action === 'TOGGLE_LANG') {
          setAppLanguage(msg.lang);
          sendResponse?.({ ok: true, lang: state.folderState.lang });
        } else if (msg.action === 'GET_STATE') {
          sendResponse?.({ ok: true, lang: state.folderState.lang, minimized: state.folderState.minimized });
        }
      });
    }
  } catch (_) {}

  window.addEventListener('resize', () => {
    clampBoxPosition(document.getElementById('gcm-folders-box'));
    clampToolbarPosition(document.getElementById('gcm-toolbar'));
  });
}

function buildFoldersPanelDOM(box) {
  box.textContent = '';

  const header = document.createElement('div');
  header.className = 'gcm-folders-header';

  const title = document.createElement('span');
  title.style.display = 'inline-flex';
  title.style.alignItems = 'center';
  title.style.gap = '7px';

  title.appendChild(createIconElement(ICONS.foldyLogo));

  const titleText = document.createElement('span');
  titleText.textContent = t().panelTitle;
  title.appendChild(titleText);
  title.title = t().toggleMinTitle;
  title.addEventListener('click', () => {
    if (state.panelJustDragged) return; // el arrastre no debe minimizar/expandir el panel
    state.folderState.minimized = !state.folderState.minimized;
    saveFolderData(state.folderState);
    refreshUI();
  });

  const headerActions = document.createElement('div');
  headerActions.className = 'gcm-header-actions';

  const addBtn = document.createElement('button');
  addBtn.className = 'gcm-add-folder-btn';
  setButtonIconText(addBtn, ICONS.folderPlus, t().newFolderBtn);
  addBtn.title = t().newFolderTitle;
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openCreateFolderModal();
  });

  const minBtn = document.createElement('button');
  minBtn.className = 'gcm-mini-btn gcm-mini-icon-btn';
  minBtn.appendChild(createIconElement(ICONS.minus));
  minBtn.title = t().toggleMinTitle;
  minBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.folderState.minimized = !state.folderState.minimized;
    saveFolderData(state.folderState);
    refreshUI();
  });

  headerActions.appendChild(addBtn);
  headerActions.appendChild(minBtn);
  header.appendChild(title);
  header.appendChild(headerActions);
  enablePanelDrag(box, header);

  const body = document.createElement('div');
  body.className = 'gcm-folders-body';

  const searchRow = document.createElement('div');
  searchRow.className = 'gcm-search-sort-row';

  const searchWrap = document.createElement('div');
  searchWrap.className = 'gcm-search-wrap';

  const searchIcon = createIconElement(ICONS.search);
  searchIcon.classList.add('gcm-search-lead-icon');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'gcm-search-input';
  searchInput.placeholder = t().searchPlaceholder;
  searchInput.value = state.searchQuery;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'gcm-search-clear';
  clearBtn.appendChild(createIconElement(ICONS.close));
  clearBtn.title = t().searchClearTitle;
  clearBtn.style.display = state.searchQuery ? 'inline-flex' : 'none';

  let searchDebounce = null;
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearBtn.style.display = state.searchQuery ? 'inline-flex' : 'none';
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      applyFolderBadgesAndFilter(getConversationRows());
    }, 90);
  });

  clearBtn.addEventListener('click', () => {
    state.searchQuery = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    applyFolderBadgesAndFilter(getConversationRows());
    searchInput.focus();
  });

  searchWrap.appendChild(searchIcon);
  searchWrap.appendChild(searchInput);
  searchWrap.appendChild(clearBtn);

  const sortBtn = document.createElement('button');
  sortBtn.id = 'gcm-sort-btn';
  sortBtn.className = 'gcm-sort-btn';
  sortBtn.title = t().sortTitle;
  setButtonIconText(sortBtn, ICONS.sort, t().sortRecent);
  sortBtn.addEventListener('click', () => {
    state.sortMode = state.sortMode === 'DEFAULT' ? 'AZ' : state.sortMode === 'AZ' ? 'ZA' : 'DEFAULT';
    saveView();
    refreshUI();
  });

  searchRow.appendChild(searchWrap);
  searchRow.appendChild(sortBtn);

  const pillsContainer = document.createElement('div');
  pillsContainer.id = 'gcm-pills-container';
  pillsContainer.className = 'gcm-folders-pills';

  const footer = document.createElement('div');
  footer.className = 'gcm-panel-footer';

  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'gcm-autoscroll-btn';
  scrollBtn.className = 'gcm-footer-btn';
  setButtonIconText(scrollBtn, ICONS.chevronsDown, t().loadAllBtn);
  scrollBtn.title = t().loadAllTitle;
  scrollBtn.addEventListener('click', () => toggleAutoScrollHistory({ silent: false }));

  const promptsBtn = document.createElement('button');
  promptsBtn.id = 'gcm-prompts-btn';
  promptsBtn.className = 'gcm-footer-btn';
  setButtonIconText(promptsBtn, ICONS.zap, t().promptsBtn);
  promptsBtn.title = t().promptsBtnTitle;
  promptsBtn.addEventListener('click', openPromptsModal);

  footer.appendChild(scrollBtn);
  footer.appendChild(promptsBtn);

  body.appendChild(searchRow);
  body.appendChild(pillsContainer);
  body.appendChild(footer);

  box.appendChild(header);
  box.appendChild(body);
}

function updateEmptyState(items, pillsContainer) {
  let emptyBox = document.getElementById('gcm-empty-state');
  const visibleRowsCount = items.filter((it) => !it.row.classList.contains('gcm-hidden-by-filter')).length;
  const isFiltered = state.activeFolderFilter !== 'ALL' || state.searchQuery.trim().length > 0;

  if (items.length > 0 && visibleRowsCount === 0 && isFiltered) {
    if (!emptyBox) {
      emptyBox = document.createElement('div');
      emptyBox.id = 'gcm-empty-state';
      emptyBox.className = 'gcm-empty-state';

      const ill = createIconElement(ICONS.emptyFolderSearch);
      const msg = document.createElement('div');
      msg.className = 'gcm-empty-state-text';
      msg.id = 'gcm-empty-state-text';

      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'gcm-empty-reset-btn';
      resetBtn.id = 'gcm-empty-reset-btn';
      resetBtn.addEventListener('click', () => {
        state.activeFolderFilter = 'ALL';
        state.searchQuery = '';
        const input = document.querySelector('#gcm-folders-box .gcm-search-input');
        if (input) input.value = '';
        saveView();
        refreshUI();
      });

      emptyBox.appendChild(ill);
      emptyBox.appendChild(msg);
      emptyBox.appendChild(resetBtn);
      pillsContainer.insertAdjacentElement('afterend', emptyBox);
    }
    const textEl = document.getElementById('gcm-empty-state-text');
    const resetEl = document.getElementById('gcm-empty-reset-btn');
    if (textEl) textEl.textContent = t().emptyStateText;
    if (resetEl) resetEl.textContent = t().emptyStateResetBtn;
    emptyBox.style.display = 'flex';
  } else if (emptyBox) {
    emptyBox.style.display = 'none';
  }
}

function createFolderPill({ id, name, color, count, deletable, keywords }) {
  const pill = document.createElement('div');
  const hasRules = Array.isArray(keywords) && keywords.length > 0;
  pill.className =
    'gcm-folder-pill' +
    (state.activeFolderFilter === id ? ' active' : '') +
    (hasRules ? ' gcm-pill-has-rules' : '');
  pill.setAttribute('role', 'button');
  pill.setAttribute('tabindex', '0');
  pill.setAttribute('aria-pressed', String(state.activeFolderFilter === id));
  if (hasRules) {
    pill.title = `${t().autoRulesPrefix} (${keywords.length}): ${keywords.join(', ')}`;
  }

  if (id === 'PROTECTED') {
    pill.appendChild(createIconElement(ICONS.lockSmall));
  } else if (color) {
    const dot = document.createElement('span');
    dot.className = 'gcm-folder-dot';
    dot.style.backgroundColor = color;
    dot.style.color = color;
    pill.appendChild(dot);
  }

  const label = document.createElement('span');
  label.className = 'gcm-folder-label';
  label.textContent = name;
  pill.appendChild(label);

  if (hasRules) {
    const ruleTag = document.createElement('span');
    ruleTag.className = 'gcm-folder-autorule';
    ruleTag.appendChild(createIconElement(ICONS.sparkle));
    pill.appendChild(ruleTag);
  }

  const badgeCount = document.createElement('span');
  badgeCount.className = 'gcm-folder-count';
  badgeCount.textContent = String(count);
  pill.appendChild(badgeCount);

  if (deletable) {
    const actionsWrap = document.createElement('span');
    actionsWrap.className = 'gcm-folder-pill-actions';

    const editBtn = document.createElement('span');
    editBtn.className = 'gcm-folder-edit';
    editBtn.appendChild(createIconElement(ICONS.editPencil));
    editBtn.title = t().editFolderTitle(name);
    editBtn.setAttribute('role', 'button');
    editBtn.setAttribute('tabindex', '0');
    editBtn.setAttribute('aria-label', t().editFolderTitle(name));
    const triggerEdit = (e) => {
      e.stopPropagation();
      const targetFolder = state.folderState.folders.find((f) => f.id === id);
      if (targetFolder) openCreateFolderModal(null, targetFolder);
    };
    editBtn.addEventListener('click', triggerEdit);
    editBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerEdit(e);
      }
    });

    const del = document.createElement('span');
    del.className = 'gcm-folder-del';
    del.textContent = '×';
    del.title = t().delFolderTitle(name);
    del.setAttribute('role', 'button');
    del.setAttribute('tabindex', '0');
    del.setAttribute('aria-label', t().delFolderTitle(name));
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteFolderById(id);
    });
    del.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        deleteFolderById(id);
      }
    });

    actionsWrap.appendChild(editBtn);
    actionsWrap.appendChild(del);
    pill.appendChild(actionsWrap);
  }

  pill.addEventListener('click', () => {
    state.autoSelectAllMode = false;
    state.activeFolderFilter = id;
    saveView();
    refreshUI();
  });

  pill.addEventListener('keydown', (e) => {
    if (e.target === pill && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      pill.click();
    }
  });

  return pill;
}
