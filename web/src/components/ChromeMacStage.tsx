'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  assetPath,
  FOLDER_COLORS,
  FOLDERS_META,
  I18N,
  PLATFORMS,
  VAULT_PROMPTS,
  type DemoChat,
  type FolderId,
  type Lang,
  type PlatformKey
} from '@/data/foldyData';

interface ChromeMacStageProps {
  lang: Lang;
  activePlatform: PlatformKey;
  onSelectPlatform: (p: PlatformKey) => void;
}

interface CustomFolder {
  id: string;
  es: string;
  en: string;
  color: string;
}

interface ChatItem extends Omit<DemoChat, 'folder'> {
  folder: string;
  hidden?: boolean;
}

const PLATFORM_ORDER: PlatformKey[] = ['claude', 'gemini', 'chatgpt'];
const NEW_FOLDER_COLORS = ['#ec4899', '#06b6d4', '#84cc16', '#f97316'];

function buildInitialChats(): Record<PlatformKey, ChatItem[]> {
  return {
    claude: PLATFORMS.claude.chats.map((c) => ({ ...c, hidden: false })),
    gemini: PLATFORMS.gemini.chats.map((c) => ({ ...c, hidden: false })),
    chatgpt: PLATFORMS.chatgpt.chats.map((c) => ({ ...c, hidden: false }))
  };
}

export function ChromeMacStage({
  lang,
  activePlatform,
  onSelectPlatform
}: ChromeMacStageProps) {
  const [chatsByPlatform, setChatsByPlatform] = useState<Record<PlatformKey, ChatItem[]>>(buildInitialChats);
  const [customFolders, setCustomFolders] = useState<CustomFolder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [panelMinimized, setPanelMinimized] = useState(false);
  const [toolbarHorizontal, setToolbarHorizontal] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [showChromePopup, setShowChromePopup] = useState(false);
  const [composerText, setComposerText] = useState('');
  const [toast, setToast] = useState<{ msg: string; canUndo?: boolean } | null>(null);
  const undoSnapshotRef = useRef<ChatItem[] | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dict = I18N[lang];
  const platform = PLATFORMS[activePlatform];
  const currentChats = chatsByPlatform[activePlatform];

  const allFolders = useMemo(() => {
    const base = FOLDERS_META.map((f) => ({ ...f }));
    const custom = customFolders.map((f) => ({ id: f.id, es: f.es, en: f.en, color: f.color }));
    return [...base, ...custom, { id: 'hidden', es: 'Ocultos', en: 'Hidden', color: '#64748b' }];
  }, [customFolders]);

  const folderColorMap = useMemo(() => {
    const map: Record<string, string> = { ...FOLDER_COLORS };
    customFolders.forEach((f) => {
      map[f.id] = f.color;
    });
    return map;
  }, [customFolders]);

  const showToastMsg = (msg: string, canUndo = false) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, canUndo });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      undoSnapshotRef.current = null;
    }, canUndo ? 5000 : 2600);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const updateCurrentChats = (updater: (chats: ChatItem[]) => ChatItem[]) => {
    setChatsByPlatform((prev) => ({
      ...prev,
      [activePlatform]: updater(prev[activePlatform])
    }));
  };

  const handlePlatformSwitch = (key: PlatformKey) => {
    onSelectPlatform(key);
    setActiveFolder('all');
    setSearchQuery('');
    setShowMoveMenu(false);
    setShowVaultModal(false);
    setComposerText('');
  };

  const toggleChat = (id: string) => {
    updateCurrentChats((chats) =>
      chats.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const selectedChats = currentChats.filter((c) => c.selected);
  const selectedCount = selectedChats.length;

  const handleToggleLock = () => {
    if (!selectedCount) return;
    const allLocked = selectedChats.every((c) => c.locked);
    updateCurrentChats((chats) =>
      chats.map((c) => (c.selected ? { ...c, locked: !allLocked } : c))
    );
    showToastMsg(
      lang === 'es'
        ? allLocked
          ? `Candado quitado en ${selectedCount} chat(s)`
          : `${selectedCount} chat(s) protegidos con candado`
        : allLocked
          ? `Unlocked ${selectedCount} chat(s)`
          : `Locked ${selectedCount} chat(s)`
    );
  };

  const handleToggleHide = () => {
    if (!selectedCount) return;
    const hiding = activeFolder !== 'hidden';
    updateCurrentChats((chats) =>
      chats.map((c) => (c.selected ? { ...c, hidden: hiding, selected: false } : c))
    );
    showToastMsg(
      lang === 'es'
        ? hiding
          ? `${selectedCount} chat(s) movidos a Ocultos`
          : `${selectedCount} chat(s) restaurados`
        : hiding
          ? `Moved ${selectedCount} chat(s) to Hidden`
          : `Restored ${selectedCount} chat(s)`
    );
  };

  const handleSafeDelete = () => {
    if (!selectedCount) return;
    const deletable = selectedChats.filter((c) => !c.locked);
    const protectedCount = selectedCount - deletable.length;

    if (!deletable.length) {
      showToastMsg(
        lang === 'es'
          ? 'Todos los chats seleccionados tienen candado'
          : 'All selected chats are lock-protected'
      );
      return;
    }

    undoSnapshotRef.current = currentChats.map((c) => ({ ...c }));
    const deleteIds = new Set(deletable.map((c) => c.id));
    updateCurrentChats((chats) => chats.filter((c) => !deleteIds.has(c.id)));

    const msg =
      lang === 'es'
        ? `${deletable.length} eliminado(s)${protectedCount ? ` · ${protectedCount} protegido(s)` : ''}`
        : `Deleted ${deletable.length}${protectedCount ? ` · ${protectedCount} protected` : ''}`;
    showToastMsg(msg, true);
  };

  const handleUndo = () => {
    if (!undoSnapshotRef.current) return;
    const restored = undoSnapshotRef.current;
    undoSnapshotRef.current = null;
    updateCurrentChats(() => restored);
    setToast(null);
  };

  const handleMoveToFolder = (folderId: string) => {
    if (!selectedCount) return;
    undoSnapshotRef.current = currentChats.map((c) => ({ ...c }));
    updateCurrentChats((chats) =>
      chats.map((c) => (c.selected ? { ...c, folder: folderId, selected: false } : c))
    );
    setShowMoveMenu(false);
    const target = allFolders.find((f) => f.id === folderId);
    const label = target ? (lang === 'es' ? target.es : target.en) : folderId;
    showToastMsg(
      lang === 'es' ? `Movidos a ${label}` : `Moved to ${label}`,
      true
    );
  };

  const handleExportMd = async () => {
    if (!selectedCount) return;
    const lines = [
      `# Foldy Export — ${platform.name}`,
      ...selectedChats.map((c) => `- ${lang === 'es' ? c.es : c.en} (${c.folder})`)
    ].join('\n');
    try {
      await navigator.clipboard.writeText(lines);
    } catch {
      // Clipboard optional
    }
    showToastMsg(
      lang === 'es'
        ? `Índice Markdown (.md) de ${selectedCount} chat(s) copiado`
        : `Copied Markdown (.md) index for ${selectedCount} chat(s)`
    );
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFolderName.trim();
    if (!trimmed) return;
    const id = `custom_${Date.now()}`;
    const color = NEW_FOLDER_COLORS[customFolders.length % NEW_FOLDER_COLORS.length];
    setCustomFolders((prev) => [...prev, { id, es: trimmed, en: trimmed, color }]);
    setNewFolderName('');
    setShowNewFolderForm(false);
    setActiveFolder(id);
    showToastMsg(lang === 'es' ? `Carpeta "${trimmed}" creada` : `Folder "${trimmed}" created`);
  };

  const handleInjectPrompt = (text: string) => {
    setComposerText(text);
    setShowVaultModal(false);
    showToastMsg(lang === 'es' ? 'Prompt inyectado en el editor' : 'Prompt injected into composer');
  };

  const visibleChats = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return currentChats.filter((chat) => {
      if (activeFolder === 'hidden') {
        if (!chat.hidden) return false;
      } else {
        if (chat.hidden) return false;
        if (activeFolder !== 'all' && chat.folder !== activeFolder) return false;
      }
      const title = (lang === 'es' ? chat.es : chat.en).toLowerCase();
      return !q || title.includes(q);
    });
  }, [currentChats, lang, activeFolder, searchQuery]);

  const tags = lang === 'es' ? platform.tagsEs : platform.tagsEn;

  return (
    <div className="macos-chrome">
      <div className="chrome-tabstrip">
        <div className="macos-lights" aria-hidden="true">
          <span className="macos-light red" />
          <span className="macos-light yellow" />
          <span className="macos-light green" />
        </div>

        <div className="chrome-tabs" role="tablist" aria-label="Pestañas de Chrome en macOS">
          {PLATFORM_ORDER.map((key, idx) => {
            const p = PLATFORMS[key];
            const isSelected = key === activePlatform;
            return (
              <button
                key={key}
                className="chrome-tab"
                role="tab"
                type="button"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handlePlatformSwitch(key)}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                  e.preventDefault();
                  const nextKey =
                    e.key === 'ArrowRight'
                      ? PLATFORM_ORDER[(idx + 1) % PLATFORM_ORDER.length]
                      : PLATFORM_ORDER[(idx - 1 + PLATFORM_ORDER.length) % PLATFORM_ORDER.length];
                  handlePlatformSwitch(nextKey);
                }}
              >
                <span className={`platform-dot dot-${key}`} aria-hidden="true" />
                <span>{p.tabLabel}</span>
                <span className="chrome-tab-close" aria-hidden="true">×</span>
              </button>
            );
          })}
          <span className="chrome-tab-plus" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </div>
      </div>

      <div className="chrome-toolbar">
        <div className="chrome-nav-btns" aria-hidden="true">
          <span className="chrome-nav-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </span>
          <span className="chrome-nav-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
          <span className="chrome-nav-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </span>
        </div>

        <div className="chrome-omnibox">
          <div className="chrome-omnibox-left">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              <span className="chrome-omnibox-scheme">https://</span>
              <strong>{platform.urlHost}</strong>
              <span className="chrome-omnibox-scheme">{platform.urlPath}</span>
            </span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>

        <div className="chrome-extensions">
          <button
            type="button"
            className={`chrome-ext-foldy${showChromePopup ? ' is-open' : ''}`}
            title="Foldy v4.2.5"
            aria-label="Abrir popup de Foldy"
            aria-expanded={showChromePopup}
            onClick={() => setShowChromePopup((prev) => !prev)}
          >
            <img src={assetPath('/foldy-icon.svg')} alt="" width={18} height={18} />
          </button>
          <span className="chrome-profile-chip" aria-hidden="true">AR</span>
        </div>
      </div>

      <div className="ai-workspace" data-platform={activePlatform}>
        {/* Live Interactive Chrome Extension Popup */}
        {showChromePopup && (
          <div className="chrome-popup-popover" role="dialog" aria-label="Popup rápido de Foldy">
            <div className="cp-head">
              <span className="fp-brand">
                <img src={assetPath('/foldy-icon.svg')} alt="" width={16} height={16} />
                Foldy <span className="version-pill">v4.2.5</span>
              </span>
              <button type="button" className="cp-close" onClick={() => setShowChromePopup(false)} aria-label="Cerrar popup">×</button>
            </div>
            <div className="cp-quota">
              <span>Cloud Sync</span>
              <span className="mono">2.7 / 8.0 KB</span>
            </div>
            <div className="cp-stats">
              {PLATFORM_ORDER.map((k) => {
                const list = chatsByPlatform[k];
                const locked = list.filter((c) => c.locked).length;
                return (
                  <button
                    key={k}
                    type="button"
                    className={`cp-stat-row${k === activePlatform ? ' is-active' : ''}`}
                    onClick={() => {
                      handlePlatformSwitch(k);
                      setShowChromePopup(false);
                    }}
                  >
                    <span className="cp-stat-left">
                      <span className={`platform-dot dot-${k}`} />
                      <span>{PLATFORMS[k].tabLabel}</span>
                    </span>
                    <span className="mono cp-stat-nums">{list.length} · {locked}</span>
                  </button>
                );
              })}
            </div>
            <div className="cp-actions">
              <button type="button" className="fp-foot-btn" onClick={() => { setPanelMinimized((m) => !m); setShowChromePopup(false); }}>
                {panelMinimized ? (lang === 'es' ? 'Mostrar panel' : 'Show panel') : (lang === 'es' ? 'Minimizar panel' : 'Minimize panel')}
              </button>
              <button type="button" className="fp-foot-btn is-primary" onClick={() => { setShowVaultModal(true); setShowChromePopup(false); }}>
                {dict.fpPrompts}
              </button>
            </div>
          </div>
        )}

        <aside className="ws-sidebar" aria-label="Conversaciones de demostración">
          <div className="ws-brand-row">
            <span className="ws-brand-left">
              <span>{platform.name}</span>
            </span>
            <span className="ws-count-badge mono">{visibleChats.length}</span>
          </div>

          <div className="ws-new-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>{dict.wsNewChat}</span>
          </div>

          <div className="ws-section-label">{dict.wsRecent}</div>

          <div className="ws-chat-list">
            {visibleChats.length === 0 ? (
              <div className="ws-empty">
                {lang === 'es' ? 'Sin conversaciones en esta vista.' : 'No conversations in this view.'}
              </div>
            ) : (
              visibleChats.map((chat) => {
                const title = lang === 'es' ? chat.es : chat.en;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    className={`ws-chat-row${chat.selected ? ' is-selected' : ''}`}
                    onClick={() => toggleChat(chat.id)}
                  >
                    <span className="ws-check" aria-hidden="true">
                      {chat.selected && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className="ws-chat-title">{title}</span>
                    {chat.locked && (
                      <span className="ws-lock-badge" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                    )}
                    <span
                      className="ws-folder-dot"
                      style={{ background: folderColorMap[chat.folder] || '#4c8df6' }}
                      aria-hidden="true"
                    />
                  </button>
                );
              })
            )}
          </div>

          <div className="ws-profile">
            <span className="ws-avatar" aria-hidden="true">AR</span>
            <span className="ws-user-meta">
              <span className="ws-user-name">Alex Rivera</span>
              <span className="ws-user-plan">Workspace Pro</span>
            </span>
          </div>
        </aside>

        <div className="ws-main">
          {/* Interactive Vertical / Horizontal Foldy Bulk Action Toolbar */}
          <div className={`foldy-vbar${toolbarHorizontal ? ' is-horizontal' : ''}`} aria-label="Barra de acciones Foldy">
            <button
              type="button"
              className="foldy-vbar-btn"
              title={lang === 'es' ? 'Rotar barra (V/H)' : 'Rotate toolbar (V/H)'}
              onClick={() => setToolbarHorizontal((h) => !h)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
            <span className="foldy-vbar-count" title={`${selectedCount} seleccionados`}>{selectedCount}</span>
            <span className="foldy-vbar-sep" />
            <div className="vbar-move-wrap">
              <button
                type="button"
                className="foldy-vbar-btn"
                title={lang === 'es' ? 'Mover a carpeta' : 'Move to folder'}
                disabled={!selectedCount}
                onClick={() => setShowMoveMenu((m) => !m)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              {showMoveMenu && selectedCount > 0 && (
                <div className="move-popover" role="menu">
                  {allFolders
                    .filter((f) => f.id !== 'all' && f.id !== 'hidden')
                    .map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        role="menuitem"
                        className="move-popover-item"
                        onClick={() => handleMoveToFolder(f.id)}
                      >
                        <span className="platform-dot" style={{ background: f.color || '#4c8df6' }} />
                        <span>{lang === 'es' ? f.es : f.en}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="foldy-vbar-btn"
              title={lang === 'es' ? 'Bloquear / Desbloquear' : 'Lock / Unlock'}
              disabled={!selectedCount}
              onClick={handleToggleLock}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </button>
            <button
              type="button"
              className="foldy-vbar-btn"
              title={activeFolder === 'hidden' ? (lang === 'es' ? 'Mostrar' : 'Unhide') : (lang === 'es' ? 'Ocultar' : 'Hide')}
              disabled={!selectedCount}
              onClick={handleToggleHide}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
            <button
              type="button"
              className="foldy-vbar-btn"
              title={lang === 'es' ? 'Exportar Markdown (.md)' : 'Export Markdown (.md)'}
              disabled={!selectedCount}
              onClick={handleExportMd}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </button>
            <span className="foldy-vbar-sep" />
            <button
              type="button"
              className="foldy-vbar-btn is-danger"
              title={lang === 'es' ? 'Borrado seguro (respeta candados)' : 'Safe delete (skips locked)'}
              disabled={!selectedCount}
              onClick={handleSafeDelete}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </button>
          </div>

          {/* Interactive AI Composer */}
          <div className="ws-center">
            <div className="ws-greeting">
              {lang === 'es' ? platform.greetingEs : platform.greetingEn}
            </div>
            <div className="ws-composer">
              <textarea
                className="ws-composer-input"
                rows={2}
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                placeholder={lang === 'es' ? platform.placeholderEs : platform.placeholderEn}
                aria-label="Editor de demostración"
              />
              <div className="ws-composer-bottom">
                <span className="ws-model-pill">{platform.model}</span>
                <button
                  type="button"
                  className="ws-prompt-shortcut"
                  onClick={() => setShowVaultModal(true)}
                >
                  {lang === 'es' ? 'Abrir Bóveda · Alt+Shift+F' : 'Open Vault · Alt+Shift+F'}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Prompt Vault Modal inside Chrome */}
          {showVaultModal && (
            <div className="ws-vault-overlay" role="dialog" aria-label="Bóveda de Prompts interactiva">
              <div className="ws-vault-modal">
                <div className="cp-head">
                  <span className="fp-brand">{dict.fpPrompts}</span>
                  <button type="button" className="cp-close" onClick={() => setShowVaultModal(false)} aria-label="Cerrar">×</button>
                </div>
                <div className="ws-vault-list">
                  {VAULT_PROMPTS.map((p) => {
                    const preview = lang === 'es' ? p.previewEs : p.previewEn;
                    return (
                      <div key={p.id} className="ws-vault-row">
                        <div className="vault-item-main">
                          <div className="vault-item-head">
                            <span className="vault-item-title">{lang === 'es' ? p.titleEs : p.titleEn}</span>
                            <span className="vault-tag">{lang === 'es' ? p.tagEs : p.tagEn}</span>
                          </div>
                          <p className="vault-item-preview">{preview}</p>
                        </div>
                        <button
                          type="button"
                          className="vault-insert-btn"
                          onClick={() => handleInjectPrompt(preview)}
                        >
                          {dict.vaultInsert}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Toast with 5-second Undo */}
          {toast && (
            <div className="ws-toast" role="status" aria-live="polite">
              <span>{toast.msg}</span>
              {toast.canUndo && (
                <button type="button" className="ws-toast-undo" onClick={handleUndo}>
                  {lang === 'es' ? 'Deshacer' : 'Undo'}
                </button>
              )}
            </div>
          )}

          {/* Floating Foldy Panel OR Minimized Pill */}
          {panelMinimized ? (
            <button
              type="button"
              className="foldy-min-pill"
              onClick={() => setPanelMinimized(false)}
              aria-label="Expandir panel de Foldy"
            >
              <img src={assetPath('/foldy-icon.svg')} alt="" width={18} height={18} />
              <span>Foldy</span>
            </button>
          ) : (
            <div className="foldy-float-panel" aria-label="Panel flotante interactivo de Foldy">
              <div className="fp-head">
                <span className="fp-brand">
                  <img src={assetPath('/foldy-icon.svg')} alt="" width={16} height={16} />
                  Foldy
                </span>
                <div className="fp-head-actions">
                  <button
                    type="button"
                    className="fp-new-btn"
                    onClick={() => setShowNewFolderForm((v) => !v)}
                  >
                    {dict.fpNew}
                  </button>
                  <button
                    type="button"
                    className="fp-min-btn"
                    title={lang === 'es' ? 'Minimizar' : 'Minimize'}
                    onClick={() => setPanelMinimized(true)}
                  >
                    —
                  </button>
                </div>
              </div>

              {showNewFolderForm && (
                <form className="fp-new-form" onSubmit={handleCreateFolder}>
                  <input
                    className="fp-search-input"
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder={lang === 'es' ? 'Nombre de carpeta...' : 'Folder name...'}
                    maxLength={20}
                    autoFocus
                  />
                  <button type="submit" className="fp-new-btn">OK</button>
                </form>
              )}

              <div className="fp-search-row">
                <input
                  className="fp-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.fpSearch}
                  aria-label="Filtrar chats de demostración"
                />
              </div>

              <div className="fp-pills">
                {allFolders.map((f) => {
                  const count =
                    f.id === 'all'
                      ? currentChats.filter((c) => !c.hidden).length
                      : f.id === 'hidden'
                        ? currentChats.filter((c) => c.hidden).length
                        : currentChats.filter((c) => !c.hidden && c.folder === f.id).length;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      className={`fp-pill${activeFolder === f.id ? ' is-active' : ''}`}
                      onClick={() => setActiveFolder(f.id)}
                    >
                      {f.color && (
                        <span
                          className="platform-dot"
                          style={{ background: f.color, width: 6, height: 6 }}
                        />
                      )}
                      <span>{lang === 'es' ? f.es : f.en}</span>
                      <span className="fp-pill-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="fp-footer">
                <button
                  type="button"
                  className="fp-foot-btn"
                  onClick={() => {
                    setChatsByPlatform(buildInitialChats());
                    setActiveFolder('all');
                    showToastMsg(lang === 'es' ? 'Demo reiniciada' : 'Demo reset');
                  }}
                >
                  {lang === 'es' ? 'Reiniciar' : 'Reset'}
                </button>
                <button
                  type="button"
                  className="fp-foot-btn is-primary"
                  onClick={() => setShowVaultModal(true)}
                >
                  {dict.fpPrompts}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="stage-footer">
        <p className="stage-caption">
          {lang === 'es' ? platform.captionEs : platform.captionEn}
        </p>
        <div className="stage-tags">
          {tags.map((tag) => (
            <span key={tag} className="stage-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
