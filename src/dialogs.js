import { refreshUI } from './main.js';
import { PRESET_COLORS } from './platform.js';
import { autoClassifiedVisited, state, t } from './state.js';
import { saveFolderData } from './storage.js';

export function openCreateFolderModal(onCreatedCallback = null, existingFolder = null) {
  const existing = document.getElementById('gcm-modal-overlay');
  if (existing) {
    existing._gcmClose?.(false);
    existing.remove();
  }

  const isEdit = Boolean(existingFolder);
  let chosenColor = isEdit
    ? (existingFolder.color || PRESET_COLORS[0])
    : PRESET_COLORS[state.folderState.folders.length % PRESET_COLORS.length];

  const overlay = document.createElement('div');
  overlay.id = 'gcm-modal-overlay';

  const card = document.createElement('div');
  card.className = 'gcm-modal-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');

  const closeModal = () => {
    document.removeEventListener('keydown', onEsc);
    overlay.remove();
  };
  overlay._gcmClose = closeModal;

  const title = document.createElement('div');
  title.className = 'gcm-modal-title';
  title.textContent = isEdit ? t().modalEditFolderTitle : t().modalNewFolderTitle;

  const desc = document.createElement('div');
  desc.className = 'gcm-modal-desc';
  desc.textContent = t().modalNewFolderDesc;

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.className = 'gcm-modal-input';
  inputName.placeholder = t().modalFolderNamePlaceholder;
  if (isEdit) {
    inputName.value = existingFolder.name || '';
  }

  const inputKeywords = document.createElement('input');
  inputKeywords.type = 'text';
  inputKeywords.className = 'gcm-modal-input';
  inputKeywords.placeholder = t().modalKeywordsPlaceholder;
  if (isEdit && Array.isArray(existingFolder.keywords)) {
    inputKeywords.value = existingFolder.keywords.join(', ');
  }

  const colorRow = document.createElement('div');
  colorRow.className = 'gcm-color-picker-row';

  PRESET_COLORS.forEach((col) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'gcm-color-swatch' + (col === chosenColor ? ' selected' : '');
    swatch.style.backgroundColor = col;
    swatch.setAttribute('aria-label', col);
    swatch.setAttribute('aria-pressed', col === chosenColor ? 'true' : 'false');
    swatch.addEventListener('click', () => {
      chosenColor = col;
      colorRow.querySelectorAll('.gcm-color-swatch').forEach((s) => {
        s.classList.remove('selected');
        s.setAttribute('aria-pressed', 'false');
      });
      swatch.classList.add('selected');
      swatch.setAttribute('aria-pressed', 'true');
    });
    colorRow.appendChild(swatch);
  });

  const actions = document.createElement('div');
  actions.className = 'gcm-modal-actions';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'gcm-btn gcm-btn-cancel';
  cancelBtn.textContent = t().cancel;
  cancelBtn.addEventListener('click', closeModal);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'gcm-btn gcm-btn-stop';
  saveBtn.textContent = isEdit ? t().saveFolderConfirm : t().createFolderConfirm;

  const handleSave = () => {
    const name = inputName.value.trim();
    if (!name) {
      inputName.focus();
      return;
    }
    const keywords = inputKeywords.value
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    let savedFolder;
    if (isEdit) {
      const target = state.folderState.folders.find((f) => f.id === existingFolder.id);
      if (target) {
        target.name = name;
        target.color = chosenColor;
        target.keywords = keywords;
        savedFolder = target;
      }
    } else {
      savedFolder = {
        id: 'f_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
        name,
        color: chosenColor,
        keywords
      };
      state.folderState.folders.push(savedFolder);
    }

    autoClassifiedVisited.clear();
    saveFolderData(state.folderState);
    closeModal();
    refreshUI();
    if (typeof onCreatedCallback === 'function' && savedFolder) {
      onCreatedCallback(savedFolder);
    }
  };

  saveBtn.addEventListener('click', handleSave);
  inputName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') closeModal();
  });
  inputKeywords.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') closeModal();
  });

  function onEsc(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  document.addEventListener('keydown', onEsc);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  actions.appendChild(cancelBtn);
  actions.appendChild(saveBtn);

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(inputName);
  card.appendChild(inputKeywords);
  card.appendChild(colorRow);
  card.appendChild(actions);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  setTimeout(() => inputName.focus(), 50);
}

export function showConfirmModal(count, skippedProtectedCount = 0) {
  return new Promise((resolve) => {
    const existing = document.getElementById('gcm-modal-overlay');
    if (existing) {
      existing._gcmClose?.(false);
      existing.remove();
    }

    const overlay = document.createElement('div');
    overlay.id = 'gcm-modal-overlay';

    const card = document.createElement('div');
    card.className = 'gcm-modal-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');

    const title = document.createElement('div');
    title.className = 'gcm-modal-title';
    title.textContent = t().confirmDeleteTitle(count);

    const desc = document.createElement('div');
    desc.className = 'gcm-modal-desc';
    desc.textContent = t().confirmDeleteDesc(count, skippedProtectedCount);

    const actions = document.createElement('div');
    actions.className = 'gcm-modal-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'gcm-btn gcm-btn-cancel';
    cancelBtn.textContent = t().cancel;

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'gcm-btn gcm-btn-danger';
    confirmBtn.textContent = t().confirmDeleteBtn(count);

    let settled = false;
    const close = (result) => {
      if (settled) return;
      settled = true;
      document.removeEventListener('keydown', onEsc);
      overlay.remove();
      resolve(result);
    };
    overlay._gcmClose = close;

    function onEsc(e) {
      if (e.key === 'Escape') {
        close(false);
      }
    }
    document.addEventListener('keydown', onEsc);

    cancelBtn.addEventListener('click', () => close(false));
    confirmBtn.addEventListener('click', () => close(true));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(false);
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  });
}

export function updateStatusToast(text, current = null, total = null, autoHideMs = 0) {
  let toast = document.getElementById('gcm-status-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gcm-status-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    const label = document.createElement('div');
    label.id = 'gcm-status-label';

    const track = document.createElement('div');
    track.className = 'gcm-progress-track';
    track.id = 'gcm-status-track';
    track.setAttribute('role', 'progressbar');

    const fill = document.createElement('div');
    fill.className = 'gcm-progress-fill';
    fill.id = 'gcm-status-fill';

    track.appendChild(fill);
    toast.appendChild(label);
    toast.appendChild(track);
    document.body.appendChild(toast);
  }

  const labelEl = document.getElementById('gcm-status-label');
  const trackEl = document.getElementById('gcm-status-track');
  const fillEl = document.getElementById('gcm-status-fill');

  if (labelEl) labelEl.textContent = text;

  if (current !== null && total !== null && total > 0) {
    if (trackEl) trackEl.style.display = 'block';
    const pct = Math.min(100, Math.round((current / total) * 100));
    if (fillEl) fillEl.style.width = `${pct}%`;
  } else if (trackEl) {
    trackEl.style.display = 'none';
  }

  if (state.toastTimer) {
    clearTimeout(state.toastTimer);
    state.toastTimer = null;
  }

  if (autoHideMs > 0) {
    state.toastTimer = setTimeout(() => {
      toast?.remove();
      state.toastTimer = null;
    }, autoHideMs);
  }
}
