import { deleteSelectedChats, stopDeletion } from './deletion.js';
import { ICONS, createIconElement, setButtonIconText } from './icons.js';
import { exportSelectedConversationsToMarkdown } from './markdown-export.js';
import { toggleMoveToFolderPopover, toggleProtectSelected, toggleSelectAll } from './selection.js';
import { saveView, selectedMap, state, t } from './state.js';
import { saveFolderData } from './storage.js';

function appendButtonWithKbd(btn, iconBuilder, labelText, kbdText = null) {
  setButtonIconText(btn, iconBuilder, labelText);
  if (kbdText) {
    const kbd = document.createElement('kbd');
    kbd.className = 'gcm-kbd';
    kbd.textContent = kbdText;
    btn.appendChild(kbd);
  }
}

function createToolbarSeparator() {
  const sep = document.createElement('span');
  sep.className = 'gcm-toolbar-sep';
  sep.setAttribute('aria-hidden', 'true');
  return sep;
}

export function createToolbar() {
  if (document.getElementById('gcm-toolbar')) return;

  const toolbar = document.createElement('div');
  toolbar.id = 'gcm-toolbar';
  toolbar.dataset.gcmCount = '0';

  const headWrap = document.createElement('div');
  headWrap.className = 'gcm-toolbar-head';

  const collapseBtn = document.createElement('button');
  collapseBtn.id = 'gcm-toolbar-toggle';
  collapseBtn.className = 'gcm-toolbar-toggle';
  collapseBtn.addEventListener('click', () => {
    if (state.toolbarJustDragged) return;
    state.toolbarCollapsed = !state.toolbarCollapsed;
    saveView();
    applyToolbarLayout();
  });

  const orientBtn = document.createElement('button');
  orientBtn.id = 'gcm-toolbar-orient';
  orientBtn.className = 'gcm-toolbar-toggle gcm-toolbar-orient';
  orientBtn.addEventListener('click', () => {
    if (state.toolbarJustDragged) return;
    state.toolbarVertical = !state.toolbarVertical;
    saveView();
    applyToolbarLayout();
  });

  headWrap.appendChild(collapseBtn);
  headWrap.appendChild(orientBtn);

  const selectAllWrap = document.createElement('label');
  selectAllWrap.className = 'gcm-select-all-wrap';
  selectAllWrap.title = t().selectAllTitle;

  const selectAllCb = document.createElement('input');
  selectAllCb.type = 'checkbox';
  selectAllCb.id = 'gcm-select-all';
  selectAllCb.className = 'gcm-checkbox';
  selectAllCb.style.margin = '0';
  selectAllCb.addEventListener('change', (e) => toggleSelectAll(e.target.checked));

  const selectAllText = document.createElement('span');
  selectAllText.textContent = t().selectAll;

  selectAllWrap.appendChild(selectAllCb);
  selectAllWrap.appendChild(selectAllText);

  const countBadgeWrap = document.createElement('div');
  countBadgeWrap.id = 'gcm-selection-pill';
  countBadgeWrap.className = 'gcm-selection-pill';

  const countNum = document.createElement('span');
  countNum.id = 'gcm-selection-count';
  countNum.className = 'gcm-selection-count-text';
  countNum.textContent = state.folderState.lang === 'es' ? '0 seleccionados' : '0 selected';

  const clearSelBtn = document.createElement('button');
  clearSelBtn.type = 'button';
  clearSelBtn.id = 'gcm-clear-selection-btn';
  clearSelBtn.className = 'gcm-selection-clear-btn';
  clearSelBtn.title = state.folderState.lang === 'es' ? 'Limpiar selección (Esc)' : 'Clear selection (Esc)';
  clearSelBtn.appendChild(createIconElement(ICONS.close));
  clearSelBtn.addEventListener('click', () => toggleSelectAll(false));

  countBadgeWrap.appendChild(countNum);
  countBadgeWrap.appendChild(clearSelBtn);

  const folderBtn = document.createElement('button');
  folderBtn.id = 'gcm-folder-btn';
  folderBtn.className = 'gcm-btn gcm-btn-folder';
  folderBtn.disabled = true;
  folderBtn.dataset.label = t().folderBtn(0);
  folderBtn.dataset.lang = state.folderState.lang;
  appendButtonWithKbd(folderBtn, ICONS.folder, state.folderState.lang === 'es' ? 'Carpeta' : 'Folder', 'M');
  folderBtn.title = t().folderBtnTitle;
  folderBtn.addEventListener('click', () => toggleMoveToFolderPopover(folderBtn));

  const protectBtn = document.createElement('button');
  protectBtn.id = 'gcm-protect-btn';
  protectBtn.className = 'gcm-btn gcm-btn-neutral';
  protectBtn.disabled = true;
  protectBtn.dataset.lang = state.folderState.lang;
  appendButtonWithKbd(protectBtn, ICONS.lock, t().protectBtn, 'L');
  protectBtn.title = t().protectBtnTitle;
  protectBtn.addEventListener('click', toggleProtectSelected);

  const exportBtn = document.createElement('button');
  exportBtn.id = 'gcm-export-btn';
  exportBtn.className = 'gcm-btn gcm-btn-neutral';
  setButtonIconText(exportBtn, ICONS.fileText, t().exportBtn);
  exportBtn.title = t().exportBtnTitle;
  exportBtn.addEventListener('click', exportSelectedConversationsToMarkdown);

  const deleteBtn = document.createElement('button');
  deleteBtn.id = 'gcm-delete-btn';
  deleteBtn.className = 'gcm-btn gcm-btn-danger';
  deleteBtn.disabled = true;
  deleteBtn.dataset.label = t().deleteBtn(0);
  deleteBtn.dataset.lang = state.folderState.lang;
  appendButtonWithKbd(deleteBtn, ICONS.trash, state.folderState.lang === 'es' ? 'Borrar' : 'Delete', '⌫');
  deleteBtn.addEventListener('click', deleteSelectedChats);

  const stopBtn = document.createElement('button');
  stopBtn.id = 'gcm-stop-btn';
  stopBtn.className = 'gcm-btn gcm-btn-stop';
  stopBtn.style.display = 'none';
  setButtonIconText(stopBtn, ICONS.stop, t().stopBtn);
  stopBtn.addEventListener('click', stopDeletion);

  toolbar.appendChild(headWrap);
  toolbar.appendChild(selectAllWrap);
  toolbar.appendChild(countBadgeWrap);
  toolbar.appendChild(createToolbarSeparator());
  toolbar.appendChild(folderBtn);
  toolbar.appendChild(protectBtn);
  toolbar.appendChild(exportBtn);
  toolbar.appendChild(createToolbarSeparator());
  toolbar.appendChild(deleteBtn);
  toolbar.appendChild(stopBtn);

  enableToolbarDrag(toolbar);

  document.body.appendChild(toolbar);
  toolbar.classList.add('gcm-dragging');
  applyToolbarLayout();
  void toolbar.offsetWidth;
  requestAnimationFrame(() => toolbar.classList.remove('gcm-dragging'));
}

// Aplica el estado contraído y la orientación (horizontal / vertical), y mantiene la barra dentro del viewport.
export function applyToolbarLayout() {
  const toolbar = document.getElementById('gcm-toolbar');
  const collapseBtn = document.getElementById('gcm-toolbar-toggle');
  const orientBtn = document.getElementById('gcm-toolbar-orient');
  if (!toolbar || !collapseBtn) return;

  toolbar.classList.toggle('gcm-collapsed', state.toolbarCollapsed);
  toolbar.classList.toggle('gcm-vertical', !!state.toolbarVertical && !state.toolbarCollapsed);

  collapseBtn.textContent = '';
  collapseBtn.appendChild(createIconElement(state.toolbarCollapsed ? ICONS.menu : ICONS.chevronRight));
  const collapseTitle = state.toolbarCollapsed ? t().toolbarExpandTitle : t().toolbarCollapseTitle;
  collapseBtn.title = collapseTitle;
  collapseBtn.setAttribute('aria-label', collapseTitle);
  collapseBtn.setAttribute('aria-expanded', String(!state.toolbarCollapsed));

  if (orientBtn) {
    orientBtn.textContent = '';
    orientBtn.appendChild(createIconElement(state.toolbarVertical ? ICONS.layoutHorizontal : ICONS.layoutVertical));
    const orientTitle = state.toolbarVertical ? t().toolbarHorizontalTitle : t().toolbarVerticalTitle;
    orientBtn.title = orientTitle;
    orientBtn.setAttribute('aria-label', orientTitle);
    orientBtn.setAttribute('aria-expanded', String(!state.toolbarCollapsed));
  }

  clampToolbarPosition(toolbar);
}

export function clampToolbarPosition(toolbar) {
  const pos = state.folderState.toolbarPos;
  if (!toolbar || !toolbar.isConnected || !pos) return;
  const rect = toolbar.getBoundingClientRect();
  const left = Math.min(Math.max(6, pos.left), Math.max(6, window.innerWidth - rect.width - 6));
  const top = Math.min(Math.max(6, pos.top), Math.max(6, window.innerHeight - rect.height - 6));
  toolbar.style.setProperty('left', `${left}px`, 'important');
  toolbar.style.setProperty('top', `${top}px`, 'important');
  toolbar.style.setProperty('right', 'auto', 'important');
  toolbar.style.setProperty('bottom', 'auto', 'important');
}

function enableToolbarDrag(toolbar) {
  const DRAG_THRESHOLD = 4;
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;
  let dragging = false;
  let rafId = 0;
  let lastDx = 0;
  let lastDy = 0;
  let barW = 0;
  let barH = 0;

  // Bloquea el click residual tras soltar un arrastre para no disparar botones accidentalmente.
  toolbar.addEventListener(
    'click',
    (e) => {
      if (state.toolbarJustDragged) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    true
  );

  const applyDrag = () => {
    rafId = 0;
    const left = Math.min(Math.max(6, originLeft + lastDx), Math.max(6, window.innerWidth - barW - 6));
    const top = Math.min(Math.max(6, originTop + lastDy), Math.max(6, window.innerHeight - barH - 6));
    toolbar.style.setProperty('left', `${left}px`, 'important');
    toolbar.style.setProperty('top', `${top}px`, 'important');
    toolbar.style.setProperty('right', 'auto', 'important');
    toolbar.style.setProperty('bottom', 'auto', 'important');
    state.folderState.toolbarPos = { left, top };
  };

  const onMove = (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      dragging = true;
      toolbar.classList.add('gcm-dragging');
      const rect = toolbar.getBoundingClientRect();
      barW = rect.width;
      barH = rect.height;
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
      toolbar.classList.remove('gcm-dragging');
      saveFolderData(state.folderState);
      state.toolbarJustDragged = true;
      setTimeout(() => {
        state.toolbarJustDragged = false;
      }, 40);
    }
  };

  toolbar.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    const rect = toolbar.getBoundingClientRect();
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

export function updateToolbarState() {
  const toolbar = document.getElementById('gcm-toolbar');
  const countNum = document.getElementById('gcm-selection-count');
  const clearSelBtn = document.getElementById('gcm-clear-selection-btn');
  const folderBtn = document.getElementById('gcm-folder-btn');
  const protectBtn = document.getElementById('gcm-protect-btn');
  const exportBtn = document.getElementById('gcm-export-btn');
  const deleteBtn = document.getElementById('gcm-delete-btn');
  const stopBtn = document.getElementById('gcm-stop-btn');
  const selectAllCb = document.getElementById('gcm-select-all');

  if (!deleteBtn || !stopBtn || !folderBtn) return;

  const count = selectedMap.size;
  const isEs = state.folderState.lang === 'es';
  document.documentElement.toggleAttribute('data-gcm-selection-mode', count > 0);
  if (toolbar) {
    toolbar.dataset.gcmCount = String(count);
    toolbar.classList.toggle('gcm-has-selection', count > 0 || state.deletionInProgress);
  }
  if (countNum) {
    countNum.textContent = isEs ? `${count} seleccionado${count === 1 ? '' : 's'}` : `${count} selected`;
  }
  if (clearSelBtn) {
    clearSelBtn.title = isEs ? 'Limpiar selección (Esc)' : 'Clear selection (Esc)';
  }

  if (state.deletionInProgress) {
    folderBtn.style.display = 'none';
    if (protectBtn) protectBtn.style.display = 'none';
    if (exportBtn) exportBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    stopBtn.style.display = 'inline-flex';
    if (selectAllCb) selectAllCb.disabled = true;
  } else {
    folderBtn.style.display = 'inline-flex';
    if (protectBtn) protectBtn.style.display = 'inline-flex';
    if (exportBtn) exportBtn.style.display = 'inline-flex';
    deleteBtn.style.display = 'inline-flex';
    stopBtn.style.display = 'none';
    if (selectAllCb) selectAllCb.disabled = false;

    // El checkbox "Todo" debe reflejar la realidad: si llegó un lote nuevo de chats (carga progresiva)
    // o cambió el filtro, ya no están todos seleccionados.
    if (selectAllCb) {
      const rowCbs = document.querySelectorAll('.gcm-chat-row .gcm-checkbox:not(#gcm-select-all)');
      let visibleTotal = 0;
      let visibleChecked = 0;
      rowCbs.forEach((cb) => {
        const r = cb.closest('.gcm-chat-row') || cb.parentElement;
        if (!r || r.classList.contains('gcm-hidden-by-filter')) return;
        visibleTotal++;
        if (selectedMap.has(cb.dataset.convId)) visibleChecked++;
      });
      const allChecked = visibleTotal > 0 && visibleChecked === visibleTotal;
      if (selectAllCb.checked !== allChecked) selectAllCb.checked = allChecked;
      selectAllCb.classList.toggle('gcm-checked', allChecked);
      selectAllCb.indeterminate = visibleChecked > 0 && !allChecked;
    }

    folderBtn.disabled = count === 0;
    const fText = t().folderBtn(count);
    if (folderBtn.dataset.label !== fText || folderBtn.dataset.lang !== state.folderState.lang) {
      folderBtn.dataset.label = fText;
      folderBtn.dataset.lang = state.folderState.lang;
      appendButtonWithKbd(folderBtn, ICONS.folder, isEs ? 'Carpeta' : 'Folder', 'M');
    }

    if (protectBtn) {
      protectBtn.disabled = count === 0;
      if (protectBtn.dataset.lang !== state.folderState.lang) {
        protectBtn.dataset.lang = state.folderState.lang;
        appendButtonWithKbd(protectBtn, ICONS.lock, t().protectBtn, 'L');
      }
    }

    deleteBtn.disabled = count === 0;
    const dText = t().deleteBtn(count);
    if (deleteBtn.dataset.label !== dText || deleteBtn.dataset.lang !== state.folderState.lang) {
      deleteBtn.dataset.label = dText;
      deleteBtn.dataset.lang = state.folderState.lang;
      appendButtonWithKbd(deleteBtn, ICONS.trash, isEs ? 'Borrar' : 'Delete', '⌫');
    }
  }
}
