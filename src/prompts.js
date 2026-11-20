import { updateStatusToast } from './dialogs.js';
import { ICONS, createIconElement, setButtonIconText } from './icons.js';
import { SELECTORS } from './platform.js';
import { state, t } from './state.js';
import { saveFolderData } from './storage.js';

/**
 * Inserta el texto del prompt en el cuadro de entrada del chat activo (compatible con
 * textarea y editores contenteditable de Gemini, ChatGPT, Claude, DeepSeek y OpenCode).
 */
export function insertPromptIntoChat(text) {
  const input = document.querySelector(SELECTORS.promptInput);
  if (!input) {
    try {
      navigator.clipboard?.writeText(text);
    } catch (_) {}
    updateStatusToast(t().toastPromptCopied, null, null, 2800);
    return false;
  }

  input.focus();

  if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
    const existing = input.value ? `${input.value}\n` : '';
    const nextValue = existing + text;
    // Usar el setter nativo para que React/Vue detecten el cambio de estado
    const proto = input.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement?.prototype : window.HTMLInputElement?.prototype;
    const nativeSetter = proto ? Object.getOwnPropertyDescriptor(proto, 'value')?.set : null;
    if (nativeSetter) {
      nativeSetter.call(input, nextValue);
    } else {
      input.value = nextValue;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    // Editor contenteditable (ProseMirror en Claude/ChatGPT, Quill/RichTextarea en Gemini)
    const currentText = (input.textContent || '').trim();
    const isRichEditor =
      input.classList?.contains('ProseMirror') ||
      input.classList?.contains('ql-editor') ||
      !!input.querySelector?.('p');
    if (isRichEditor) {
      const lines = (currentText ? `${currentText}\n${text}` : text).split(/\r?\n/);
      input.textContent = '';
      for (const line of lines) {
        const p = document.createElement('p');
        if (line) {
          p.textContent = line;
        } else {
          p.appendChild(document.createElement('br'));
        }
        input.appendChild(p);
      }
    } else {
      const nextText = currentText ? `${currentText}\n${text}` : text;
      input.textContent = nextText;
    }
    const InputEvt = typeof InputEvent === 'function' ? InputEvent : Event;
    input.dispatchEvent(new InputEvt('input', { bubbles: true, inputType: 'insertText', data: text }));
  }

  updateStatusToast(t().toastPromptInserted, null, null, 2500);
  return true;
}

export function openPromptsModal() {
  const existing = document.getElementById('gcm-modal-overlay');
  if (existing) {
    existing._gcmClose?.(false);
    existing.remove();
  }

  if (!Array.isArray(state.folderState.prompts)) {
    state.folderState.prompts = t().defaultPrompts.map((p) => ({ ...p }));
  }

  const isEs = state.folderState.lang === 'es';
  let filterQuery = '';
  let editingPromptId = null;

  const overlay = document.createElement('div');
  overlay.id = 'gcm-modal-overlay';

  const card = document.createElement('div');
  card.className = 'gcm-modal-card gcm-prompts-modal-card gcm-cmd-palette';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');

  const closeModal = () => {
    document.removeEventListener('keydown', onEsc);
    overlay.remove();
  };
  overlay._gcmClose = closeModal;

  // 1. Command Palette Top Search & Header Bar
  const cmdHeader = document.createElement('div');
  cmdHeader.className = 'gcm-cmd-header';

  const searchIcon = createIconElement(ICONS.search);
  searchIcon.classList.add('gcm-cmd-search-icon');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'gcm-cmd-search-input';
  searchInput.placeholder = t().cmdSearchPlaceholder;

  const toggleFormBtn = document.createElement('button');
  toggleFormBtn.type = 'button';
  toggleFormBtn.className = 'gcm-btn gcm-btn-folder gcm-cmd-new-btn';
  setButtonIconText(toggleFormBtn, ICONS.plus, t().cmdNewBtn);

  cmdHeader.appendChild(searchIcon);
  cmdHeader.appendChild(searchInput);
  cmdHeader.appendChild(toggleFormBtn);

  // 2. Collapsible Create / Edit Drawer
  const formBox = document.createElement('div');
  formBox.className = 'gcm-prompt-form gcm-cmd-drawer';
  formBox.style.display = 'none';

  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.className = 'gcm-modal-input';
  inputTitle.placeholder = t().promptTitlePlaceholder;

  const inputCategory = document.createElement('input');
  inputCategory.type = 'text';
  inputCategory.className = 'gcm-modal-input';
  inputCategory.placeholder = t().promptCategoryPlaceholder;

  const inputBody = document.createElement('textarea');
  inputBody.className = 'gcm-modal-input gcm-modal-textarea gcm-mono-textarea';
  inputBody.placeholder = t().promptBodyPlaceholder;
  inputBody.rows = 3;

  const formActions = document.createElement('div');
  formActions.className = 'gcm-cmd-drawer-actions';

  const cancelEditBtn = document.createElement('button');
  cancelEditBtn.type = 'button';
  cancelEditBtn.className = 'gcm-btn gcm-btn-cancel';
  cancelEditBtn.textContent = t().cancel;

  const savePromptBtn = document.createElement('button');
  savePromptBtn.type = 'button';
  savePromptBtn.className = 'gcm-btn gcm-btn-stop gcm-add-prompt-submit';
  setButtonIconText(savePromptBtn, ICONS.plus, t().addPromptBtn);

  formActions.appendChild(cancelEditBtn);
  formActions.appendChild(savePromptBtn);
  formBox.appendChild(inputTitle);
  formBox.appendChild(inputCategory);
  formBox.appendChild(inputBody);
  formBox.appendChild(formActions);

  const openDrawer = (promptToEdit = null) => {
    editingPromptId = promptToEdit ? promptToEdit.id : null;
    inputTitle.value = promptToEdit ? promptToEdit.title : '';
    inputCategory.value = promptToEdit?.category || '';
    inputBody.value = promptToEdit ? promptToEdit.content.trim() : '';
    setButtonIconText(
      savePromptBtn,
      promptToEdit ? ICONS.editPencil : ICONS.plus,
      promptToEdit ? t().updatePromptBtn : t().addPromptBtn
    );
    formBox.style.display = 'flex';
    inputTitle.focus();
  };

  const closeDrawer = () => {
    editingPromptId = null;
    inputTitle.value = '';
    inputCategory.value = '';
    inputBody.value = '';
    formBox.style.display = 'none';
  };

  toggleFormBtn.addEventListener('click', () => {
    if (formBox.style.display === 'none') openDrawer(null);
    else closeDrawer();
  });
  cancelEditBtn.addEventListener('click', closeDrawer);

  // 3. Prompt List Container
  const listContainer = document.createElement('div');
  listContainer.className = 'gcm-prompts-list';

  const inferCategory = (p) => {
    if (p.category) return p.category;
    const lower = (p.title + ' ' + p.content).toLowerCase();
    if (/código|code|bug|script|sql|react|python/.test(lower)) return isEs ? 'Código' : 'Code';
    if (/resumen|summary|ejecutivo|bullet/.test(lower)) return isEs ? 'Síntesis' : 'Summary';
    if (/traduc|translat|idioma|english/.test(lower)) return isEs ? 'Idiomas' : 'Language';
    return 'General';
  };

  const renderPromptsList = () => {
    listContainer.textContent = '';
    const q = filterQuery.trim().toLowerCase();
    const filtered = state.folderState.prompts.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'gcm-prompts-empty';
      empty.textContent = q ? t().promptsNoResults(filterQuery) : t().promptsEmpty;
      listContainer.appendChild(empty);
      return;
    }

    filtered.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = 'gcm-prompt-item' + (idx === 0 && q ? ' gcm-prompt-item-active' : '');
      item.setAttribute('tabindex', '0');

      const info = document.createElement('div');
      info.className = 'gcm-prompt-info';

      const titleRow = document.createElement('div');
      titleRow.className = 'gcm-prompt-title-row';

      const itemTitle = document.createElement('span');
      itemTitle.className = 'gcm-prompt-item-title';
      itemTitle.textContent = p.title;

      const tag = document.createElement('span');
      tag.className = 'gcm-prompt-tag';
      tag.textContent = inferCategory(p);

      titleRow.appendChild(itemTitle);
      titleRow.appendChild(tag);

      const itemPreview = document.createElement('div');
      itemPreview.className = 'gcm-prompt-item-preview';
      itemPreview.textContent = p.content.trim().slice(0, 140) + (p.content.length > 140 ? '…' : '');

      info.appendChild(titleRow);
      info.appendChild(itemPreview);

      const itemActions = document.createElement('div');
      itemActions.className = 'gcm-prompt-item-actions';

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'gcm-prompt-icon-btn';
      copyBtn.appendChild(createIconElement(ICONS.copy));
      copyBtn.title = t().copyPromptTitle;
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        try {
          navigator.clipboard?.writeText(p.content.trim());
        } catch (_) {}
        updateStatusToast(t().toastPromptCopied, null, null, 2400);
      });

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'gcm-prompt-icon-btn';
      editBtn.appendChild(createIconElement(ICONS.editPencil));
      editBtn.title = t().editPromptTitle;
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDrawer(p);
      });

      const useBtn = document.createElement('button');
      useBtn.type = 'button';
      useBtn.className = 'gcm-btn gcm-btn-stop gcm-prompt-use-btn';
      useBtn.textContent = `${t().insertPromptBtn} ↵`;
      useBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
        insertPromptIntoChat(p.content);
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'gcm-prompt-icon-btn gcm-prompt-del-btn';
      delBtn.appendChild(createIconElement(ICONS.close));
      delBtn.title = t().deletePromptTitle;
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.folderState.prompts = state.folderState.prompts.filter((itemPrompt) => itemPrompt.id !== p.id);
        saveFolderData(state.folderState);
        renderPromptsList();
      });

      itemActions.appendChild(copyBtn);
      itemActions.appendChild(editBtn);
      itemActions.appendChild(useBtn);
      itemActions.appendChild(delBtn);

      item.addEventListener('click', () => {
        closeModal();
        insertPromptIntoChat(p.content);
      });
      item.addEventListener('keydown', (e) => {
        if (e.target === item && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          closeModal();
          insertPromptIntoChat(p.content);
        }
      });

      item.appendChild(info);
      item.appendChild(itemActions);
      listContainer.appendChild(item);
    });
  };

  searchInput.addEventListener('input', (e) => {
    filterQuery = e.target.value;
    renderPromptsList();
  });

  savePromptBtn.addEventListener('click', () => {
    const newTitle = inputTitle.value.trim();
    const newCat = inputCategory.value.trim();
    const newBody = inputBody.value.trim();
    if (!newTitle || !newBody) {
      (!newTitle ? inputTitle : inputBody).focus();
      return;
    }
    if (editingPromptId) {
      const target = state.folderState.prompts.find((p) => p.id === editingPromptId);
      if (target) {
        target.title = newTitle;
        target.category = newCat || undefined;
        target.content = newBody + '\n\n';
      }
    } else {
      state.folderState.prompts.push({
        id: 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
        title: newTitle,
        category: newCat || undefined,
        content: newBody + '\n\n'
      });
    }
    saveFolderData(state.folderState);
    closeDrawer();
    renderPromptsList();
  });

  renderPromptsList();

  // 4. Command Palette Footer with Keyboard Hints
  const cmdFooter = document.createElement('div');
  cmdFooter.className = 'gcm-cmd-footer';

  const footerHint = document.createElement('span');
  footerHint.className = 'gcm-cmd-footer-hint';
  footerHint.textContent = t().cmdFooterHint;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'gcm-btn gcm-btn-cancel';
  closeBtn.textContent = t().cancel;
  closeBtn.addEventListener('click', closeModal);

  cmdFooter.appendChild(footerHint);
  cmdFooter.appendChild(closeBtn);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  function onEsc(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  document.addEventListener('keydown', onEsc);

  card.appendChild(cmdHeader);
  card.appendChild(formBox);
  card.appendChild(listContainer);
  card.appendChild(cmdFooter);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  setTimeout(() => searchInput.focus(), 40);
}
