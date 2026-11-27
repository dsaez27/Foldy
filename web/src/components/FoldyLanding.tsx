'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  assetPath,
  I18N,
  PLATFORMS,
  THEMES,
  VAULT_PROMPTS,
  type Lang,
  type PlatformKey
} from '@/data/foldyData';
import { ThreeBackdrop } from './ThreeBackdrop';
import { ChromeMacStage } from './ChromeMacStage';

const CLI_CMD = 'agy plugin install https://github.com/dsaez27/Foldy-agy';

export function FoldyLanding() {
  const [lang, setLang] = useState<Lang>('es');
  const [activePlatform, setActivePlatform] = useState<PlatformKey>('gemini');
  const [lightMode, setLightMode] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('adaptive');
  const [insertedId, setInsertedId] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [syncCode, setSyncCode] = useState('foldy1:H4sIAAAAAAAAA6tWKkktLjFVslIq...');
  const [syncCopied, setSyncCopied] = useState(false);
  const [lightboxState, setLightboxState] = useState<{ src: string; alt: string } | null>(null);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dict = I18N[lang];
  const platform = PLATFORMS[activePlatform];
  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  useEffect(() => {
    const saved = window.localStorage.getItem('foldy_landing_lang');
    if (saved === 'es' || saved === 'en') {
      setLang(saved);
    } else if (navigator.language?.toLowerCase().startsWith('en')) {
      setLang('en');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('foldy_landing_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = lightMode ? 'light' : 'dark';
    root.style.setProperty('--accent', platform.accent);
    root.style.setProperty('--accent-2', platform.accent2);
    root.style.setProperty('--accent-rgb', platform.rgb);
    root.style.setProperty('--accent-contrast', platform.contrast);
    root.style.setProperty('--accent-soft', `rgba(${platform.rgb}, ${lightMode ? 0.12 : 0.15})`);
    root.style.setProperty('--accent-border', `rgba(${platform.rgb}, ${lightMode ? 0.36 : 0.45})`);
  }, [platform, lightMode]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxState({ src, alt });
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
    });
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
  };

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText(CLI_CMD);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1600);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleInsertPrompt = (id: string) => {
    setInsertedId(id);
    setTimeout(() => setInsertedId((prev) => (prev === id ? null : prev)), 1400);
  };

  const handleGenerateSyncCode = async () => {
    const payload = JSON.stringify({
      v: '4.2.5',
      platform: activePlatform,
      theme: activeThemeId,
      lang,
      folders: ['Programación', 'Investigación', 'Producto', 'Diseño']
    });
    try {
      if (typeof CompressionStream !== 'undefined') {
        const stream = new Blob([payload]).stream().pipeThrough(new CompressionStream('gzip'));
        const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
        let bin = '';
        bytes.forEach((b) => {
          bin += String.fromCharCode(b);
        });
        const b64url = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        const token = `foldy1:${b64url}`;
        setSyncCode(token);
        await navigator.clipboard?.writeText(`/foldy sync ${token}`).catch(() => {});
      } else {
        const token = `foldy1:${btoa(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;
        setSyncCode(token);
      }
      setSyncCopied(true);
      setTimeout(() => setSyncCopied(false), 1800);
    } catch {
      // Fallback no-op
    }
  };

  const handleBentoPointer = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <a className="skip-link" href="#main">{dict.skip}</a>
      <ThreeBackdrop
        accentHex={platform.accent}
        secondaryHex={platform.accent2}
        lightMode={lightMode}
      />

      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#">
            <img className="brand-icon" src={assetPath('/foldy-icon.svg')} alt="" width={30} height={30} />
            <span>Foldy</span>
            <span className="version-pill">v4.2.5</span>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <a href="#platforms">{dict.navPlatforms}</a>
            <a href="#anatomy">{dict.navAnatomy}</a>
            <a href="#themes">{dict.navThemes}</a>
            <a href="#install">{dict.navInstall}</a>
            <a href="#sync">{dict.navSync}</a>
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              type="button"
              onClick={() => setLightMode((m) => !m)}
              aria-label={lightMode ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
              title={lightMode ? 'Modo oscuro' : 'Modo claro'}
            >
              {lightMode ? (
                <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
            <button
              className="icon-btn"
              type="button"
              onClick={() => setLang((prev) => (prev === 'es' ? 'en' : 'es'))}
              aria-label={lang === 'es' ? 'Switch language to English' : 'Cambiar idioma a español'}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a className="icon-btn" href="https://github.com/dsaez27/Foldy" target="_blank" rel="noopener noreferrer">
              <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              className="btn btn-primary btn-sm"
              href="https://github.com/dsaez27/Foldy/releases/download/v4.2.5/Foldy-v4.2.5-chromium.zip"
            >
              {dict.navDownload}
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="platforms">
          <div className="container">
            <div className="hero-center">
              <h1 className="hero-title">{dict.heroTitle}</h1>
              <p className="hero-sub">{dict.heroSub}</p>
              <div className="hero-ctas">
                <a
                  className="btn btn-primary"
                  href="https://github.com/dsaez27/Foldy/releases/download/v4.2.5/Foldy-v4.2.5-chromium.zip"
                >
                  <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{dict.ctaDownload}</span>
                </a>
                <a className="btn btn-secondary" href="#install">
                  <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                  <span>{dict.ctaCli}</span>
                </a>
              </div>
              <div className="hero-meta">
                <span>{dict.metaM3}</span>
                <span aria-hidden="true">·</span>
                <span>{dict.metaMit}</span>
                <span aria-hidden="true">·</span>
                <span>{dict.metaLocal}</span>
              </div>
            </div>

            <div className="chrome-stage-bezel" onPointerMove={handleBentoPointer}>
              <ChromeMacStage
                lang={lang}
                activePlatform={activePlatform}
                onSelectPlatform={setActivePlatform}
              />
            </div>

            <div className="compat-strip">
              <span className="compat-label">{dict.compatLabel}</span>
              <ul className="compat-list">
                <li className="compat-item"><span className="platform-dot dot-gemini" aria-hidden="true" />Google Gemini</li>
                <li className="compat-item"><span className="platform-dot dot-chatgpt" aria-hidden="true" />OpenAI ChatGPT &amp; Codex</li>
                <li className="compat-item"><span className="platform-dot dot-claude" aria-hidden="true" />Anthropic Claude</li>
                <li className="compat-item"><span className="platform-dot dot-deepseek" aria-hidden="true" />DeepSeek Chat</li>
                <li className="compat-item"><span className="platform-dot dot-opencode" aria-hidden="true" />OpenCode AI</li>
                <li className="compat-item">
                  <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                  Antigravity CLI
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="anatomy">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">{dict.anatomyTitle}</h2>
              <p className="section-desc">{dict.anatomyDesc}</p>
            </header>

            <div className="spreads">
              {/* Spread 1 */}
              <article className="spread">
                <div className="spread-copy">
                  <h3>{dict.s1Title}</h3>
                  <p>{dict.s1Desc}</p>
                  <ul className="spec-list">
                    {[dict.s1Li1, dict.s1Li2, dict.s1Li3].map((item) => (
                      <li key={item}>
                        <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="spread-visual visual-stack-panel">
                  <div className="demo-panel-card" aria-label="Vista limpia del panel flotante de carpetas">
                    <div className="fp-head">
                      <span className="fp-brand">
                        <img src={assetPath('/foldy-icon.svg')} alt="" width={18} height={18} />
                        Foldy
                      </span>
                      <span className="fp-new-btn">{dict.fpNew}</span>
                    </div>
                    <div className="tp-search">{dict.tpSearch}</div>
                    <div className="fp-pills">
                      <span className="fp-pill is-active">{lang === 'es' ? 'Todas' : 'All'} <span className="fp-pill-count">14</span></span>
                      <span className="fp-pill"><span className="platform-dot dot-gemini" />{dict.tpDev} <span className="fp-pill-count">5</span></span>
                      <span className="fp-pill"><span className="platform-dot dot-chatgpt" />{dict.tpStudy} <span className="fp-pill-count">4</span></span>
                      <span className="fp-pill"><span className="platform-dot dot-amber" />{dict.tpIdeas} <span className="fp-pill-count">3</span></span>
                      <span className="fp-pill"><span className="platform-dot dot-opencode" />{lang === 'es' ? 'Diseño' : 'Design'} <span className="fp-pill-count">2</span></span>
                      <span className="fp-pill"><span className="platform-dot dot-slate" />{lang === 'es' ? 'Ocultos' : 'Hidden'} <span className="fp-pill-count">6</span></span>
                    </div>
                    <div className="fp-footer">
                      <span className="fp-foot-btn">{dict.fpLoad}</span>
                      <span className="fp-foot-btn is-primary">{dict.fpPrompts}</span>
                    </div>
                  </div>

                  <img
                    className="ui-shot-pill"
                    src={assetPath('/screenshots/foldy-pill.png')}
                    alt="Cápsula minimizada de Foldy"
                    width={150}
                    height={62}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              {/* Spread 2 */}
              <article className="spread is-reversed">
                <div className="spread-copy">
                  <h3>{dict.s2Title}</h3>
                  <p>{dict.s2Desc}</p>
                  <ul className="spec-list">
                    {[dict.s2Li1, dict.s2Li2, dict.s2Li3].map((item) => (
                      <li key={item}>
                        <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="spread-visual">
                  <div className="demo-vault-card" aria-label="Demostración de Bóveda de Prompts">
                    {VAULT_PROMPTS.map((p) => {
                      const isDone = insertedId === p.id;
                      return (
                        <div className="vault-item" key={p.id}>
                          <div className="vault-item-main">
                            <div className="vault-item-head">
                              <span className="vault-item-title">{lang === 'es' ? p.titleEs : p.titleEn}</span>
                              <span className="vault-tag">{lang === 'es' ? p.tagEs : p.tagEn}</span>
                            </div>
                            <p className="vault-item-preview">{lang === 'es' ? p.previewEs : p.previewEn}</p>
                          </div>
                          <button
                            className={`vault-insert-btn${isDone ? ' is-done' : ''}`}
                            type="button"
                            onClick={() => handleInsertPrompt(p.id)}
                          >
                            {isDone ? dict.vaultInserted : dict.vaultInsert}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>

              {/* Spread 3 */}
              <article className="spread">
                <div className="spread-copy">
                  <h3>{dict.s3Title}</h3>
                  <p>{dict.s3Desc}</p>
                  <ul className="spec-list">
                    {[dict.s3Li1, dict.s3Li2, dict.s3Li3].map((item) => (
                      <li key={item}>
                        <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="spread-visual visual-bulk">
                  <img
                    className="ui-shot ui-shot-toolbar"
                    src={assetPath('/screenshots/foldy-toolbar.png')}
                    alt="Barra contextual horizontal de Foldy con 9 seleccionados, mover a carpeta, candado, ocultar, exportar Markdown y borrar"
                    width={561}
                    height={74}
                    loading="lazy"
                    decoding="async"
                    tabIndex={0}
                    onClick={() =>
                      openLightbox(
                        assetPath('/screenshots/foldy-toolbar.png'),
                        'Barra contextual horizontal de Foldy'
                      )
                    }
                  />
                  <div className="demo-sidebar-card" aria-label="Vista limpia de selección múltiple en barra lateral">
                    {[
                      { title: 'Arquitectura API REST v3', dot: 'dot-gemini' },
                      { title: 'Migración PostgreSQL a Edge', dot: 'dot-gemini' },
                      { title: 'Plan Lanzamiento Producto Q4', dot: 'dot-amber' },
                      { title: 'Auditoría Core Web Vitals', dot: 'dot-chatgpt' }
                    ].map((row) => (
                      <div className="ws-chat-row is-selected" key={row.title}>
                        <span className="ws-check">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="ws-chat-title">{row.title}</span>
                        <span className={`ws-folder-dot ${row.dot}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Spread 4 */}
              <article className="spread is-reversed">
                <div className="spread-copy">
                  <h3>{dict.s4Title}</h3>
                  <p>{dict.s4Desc}</p>
                  <ul className="spec-list">
                    {[dict.s4Li1, dict.s4Li2, dict.s4Li3].map((item) => (
                      <li key={item}>
                        <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="spread-visual visual-popup-pair">
                  <img
                    className="ui-shot"
                    src={assetPath('/screenshots/foldy-popup-platforms.png')}
                    alt="Popup de Foldy v4.2.5 mostrando Cloud Sync 2.7/8.0 KB y las 5 plataformas IA soportadas"
                    width={354}
                    height={601}
                    loading="lazy"
                    decoding="async"
                    tabIndex={0}
                    onClick={() =>
                      openLightbox(
                        assetPath('/screenshots/foldy-popup-platforms.png'),
                        'Popup de Foldy v4.2.5 — Plataformas y Cloud Sync'
                      )
                    }
                  />
                  <img
                    className="ui-shot"
                    src={assetPath('/screenshots/foldy-popup-themes.png')}
                    alt="Popup de Foldy v4.2.5 mostrando el selector de 10 estilos visuales, barra compacta y código foldy1:"
                    width={354}
                    height={602}
                    loading="lazy"
                    decoding="async"
                    tabIndex={0}
                    onClick={() =>
                      openLightbox(
                        assetPath('/screenshots/foldy-popup-themes.png'),
                        'Popup de Foldy v4.2.5 — 10 Estilos Visuales y Sync Code'
                      )
                    }
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 10 Visual Themes Explorer */}
        <section className="section" id="themes">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">{dict.themesTitle}</h2>
              <p className="section-desc">{dict.themesDesc}</p>
            </header>

            <div className="themes-layout">
              <div className="theme-grid" role="radiogroup" aria-label="10 estilos visuales de Foldy">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    className="theme-option"
                    role="radio"
                    aria-checked={theme.id === activeThemeId}
                    onClick={() => setActiveThemeId(theme.id)}
                  >
                    <span className="theme-swatch" style={{ background: theme.swatchBg }}>
                      <span className="theme-swatch-bar" style={{ background: theme.swatchBar }} />
                      <span className="theme-swatch-dot" style={{ background: theme.swatchDot }} />
                    </span>
                    <span className="theme-meta">
                      <span className="theme-name">{lang === 'es' ? theme.nameEs : theme.nameEn}</span>
                      <span className="theme-desc">{lang === 'es' ? theme.descEs : theme.descEn}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div
                className="theme-preview-stage"
                style={activeTheme.vars as CSSProperties}
                aria-label="Vista previa interactiva del estilo seleccionado"
              >
                <div className="tp-head">
                  <span className="tp-brand">
                    <img src={assetPath('/foldy-icon.svg')} alt="" width={22} height={22} />
                    Foldy
                  </span>
                  <span className="tp-btn">{dict.tpNew}</span>
                </div>

                <div className="tp-search">{dict.tpSearch}</div>

                <div className="tp-pills">
                  <span className="tp-pill is-on">{dict.tpAll}</span>
                  <span className="tp-pill"><span className="platform-dot dot-gemini" aria-hidden="true" />{dict.tpDev}</span>
                  <span className="tp-pill"><span className="platform-dot dot-chatgpt" aria-hidden="true" />{dict.tpStudy}</span>
                  <span className="tp-pill"><span className="platform-dot dot-amber" aria-hidden="true" />{dict.tpIdeas}</span>
                </div>

                <div className="tp-footer">
                  <span className="tp-action">{dict.tpLoad}</span>
                  <span className="tp-action is-primary">{dict.tpPrompts}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Hub */}
        <section className="section" id="install">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">{dict.installTitle}</h2>
              <p className="section-desc">{dict.installDesc}</p>
            </header>

            <div className="install-grid">
              <article className="install-panel">
                <div>
                  <div className="install-panel-head">
                    <h3>{dict.extTitle}</h3>
                    <span className="version-pill">{dict.extBadge}</span>
                  </div>
                  <p>{dict.extDesc}</p>
                </div>

                <ol className="install-steps">
                  <li>{dict.extStep1}</li>
                  <li>{dict.extStep2}</li>
                  <li>{dict.extStep3}</li>
                </ol>

                <div className="install-actions">
                  <a
                    className="btn btn-primary btn-sm"
                    href="https://github.com/dsaez27/Foldy/releases/download/v4.2.5/Foldy-v4.2.5-chromium.zip"
                  >
                    {dict.extBtnZip}
                  </a>
                  <a
                    className="btn btn-secondary btn-sm"
                    href="https://github.com/dsaez27/Foldy/releases/tag/v4.2.5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dict.extBtnReleases}
                  </a>
                </div>
              </article>

              <article className="install-panel">
                <div>
                  <div className="install-panel-head">
                    <h3>{dict.cliTitle}</h3>
                    <span className="version-pill">{dict.cliBadge}</span>
                  </div>
                  <p>{dict.cliDesc}</p>
                </div>

                <div className="cmd-bar">
                  <code>{CLI_CMD}</code>
                  <button className="copy-btn" type="button" onClick={handleCopyCli}>
                    <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copiedCmd ? dict.copied : dict.copy}</span>
                  </button>
                </div>

                <div className="install-actions">
                  <a
                    className="btn btn-secondary btn-sm"
                    href="https://github.com/dsaez27/Foldy-agy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dict.cliBtnRepo}
                  </a>
                  <a
                    className="btn btn-secondary btn-sm"
                    href="https://raw.githubusercontent.com/dsaez27/Foldy-agy/main/.antigravity-plugin/marketplace.json"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dict.cliBtnMarket}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Sync Banner */}
        <section className="section" id="sync">
          <div className="container">
            <div className="sync-panel">
              <div>
                <h2>{dict.syncTitle}</h2>
                <p>{dict.syncDesc}</p>
              </div>
              <div className="sync-code-card">
                <div className="sync-flow">
                  <span>{dict.syncFlow1}</span>
                  <span aria-hidden="true">→</span>
                  <span className="mono">{dict.syncFlow2}</span>
                  <span aria-hidden="true">→</span>
                  <span>{dict.syncFlow3}</span>
                </div>
                <div className="sync-token">
                  /foldy sync <span className="sync-token-prefix">foldy1:</span>{syncCode.replace(/^foldy1:/, '')}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleGenerateSyncCode}
                >
                  {syncCopied
                    ? (lang === 'es' ? 'Código foldy1: generado y copiado' : 'foldy1: code generated & copied')
                    : (lang === 'es' ? 'Generar código real foldy1: (gzip)' : 'Generate live foldy1: code (gzip)')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>{dict.footerCopy}</span>
          <nav className="footer-links" aria-label="Enlaces del proyecto">
            <a href="https://github.com/dsaez27/Foldy" target="_blank" rel="noopener noreferrer">{dict.footerWeb}</a>
            <a href="https://github.com/dsaez27/Foldy-agy" target="_blank" rel="noopener noreferrer">{dict.footerCli}</a>
            <a href="https://github.com/dsaez27/Foldy/releases" target="_blank" rel="noopener noreferrer">{dict.footerReleases}</a>
            <a href="https://github.com/dsaez27/Foldy/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">{dict.footerChangelog}</a>
          </nav>
        </div>
      </footer>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-labelledby="lightboxTitle"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeLightbox();
        }}
        {...({ closedby: 'any' } as Record<string, string>)}
      >
        <div className="lightbox-head">
          <span className="lightbox-title" id="lightboxTitle">
            {lightboxState?.alt || 'Foldy v4.2.5'}
          </span>
          <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Cerrar">
            <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="lightbox-body">
          <img
            src={lightboxState?.src || assetPath('/screenshots/foldy-popup-platforms.png')}
            alt={lightboxState?.alt || 'Foldy v4.2.5'}
          />
        </div>
      </dialog>
    </>
  );
}
