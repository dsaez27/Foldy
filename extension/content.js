/* Generated with esbuild from src/ (do not edit manually; run "npm run build") | Generado con esbuild desde src/ (no editar a mano; ejecutar "npm run build"). */
(() => {
  // src/icons.js
  var SVG_NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs = {}, children = []) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      node.setAttribute(k, String(v));
    }
    for (const child of children) {
      node.appendChild(child);
    }
    return node;
  }
  function strokeSvg(size, strokeWidth, children, strokeColor = "currentColor") {
    return el(
      "svg",
      {
        class: "gcm-svg-icon",
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        fill: "none",
        stroke: strokeColor,
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      children
    );
  }
  var logoGradSeq = 0;
  var ICONS = {
    foldyLogo: () => {
      const gradId = `gcmLogoGrad_${++logoGradSeq}`;
      return el(
        "svg",
        {
          class: "gcm-svg-logo",
          viewBox: "0 0 1024 1024",
          width: 18,
          height: 18,
          fill: "none"
        },
        [
          el("defs", {}, [
            el("linearGradient", { id: gradId, x1: "0%", y1: "0%", x2: "100%", y2: "100%" }, [
              el("stop", { offset: "0%", style: "stop-color: var(--gcm-logo-stop-1, #5B6EF7)" }),
              el("stop", { offset: "100%", style: "stop-color: var(--gcm-logo-stop-2, #1DA1F2)" })
            ])
          ]),
          el("path", {
            d: "M280 120 L590 120 L844 374 L844 630 A170 170 0 0 1 674 800 L455 800 L295 940 L295 800 L280 800 A170 170 0 0 1 110 630 L110 290 A170 170 0 0 1 280 120 Z",
            fill: `url(#${gradId})`
          }),
          el("path", {
            d: "M590 120 L844 374 L690 374 A100 100 0 0 1 590 274 Z",
            fill: "var(--gcm-logo-flap, #132238)"
          }),
          el("rect", { x: 275, y: 405, width: 315, height: 62, rx: 31, fill: "#FFFFFF" }),
          el("rect", { x: 275, y: 535, width: 415, height: 62, rx: 31, fill: "rgba(255,255,255,0.75)" })
        ]
      );
    },
    folderPlus: () => strokeSvg(14, 2, [
      el("path", { d: "M12 10v6" }),
      el("path", { d: "M9 13h6" }),
      el("path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      })
    ]),
    folder: () => strokeSvg(14, 2, [
      el("path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      })
    ]),
    folderMinus: () => strokeSvg(14, 2, [
      el("path", { d: "M9 13h6" }),
      el("path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      })
    ]),
    search: () => strokeSvg(13.5, 2.2, [
      el("circle", { cx: 11, cy: 11, r: 8 }),
      el("path", { d: "m21 21-4.3-4.3" })
    ]),
    sort: () => strokeSvg(13.5, 2, [
      el("path", { d: "m3 16 4 4 4-4" }),
      el("path", { d: "M7 20V4" }),
      el("path", { d: "m21 8-4-4-4 4" }),
      el("path", { d: "M17 4v16" })
    ]),
    lock: () => strokeSvg(13.5, 2.1, [
      el("rect", { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
      el("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ]),
    lockSmall: () => strokeSvg(
      11,
      2.4,
      [
        el("rect", { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
        el("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
      ],
      "#fbbc04"
    ),
    download: () => strokeSvg(13.5, 2, [
      el("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
      el("polyline", { points: "7 10 12 15 17 10" }),
      el("line", { x1: 12, x2: 12, y1: 15, y2: 3 })
    ]),
    upload: () => strokeSvg(13.5, 2, [
      el("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
      el("polyline", { points: "17 8 12 3 7 8" }),
      el("line", { x1: 12, x2: 12, y1: 3, y2: 15 })
    ]),
    fileText: () => strokeSvg(13.5, 2, [
      el("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      el("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }),
      el("path", { d: "M10 9H8" }),
      el("path", { d: "M16 13H8" }),
      el("path", { d: "M16 17H8" })
    ]),
    trash: () => strokeSvg(13.5, 2, [
      el("path", { d: "M3 6h18" }),
      el("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
      el("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
      el("line", { x1: 10, x2: 10, y1: 11, y2: 17 }),
      el("line", { x1: 14, x2: 14, y1: 11, y2: 17 })
    ]),
    stop: () => strokeSvg(13.5, 2.2, [
      el("rect", { width: 14, height: 14, x: 5, y: 5, rx: 2 })
    ]),
    zap: () => strokeSvg(13.5, 2, [
      el("path", {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      })
    ]),
    chevronsDown: () => strokeSvg(13.5, 2, [
      el("path", { d: "m7 6 5 5 5-5" }),
      el("path", { d: "m7 13 5 5 5-5" })
    ]),
    chevronRight: () => strokeSvg(15, 2.3, [
      el("path", { d: "m9 18 6-6-6-6" })
    ]),
    menu: () => strokeSvg(15, 2.2, [
      el("line", { x1: 4, x2: 20, y1: 12, y2: 12 }),
      el("line", { x1: 4, x2: 20, y1: 6, y2: 6 }),
      el("line", { x1: 4, x2: 20, y1: 18, y2: 18 })
    ]),
    minus: () => strokeSvg(13, 2.4, [
      el("path", { d: "M5 12h14" })
    ]),
    close: () => strokeSvg(12, 2.4, [
      el("path", { d: "M18 6 6 18" }),
      el("path", { d: "m6 6 12 12" })
    ]),
    plus: () => strokeSvg(13.5, 2.3, [
      el("path", { d: "M5 12h14" }),
      el("path", { d: "M12 5v14" })
    ]),
    layoutVertical: () => strokeSvg(13.5, 2.1, [
      el("rect", { width: 10, height: 18, x: 7, y: 3, rx: 2 }),
      el("path", { d: "M10 7h4" }),
      el("path", { d: "M10 12h4" }),
      el("path", { d: "M10 17h4" })
    ]),
    layoutHorizontal: () => strokeSvg(13.5, 2.1, [
      el("rect", { width: 18, height: 10, x: 3, y: 7, rx: 2 }),
      el("path", { d: "M7 10v4" }),
      el("path", { d: "M12 10v4" }),
      el("path", { d: "M17 10v4" })
    ]),
    editPencil: () => strokeSvg(11.5, 2.1, [
      el("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" })
    ]),
    sparkle: () => strokeSvg(10.5, 2.2, [
      el("path", { d: "M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m0-12.8 2.1 2.1m8.6 8.6 2.1 2.1" })
    ]),
    copy: () => strokeSvg(12.5, 2, [
      el("rect", { width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2 }),
      el("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
    ]),
    emptyFolderSearch: () => el(
      "svg",
      {
        class: "gcm-empty-svg",
        viewBox: "0 0 64 52",
        width: 56,
        height: 44,
        fill: "none"
      },
      [
        el("path", {
          d: "M8 14a4 4 0 0 1 4-4h14l4 4h22a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V14Z",
          fill: "rgba(var(--gcm-accent-rgb), 0.12)",
          stroke: "rgba(var(--gcm-accent-rgb), 0.45)",
          "stroke-width": "1.75"
        }),
        el("line", {
          x1: 16,
          y1: 24,
          x2: 32,
          y2: 24,
          stroke: "rgba(var(--gcm-accent-rgb), 0.4)",
          "stroke-width": "2",
          "stroke-linecap": "round"
        }),
        el("line", {
          x1: 16,
          y1: 30,
          x2: 26,
          y2: 30,
          stroke: "rgba(var(--gcm-accent-rgb), 0.28)",
          "stroke-width": "2",
          "stroke-linecap": "round"
        }),
        el("circle", {
          cx: 43,
          cy: 31,
          r: 8,
          fill: "var(--gcm-bg-input)",
          stroke: "rgb(var(--gcm-accent-rgb))",
          "stroke-width": "2"
        }),
        el("path", {
          d: "m49 37 5 5",
          stroke: "rgb(var(--gcm-accent-rgb))",
          "stroke-width": "2.2",
          "stroke-linecap": "round"
        })
      ]
    )
  };
  function createIconElement(iconBuilder) {
    if (typeof iconBuilder === "function") {
      return iconBuilder();
    }
    return el("svg", { class: "gcm-svg-icon", width: 12, height: 12 });
  }
  function setButtonIconText(container, iconBuilder, text) {
    if (!container) return;
    container.textContent = "";
    if (iconBuilder) {
      container.appendChild(createIconElement(iconBuilder));
    }
    if (text) {
      const span = document.createElement("span");
      span.textContent = text;
      container.appendChild(span);
    }
  }

  // src/platform.js
  var APP_VERSION = typeof chrome !== "undefined" && chrome.runtime?.getManifest?.().version || "0.0.0";
  function detectPlatform() {
    const host = location.hostname;
    if (host.endsWith("chatgpt.com") || host.endsWith("chat.openai.com")) {
      return "chatgpt";
    }
    if (host.endsWith("gemini.google.com")) {
      return "gemini";
    }
    if (host.endsWith("claude.ai")) {
      return "claude";
    }
    if (host.endsWith("deepseek.com")) {
      return "deepseek";
    }
    if (host.endsWith("opencode.ai")) {
      return "opencode";
    }
    return null;
  }
  var PLATFORM_KEY = detectPlatform();
  var CONV_LINK_SELECTOR = 'a[href*="/app/"], a[href*="/c/"], a[href*="/codex/tasks/"], a[href*="/codex/"], a[href*="/tasks/"], a[href*="/chat/"], a[href*="/session/"], [data-gcm-task="1"]';
  var PLATFORMS = {
    gemini: {
      name: "Gemini",
      storageKey: "gcm_folders_data_v2",
      legacyStorageKey: "gcm_folders_data_v1",
      convHrefRegex: /^\/(?:u\/[^/]+\/)?app\/([0-9a-zA-Z_-]{5,})/,
      buildUrl: (id) => `https://gemini.google.com/app/${id}`,
      selectors: {
        sidebar: "conversations-list, .chat-history, div.conversations-container, mat-sidenav, side-navigation-v2, nav",
        conversationLinks: '[data-test-id="conversation"] a[href*="/app/"], a[href*="/app/"], div[data-test-id="conversation"]',
        rowClosest: ['[data-test-id="conversation"]', "gem-nav-list-item", "li"],
        optionsTrigger: 'button:has(mat-icon[fonticon="more_vert"]), button[data-test-id="actions-menu-button"], button[aria-haspopup="menu"], button[aria-label*="options"], button[aria-label*="opciones"], button[aria-label*="Opciones"]',
        menuPanel: '[role="menu"], .mat-mdc-menu-panel',
        deleteMenuItem: 'button[data-test-id="delete-button"], [role="menuitem"]:has(mat-icon[fonticon="delete"]), [role="menuitem"]:has(mat-icon[data-mat-icon-name="delete"]), [role="menuitem"]',
        confirmDialog: '[role="dialog"], mat-dialog-container, .mat-mdc-dialog-surface',
        confirmButton: 'gem-button[cdkfocusinitial] button, [cdkfocusinitial] button, button[cdkfocusinitial], button[data-test-id="confirm-button"]',
        activeMessages: "user-query, model-response, .query-text, .model-response-text, message-content",
        promptInput: 'rich-textarea div[contenteditable="true"], div.ql-editor[contenteditable="true"], div[contenteditable="true"], textarea'
      }
    },
    chatgpt: {
      name: "ChatGPT",
      storageKey: "gcm_chatgpt_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/(?:c|codex\/tasks|codex\/cloud|codex|tasks)\/(?!settings|overview|scheduled|onboarding|new\b)(task_[0-9a-zA-Z_-]{4,}|[0-9a-fA-F]{8}-[0-9a-fA-F-]{27}|[0-9a-zA-Z_-]{8,})/,
      buildUrl: (id) => id.startsWith("task_") ? `https://chatgpt.com/codex/tasks/${id}` : `https://chatgpt.com/c/${id}`,
      selectors: {
        sidebar: '[data-testid="stage-thread-flyout"], nav[aria-label], nav, aside, .bg-token-sidebar-surface-primary',
        conversationLinks: '[data-sidebar-chatgpt-conversation-key] a[href*="/c/"], [data-testid^="history-item"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], a[href*="/c/"], a[href*="/codex/tasks/"], a[href*="/codex/"], a[href*="/tasks/"], [data-gcm-task="1"]',
        rowClosest: [
          "[data-sidebar-chatgpt-conversation-key]",
          'li[data-testid^="history-item"]',
          'div[data-testid^="history-item"]',
          "li",
          "div.group",
          "a.__menu-item",
          'a[href*="/codex/tasks/"]',
          'a[href*="/codex/"]',
          'a[href*="/tasks/"]'
        ],
        optionsTrigger: 'button[data-testid^="history-item-"][data-testid$="-options"], button[data-testid*="options"], button[aria-haspopup="menu"], button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem: '[role="menuitem"][data-testid="delete-chat-menu-item"], [role="menuitem"][data-testid*="delete"], [role="menuitem"].text-danger, [role="menuitem"][class*="text-token-text-error"], [role="menuitem"][class*="text-red"], [role="menuitem"]',
        confirmDialog: '[role="dialog"], [data-testid="modal-delete-conversation-confirmation"]',
        confirmButton: 'button[data-testid="delete-conversation-confirm-button"], button.btn-danger, button[class*="btn-danger"], button[class*="bg-red"], button[class*="bg-token-bg-danger"], button[type="submit"]',
        activeMessages: '[data-message-author-role="user"], [data-message-author-role="assistant"]',
        promptInput: '#prompt-textarea, div[contenteditable="true"]#prompt-textarea, textarea[data-id], textarea, div[contenteditable="true"]'
      }
    },
    claude: {
      name: "Claude",
      storageKey: "gcm_claude_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/chat\/([0-9a-zA-Z_-]{4,})/,
      buildUrl: (id) => `https://claude.ai/chat/${id}`,
      selectors: {
        sidebar: 'nav[aria-label], nav, aside, [data-testid*="sidebar"]',
        conversationLinks: 'nav a[href*="/chat/"], aside a[href*="/chat/"], a[href*="/chat/"]',
        rowClosest: ["li", '[data-testid*="chat-item"]', "div.group", 'a[href*="/chat/"]'],
        optionsTrigger: 'button[aria-haspopup="menu"], button[data-testid*="menu"], button[data-testid*="options"], button[aria-label*="More"], button[aria-label*="Más"], button[aria-label*="Options"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem: '[role="menuitem"][class*="danger"], [role="menuitem"][class*="red"], [role="menuitem"][class*="error"], [role="menuitem"]',
        confirmDialog: '[role="dialog"], [role="alertdialog"]',
        confirmButton: 'button[data-testid*="delete"], button[class*="danger"], button[class*="red"], button[type="submit"]',
        activeMessages: '[data-testid*="user-message"], .font-claude-message, [data-is-streaming], [data-message-author-role]',
        promptInput: 'div.ProseMirror[contenteditable="true"], fieldset div[contenteditable="true"], div[contenteditable="true"], textarea'
      }
    },
    deepseek: {
      name: "DeepSeek",
      storageKey: "gcm_deepseek_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/(?:a\/chat\/s|chat)\/([0-9a-zA-Z_-]{4,})/,
      buildUrl: (id) => `https://chat.deepseek.com/a/chat/s/${id}`,
      selectors: {
        sidebar: 'nav, aside, [class*="sidebar"], .ds-scroll-area',
        conversationLinks: 'a[href*="/chat/"], [data-chat-id] a',
        rowClosest: ["li", "[data-chat-id]", 'div[class*="chat-item"]', 'a[href*="/chat/"]'],
        optionsTrigger: 'button[aria-haspopup="menu"], [role="button"][aria-haspopup="menu"], button[aria-label*="More"], button[aria-label*="options"], button[aria-label*="Opciones"]',
        menuPanel: '[role="menu"], .ds-dropdown-menu',
        deleteMenuItem: '[role="menuitem"], .ds-dropdown-menu-item',
        confirmDialog: '[role="dialog"], .ds-modal-content',
        confirmButton: 'button.ds-button--error, button[class*="danger"], button[class*="error"], button[type="submit"]',
        activeMessages: '.ds-markdown, [class*="message-content"], [data-message-author-role]',
        promptInput: 'textarea#chat-input, textarea, div[contenteditable="true"]'
      }
    },
    opencode: {
      name: "OpenCode",
      storageKey: "gcm_opencode_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/(?:chat|session|c)\/([0-9a-zA-Z_-]{4,})/,
      buildUrl: (id) => `https://opencode.ai/chat/${id}`,
      selectors: {
        sidebar: 'nav, aside, [data-sidebar], [class*="sidebar"]',
        conversationLinks: 'a[href*="/chat/"], a[href*="/session/"], a[href*="/c/"]',
        rowClosest: ["li", "[data-session-id]", "div.group", 'a[href*="/chat/"]', 'a[href*="/session/"]'],
        optionsTrigger: 'button[aria-haspopup="menu"], button[aria-label*="options"], button[aria-label*="More"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem: '[role="menuitem"]',
        confirmDialog: '[role="dialog"], [role="alertdialog"]',
        confirmButton: 'button[class*="danger"], button[class*="red"], button[type="submit"]',
        activeMessages: '[data-message-author-role], .message-content, [class*="message"]',
        promptInput: 'textarea, div[contenteditable="true"]'
      }
    }
  };
  var P = PLATFORMS[PLATFORM_KEY] || PLATFORMS.gemini;
  var SELECTORS = P.selectors;
  var PRESET_COLORS = ["#4285f4", "#34a853", "#fbbc04", "#ea4335", "#a142f4", "#24c1e0", "#ff6d00"];
  var THEME_PRESETS = ["adaptive", "neo-brutal", "terminal", "minimal-flat", "neon-synth"];
  var THEME_STORAGE_KEY = "gcm_ui_theme_preset";
  function normalizeThemePreset(val) {
    if (typeof val === "string") {
      const normalized = val.trim().toLowerCase();
      if (THEME_PRESETS.includes(normalized)) {
        return normalized;
      }
    }
    return "adaptive";
  }
  function applyThemePreset(preset, { persist = true } = {}) {
    const normalized = normalizeThemePreset(preset);
    try {
      document.documentElement?.setAttribute("data-gcm-style", normalized);
    } catch (_) {
    }
    if (persist) {
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(THEME_STORAGE_KEY, normalized);
        }
      } catch (_) {
      }
      try {
        if (typeof chrome !== "undefined" && chrome.storage?.local?.set) {
          const res = chrome.storage.local.set({ [THEME_STORAGE_KEY]: normalized });
          if (res && typeof res.catch === "function") {
            res.catch(() => {
            });
          }
        }
      } catch (_) {
      }
      try {
        if (typeof chrome !== "undefined" && chrome.storage?.sync?.set) {
          const res = chrome.storage.sync.set({ [THEME_STORAGE_KEY]: normalized }, () => {
            void chrome.runtime?.lastError;
          });
          if (res && typeof res.catch === "function") {
            res.catch(() => {
            });
          }
        }
      } catch (_) {
      }
    }
    return normalized;
  }
  function parseRgbLuminance(colorStr) {
    if (!colorStr || typeof colorStr !== "string") return null;
    const m = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
    if (!m) return null;
    if (m[4] !== void 0 && parseFloat(m[4]) === 0) return null;
    const r = Number(m[1]);
    const g = Number(m[2]);
    const b = Number(m[3]);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  function detectHostTheme() {
    try {
      const html = document.documentElement;
      const body = document.body;
      const nodes = [html, body].filter(Boolean);
      for (const el2 of nodes) {
        for (const attr of ["data-theme", "data-color-scheme", "data-mode"]) {
          const val = (el2.getAttribute?.(attr) || "").toLowerCase();
          if (val.includes("light")) return "light";
          if (val.includes("dark")) return "dark";
        }
        const cls = el2.classList;
        if (cls) {
          if (cls.contains("light") || cls.contains("light-theme")) return "light";
          if (cls.contains("dark") || cls.contains("dark-theme")) return "dark";
        }
      }
      if (typeof getComputedStyle === "function") {
        if (html) {
          const cs = (getComputedStyle(html).colorScheme || "").toLowerCase();
          if (cs === "light") return "light";
          if (cs === "dark") return "dark";
        }
        for (const el2 of [body, html].filter(Boolean)) {
          const lum = parseRgbLuminance(getComputedStyle(el2).backgroundColor);
          if (lum !== null) {
            return lum > 0.55 ? "light" : "dark";
          }
        }
      }
      if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          return "light";
        }
      }
    } catch (_) {
    }
    return "dark";
  }
  function syncHostTheme() {
    const theme = detectHostTheme();
    try {
      const root = document.documentElement;
      if (root) {
        root.setAttribute("data-gcm-theme", theme);
        if (PLATFORM_KEY) {
          root.setAttribute("data-gcm-platform", PLATFORM_KEY);
        }
        if (!root.getAttribute("data-gcm-style")) {
          let saved = null;
          try {
            if (typeof localStorage !== "undefined") {
              saved = localStorage.getItem(THEME_STORAGE_KEY);
            }
          } catch (_) {
          }
          root.setAttribute("data-gcm-style", normalizeThemePreset(saved));
        }
      }
    } catch (_) {
    }
    return theme;
  }

  // src/i18n.js
  var I18N = {
    es: {
      panelTitle: "Foldy",
      toggleMinTitle: "Clic para minimizar/expandir",
      toolbarCollapseTitle: "Contraer barra superior (Arrastra para mover)",
      toolbarExpandTitle: "Expandir barra superior (Arrastra para mover)",
      toolbarVerticalTitle: "Cambiar a barra vertical (Arrastra para mover)",
      toolbarHorizontalTitle: "Cambiar a barra horizontal (Arrastra para mover)",
      langBtnTitle: "Switch language (Español / English)",
      newFolderBtn: "Nueva",
      newFolderTitle: "Crear nueva carpeta con palabras clave automáticas",
      searchPlaceholder: "Buscar conversación...",
      sortTitle: "Cambiar orden: Cronológico / A→Z / Z→A",
      sortRecent: "Recientes",
      sortAZ: "A → Z",
      sortZA: "Z → A",
      pillAll: "Todas",
      pillProtected: "Protegidas",
      pillUnassigned: "Sin carpeta",
      autoRulesPrefix: "Auto-reglas",
      editFolderTitle: (name) => `Editar carpeta "${name}"`,
      delFolderTitle: (name) => `Eliminar carpeta "${name}" (no borra las conversaciones)`,
      emptyStateText: "Sin conversaciones en esta vista",
      emptyStateResetBtn: "Ver todas las conversaciones",
      loadAllBtn: "Cargar",
      stopLoadBtn: "Detener",
      loadAllTitle: "Bajar automáticamente por la barra lateral para cargar todo tu historial",
      backupBtn: "Respaldar",
      backupTitle: "Guardar tus carpetas y configuración en un archivo JSON",
      importBtn: "Importar",
      importTitle: "Restaurar carpetas desde un archivo JSON",
      selectAll: "Todo",
      selectAllTitle: "Seleccionar o deseleccionar todas las conversaciones visibles",
      folderBtn: (n) => `Carpeta (${n})`,
      folderBtnTitle: "Asignar conversaciones seleccionadas a una carpeta",
      protectBtn: "Proteger",
      protectBtnTitle: "Proteger o desproteger conversaciones seleccionadas contra borrado accidental",
      exportBtn: "Exportar .md",
      exportBtnTitle: "Exportar conversaciones seleccionadas y el chat activo a Markdown (.md)",
      deleteBtn: (n) => `Borrar (${n})`,
      stopBtn: "Detener",
      checkboxTitle: "Seleccionar conversación (Shift + Clic para rango)",
      lockIconTitle: "Protegida contra borrado (Clic para quitar protección)",
      removeFromFolder: "Quitar de carpeta",
      createNewFolderMenu: "Nueva carpeta...",
      modalNewFolderTitle: "Nueva Carpeta Inteligente",
      modalEditFolderTitle: "Editar Carpeta Inteligente",
      modalNewFolderDesc: "Elige un nombre, un color y palabras clave opcionales para auto-clasificar tus chats:",
      modalFolderNamePlaceholder: "Nombre de carpeta (Ej. Trabajo, Finanzas, Inglés...)",
      modalKeywordsPlaceholder: "Palabras clave separadas por coma (Ej. excel, factura, banco)",
      cancel: "Cancelar",
      createFolderConfirm: "Crear Carpeta",
      saveFolderConfirm: "Guardar Cambios",
      confirmDeleteTitle: (n) => `¿Eliminar ${n} conversación${n > 1 ? "es" : ""}?`,
      confirmDeleteDesc: (n, skipped) => `Se borrarán permanentemente ${n} conversación${n > 1 ? "es" : ""} de tu historial de ${P.name}.` + (skipped > 0 ? `
(🔒 Se omitirán ${skipped} conversación(es) protegida(s) con candado).` : ""),
      confirmDeleteBtn: (n) => `Sí, eliminar (${n})`,
      toastLoadingHistory: '⏬ Cargando historial antiguo... (Clic en "Detener carga" para parar)',
      toastLoadedCount: (n) => `⏬ Conversaciones cargadas: ${n}...`,
      toastLoadComplete: (n) => `✅ Historial completo cargado (${n} conversaciones).`,
      toastBackupSaved: "💾 Respaldo descargado correctamente.",
      toastBackupRestored: "📂 Carpetas y configuración restauradas.",
      toastBackupInvalid: "❌ Archivo JSON inválido.",
      toastMdExported: "📥 Archivo Markdown (.md) descargado.",
      toastMdEmpty: "⚠️ No hay conversaciones seleccionadas ni mensajes activos para exportar.",
      toastUnprotected: (n) => `🔓 Se quitó la protección de ${n} conversación(es).`,
      toastProtected: (n) => `🔒 ${n} conversación(es) protegida(s) contra borrado accidental.`,
      toastMovedToFolder: (n) => `📁 ${n} conversación(es) movida(s) a la carpeta.`,
      toastRemovedFromFolder: (n) => `Se quitó la carpeta de ${n} conversación(es).`,
      toastAllProtected: "🔒 Todas las conversaciones seleccionadas están protegidas con candado.",
      toastDeletingProgress: (curr, total) => `Eliminando conversación ${curr} de ${total}...`,
      toastDeleteFinishedErr: (del, err) => `Finalizado: ${del} eliminadas, ${err} con error.`,
      toastDeleteSuccess: (del) => `¡Listo! Se eliminaron ${del} conversación${del === 1 ? "" : "es"}.`,
      toastStopping: "Deteniendo después de la conversación actual...",
      mdHeader: `Exportación de Conversaciones de ${P.name}`,
      mdDate: "Fecha",
      mdSelectedIndex: (n) => `Índice de Conversaciones Seleccionadas (${n})`,
      mdFolderLabel: "Carpeta",
      mdActiveChatHeader: "Contenido de la Conversación Activa en Pantalla",
      mdUser: "🧑 Usuario",
      promptsBtn: "Prompts",
      promptsBtnTitle: "Abrir tu bóveda de Prompts rápidos reutilizables",
      modalPromptsTitle: "Bóveda de Prompts Rápidos",
      modalPromptsDesc: "Haz clic en un prompt para insertarlo directamente en el chat activo, o crea uno nuevo:",
      promptTitlePlaceholder: "Título corto (Ej. Revisor Senior de Código)",
      promptBodyPlaceholder: "Escribe las instrucciones completas del prompt...",
      addPromptBtn: "Guardar Prompt",
      updatePromptBtn: "Actualizar Prompt",
      insertPromptBtn: "Insertar",
      deletePromptTitle: "Eliminar prompt",
      copyPromptTitle: "Copiar al portapapeles",
      editPromptTitle: "Editar prompt",
      cmdSearchPlaceholder: "Buscar prompt por título o instrucción...",
      cmdNewBtn: "Nuevo",
      promptCategoryPlaceholder: "Categoría opcional (Ej. Código, Redacción, SQL)",
      promptsNoResults: (q) => `Sin resultados para "${q}"`,
      cmdFooterHint: "↵ Insertar · 📋 Copiar · ✎ Editar · Esc Cerrar",
      promptsEmpty: "Aún no tienes prompts guardados. Crea uno abajo para reutilizarlo en 1 clic.",
      searchClearTitle: "Limpiar búsqueda",
      toastPromptInserted: "⚡ Prompt insertado en el chat.",
      toastPromptCopied: "📋 Prompt copiado al portapapeles.",
      varModalTitle: "Completar Variables del Prompt",
      varModalDesc: (title) => `Ingresa los valores para "${title}":`,
      varInputPlaceholder: (name) => `Valor para ${name}...`,
      varInsertBtn: "Insertar Prompt",
      undoBtn: "Deshacer",
      toastAssignmentUndone: "↩️ Asignación revertida.",
      themeStyleLabel: "Estilo visual",
      themeAdaptive: "Adaptativo",
      themeNeoBrutal: "Neo-Brutal",
      themeTerminal: "Terminal",
      themeMinimalFlat: "Minimal Plano",
      themeNeonSynth: "Neon Synth",
      syncCodeTitle: "Sincronización entre navegadores",
      copySyncCodeBtn: "Copiar código",
      pasteSyncCodeBtn: "Aplicar código",
      syncCodePlaceholder: "Pega un código foldy1:...",
      syncCodeCopied: "Código de sincronización copiado.",
      syncCodeApplied: "Configuración sincronizada correctamente.",
      syncCodeInvalid: "Código de sincronización inválido.",
      gistTitle: "GitHub Gist Sync (Opcional)",
      gistTokenPlaceholder: "Token de GitHub (scope: gist)",
      gistIdPlaceholder: "Gist ID (auto)",
      gistSyncBtn: "Sincronizar",
      gistClearBtn: "Limpiar",
      gistSynced: "Gist sincronizado correctamente.",
      gistError: "Error al sincronizar con GitHub Gist.",
      defaultPrompts: [
        {
          id: "p_code",
          title: "💻 Revisor de Código Senior",
          content: "Actúa como un Ingeniero de Software Senior. Revisa el siguiente código buscando errores potenciales, problemas de rendimiento y vulnerabilidades, y propón una versión optimizada y limpia:\n\n"
        },
        {
          id: "p_summary",
          title: "📝 Resumen Ejecutivo",
          content: "Resume el siguiente texto en 5 puntos clave accionables, destacando las conclusiones más importantes con claridad y concisión:\n\n"
        },
        {
          id: "p_translate",
          title: "🌐 Traductor Técnico Natural",
          content: "Traduce el siguiente texto al inglés/español manteniendo un tono profesional, natural y conservando intacta la terminología técnica:\n\n"
        }
      ],
      defaultFolders: [
        { id: "f_work", name: "Programación", color: "#4285f4", keywords: ["python", "javascript", "código", "code", "script", "sql", "api", "bug", "error", "html", "css", "react"] },
        { id: "f_study", name: "Estudio", color: "#34a853", keywords: ["resumen", "summary", "explica", "explain", "examen", "curso", "historia", "matemática", "aprender"] },
        { id: "f_ideas", name: "Ideas", color: "#fbbc04", keywords: ["idea", "proyecto", "project", "diseño", "design", "plan", "crea"] }
      ]
    },
    en: {
      panelTitle: "Foldy",
      toggleMinTitle: "Click to minimize/expand",
      toolbarCollapseTitle: "Collapse top bar (Drag to move)",
      toolbarExpandTitle: "Expand top bar (Drag to move)",
      toolbarVerticalTitle: "Switch to vertical bar (Drag to move)",
      toolbarHorizontalTitle: "Switch to horizontal bar (Drag to move)",
      langBtnTitle: "Cambiar idioma (English / Español)",
      newFolderBtn: "New",
      newFolderTitle: "Create a new smart folder with auto-keywords",
      searchPlaceholder: "Search conversation...",
      sortTitle: "Toggle sort order: Recent / A→Z / Z→A",
      sortRecent: "Recent",
      sortAZ: "A → Z",
      sortZA: "Z → A",
      pillAll: "All",
      pillProtected: "Protected",
      pillUnassigned: "Unassigned",
      autoRulesPrefix: "Auto-rules",
      editFolderTitle: (name) => `Edit folder "${name}"`,
      delFolderTitle: (name) => `Delete folder "${name}" (does not delete chats)`,
      emptyStateText: "No conversations match this view",
      emptyStateResetBtn: "Show all conversations",
      loadAllBtn: "Load",
      stopLoadBtn: "Stop",
      loadAllTitle: "Auto-scroll the sidebar to load all your older chat history",
      backupBtn: "Backup",
      backupTitle: "Export your folders and settings to a JSON file",
      importBtn: "Import",
      importTitle: "Restore folders and settings from a JSON file",
      selectAll: "All",
      selectAllTitle: "Select or deselect all visible conversations",
      folderBtn: (n) => `Folder (${n})`,
      folderBtnTitle: "Assign selected conversations to a folder",
      protectBtn: "Protect",
      protectBtnTitle: "Protect or unprotect selected conversations against accidental deletion",
      exportBtn: "Export .md",
      exportBtnTitle: "Export selected conversations and active chat to Markdown (.md)",
      deleteBtn: (n) => `Delete (${n})`,
      stopBtn: "Stop",
      checkboxTitle: "Select conversation (Shift + Click for range)",
      lockIconTitle: "Protected from deletion (Click to unprotect)",
      removeFromFolder: "Remove from folder",
      createNewFolderMenu: "New folder...",
      modalNewFolderTitle: "New Smart Folder",
      modalEditFolderTitle: "Edit Smart Folder",
      modalNewFolderDesc: "Choose a name, color, and optional keywords to auto-classify your chats:",
      modalFolderNamePlaceholder: "Folder name (e.g., Work, Finance, Coding...)",
      modalKeywordsPlaceholder: "Comma-separated keywords (e.g., python, invoice, bug)",
      cancel: "Cancel",
      createFolderConfirm: "Create Folder",
      saveFolderConfirm: "Save Changes",
      confirmDeleteTitle: (n) => `Delete ${n} conversation${n > 1 ? "s" : ""}?`,
      confirmDeleteDesc: (n, skipped) => `You are about to permanently delete ${n} conversation${n > 1 ? "s" : ""} from your ${P.name} history.` + (skipped > 0 ? `
(🔒 ${skipped} locked conversation(s) will be safely skipped).` : ""),
      confirmDeleteBtn: (n) => `Yes, delete (${n})`,
      toastLoadingHistory: '⏬ Loading older chat history... (Click "Stop Loading" to stop)',
      toastLoadedCount: (n) => `⏬ Conversations loaded: ${n}...`,
      toastLoadComplete: (n) => `✅ Full history loaded (${n} conversations).`,
      toastBackupSaved: "💾 Backup JSON downloaded successfully.",
      toastBackupRestored: "📂 Folders and settings restored.",
      toastBackupInvalid: "❌ Invalid JSON file.",
      toastMdExported: "📥 Markdown (.md) file downloaded.",
      toastMdEmpty: "⚠️ No selected conversations or active messages to export.",
      toastUnprotected: (n) => `🔓 Removed protection from ${n} conversation(s).`,
      toastProtected: (n) => `🔒 ${n} conversation(s) protected from accidental deletion.`,
      toastMovedToFolder: (n) => `📁 ${n} conversation(s) moved to folder.`,
      toastRemovedFromFolder: (n) => `Removed folder from ${n} conversation(s).`,
      toastAllProtected: "🔒 All selected conversations are protected with a lock.",
      toastDeletingProgress: (curr, total) => `Deleting conversation ${curr} of ${total}...`,
      toastDeleteFinishedErr: (del, err) => `Finished: ${del} deleted, ${err} failed.`,
      toastDeleteSuccess: (del) => `Done! Deleted ${del} conversation${del === 1 ? "" : "s"}.`,
      toastStopping: "Stopping after current conversation...",
      mdHeader: `${P.name} Conversations Export`,
      mdDate: "Date",
      mdSelectedIndex: (n) => `Selected Conversations Index (${n})`,
      mdFolderLabel: "Folder",
      mdActiveChatHeader: "Active Conversation Content on Screen",
      mdUser: "🧑 User",
      promptsBtn: "Prompts",
      promptsBtnTitle: "Open your reusable Quick Prompt Vault",
      modalPromptsTitle: "Quick Prompt Vault",
      modalPromptsDesc: "Click any prompt to insert it directly into the active chat, or save a new template:",
      promptTitlePlaceholder: "Short title (e.g., Senior Code Reviewer)",
      promptBodyPlaceholder: "Write the full prompt instructions...",
      addPromptBtn: "Save Prompt",
      updatePromptBtn: "Update Prompt",
      insertPromptBtn: "Insert",
      deletePromptTitle: "Delete prompt",
      copyPromptTitle: "Copy to clipboard",
      editPromptTitle: "Edit prompt",
      cmdSearchPlaceholder: "Search prompts by title or instruction...",
      cmdNewBtn: "New",
      promptCategoryPlaceholder: "Optional tag (e.g. Coding, Writing, SQL)",
      promptsNoResults: (q) => `No prompts match "${q}"`,
      cmdFooterHint: "↵ Insert · 📋 Copy · ✎ Edit · Esc Close",
      promptsEmpty: "No saved prompts yet. Create one below to insert it with 1 click.",
      searchClearTitle: "Clear search",
      toastPromptInserted: "⚡ Prompt inserted into chat.",
      toastPromptCopied: "📋 Prompt copied to clipboard.",
      varModalTitle: "Fill Prompt Variables",
      varModalDesc: (title) => `Enter values for "${title}":`,
      varInputPlaceholder: (name) => `Value for ${name}...`,
      varInsertBtn: "Insert Prompt",
      undoBtn: "Undo",
      toastAssignmentUndone: "↩️ Assignment reverted.",
      themeStyleLabel: "Visual style",
      themeAdaptive: "Adaptive",
      themeNeoBrutal: "Neo-Brutal",
      themeTerminal: "Terminal",
      themeMinimalFlat: "Minimal Flat",
      themeNeonSynth: "Neon Synth",
      syncCodeTitle: "Cross-Browser Sync",
      copySyncCodeBtn: "Copy Sync Code",
      pasteSyncCodeBtn: "Apply Code",
      syncCodePlaceholder: "Paste a foldy1:... code",
      syncCodeCopied: "Sync code copied to clipboard.",
      syncCodeApplied: "Shared config applied!",
      syncCodeInvalid: "Invalid sync code.",
      gistTitle: "GitHub Gist Sync (Optional)",
      gistTokenPlaceholder: "GitHub Token (scope: gist)",
      gistIdPlaceholder: "Gist ID (auto)",
      gistSyncBtn: "Sync Now",
      gistClearBtn: "Clear",
      gistSynced: "Gist synced successfully.",
      gistError: "GitHub Gist sync failed.",
      defaultPrompts: [
        {
          id: "p_code",
          title: "💻 Senior Code Reviewer",
          content: "Act as a Senior Software Engineer. Review the following code for potential bugs, performance issues, and security vulnerabilities, and propose a clean, optimized version:\n\n"
        },
        {
          id: "p_summary",
          title: "📝 Executive Summary",
          content: "Summarize the following text into 5 actionable key bullet points, highlighting the most important takeaways clearly and concisely:\n\n"
        },
        {
          id: "p_translate",
          title: "🌐 Technical Translator",
          content: "Translate the following text into natural, professional English/Spanish while keeping technical terminology intact:\n\n"
        }
      ],
      defaultFolders: [
        { id: "f_work", name: "Coding", color: "#4285f4", keywords: ["python", "javascript", "code", "código", "script", "sql", "api", "bug", "error", "html", "css", "react"] },
        { id: "f_study", name: "Study", color: "#34a853", keywords: ["summary", "resumen", "explain", "explica", "exam", "course", "history", "math", "learn"] },
        { id: "f_ideas", name: "Ideas", color: "#fbbc04", keywords: ["idea", "project", "proyecto", "design", "diseño", "plan", "create"] }
      ]
    }
  };
  function detectInitialLang() {
    const navLang = (navigator.language || document.documentElement.lang || "es").toLowerCase();
    return navLang.startsWith("es") ? "es" : "en";
  }

  // src/storage.js
  var SHARED_CONFIG_KEY = "gcm_shared_config_v1";
  function sanitizeMap(src, mapValue) {
    const out = {};
    if (!src || typeof src !== "object" || Array.isArray(src)) return out;
    for (const key of Object.keys(src)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
      const v = mapValue(src[key]);
      if (v !== void 0) out[key] = v;
    }
    return out;
  }
  function normalizeStoredState(parsed, defaultLang) {
    const isPlainObj = (o) => o && typeof o === "object" && !Array.isArray(o);
    parsed = isPlainObj(parsed) ? parsed : {};
    const lang = parsed.lang === "en" || parsed.lang === "es" ? parsed.lang : defaultLang;
    const fallbackPrompts = (I18N[lang]?.defaultPrompts || I18N.es.defaultPrompts).map((p) => ({ ...p }));
    return {
      lang,
      folders: Array.isArray(parsed.folders) ? parsed.folders.filter((f) => f && typeof f.id === "string" && typeof f.name === "string").map((f) => ({
        id: f.id,
        name: f.name,
        color: /^#[0-9a-fA-F]{6}$/.test(f.color) ? f.color : "#4285f4",
        keywords: Array.isArray(f.keywords) ? f.keywords.filter((k) => typeof k === "string").map((k) => k.toLowerCase()) : []
      })) : [],
      prompts: Array.isArray(parsed.prompts) ? parsed.prompts.filter((p) => p && typeof p.id === "string" && typeof p.title === "string" && typeof p.content === "string").map((p) => ({
        id: p.id,
        title: p.title,
        content: p.content
      })) : fallbackPrompts,
      assignments: sanitizeMap(parsed.assignments, (v) => typeof v === "string" && v ? v : void 0),
      protectedIds: sanitizeMap(parsed.protectedIds, (v) => v ? true : void 0),
      minimized: !!parsed.minimized,
      pos: parsed.pos && Number.isFinite(parsed.pos.left) && Number.isFinite(parsed.pos.bottom) ? { left: parsed.pos.left, bottom: parsed.pos.bottom } : null,
      toolbarPos: parsed.toolbarPos && Number.isFinite(parsed.toolbarPos.left) && Number.isFinite(parsed.toolbarPos.top) ? { left: parsed.toolbarPos.left, top: parsed.toolbarPos.top } : null,
      // Última vista usada (filtro, orden y disposición de la barra) para retomarla tras recargar la página.
      view: {
        filter: typeof parsed.view?.filter === "string" ? parsed.view.filter : "ALL",
        sort: ["DEFAULT", "AZ", "ZA"].includes(parsed.view?.sort) ? parsed.view.sort : "DEFAULT",
        toolbarCollapsed: !!parsed.view?.toolbarCollapsed,
        toolbarVertical: !!parsed.view?.toolbarVertical
      }
    };
  }
  function loadFolderData() {
    const defaultLang = detectInitialLang();
    try {
      const raw = localStorage.getItem(P.storageKey) || (P.legacyStorageKey ? localStorage.getItem(P.legacyStorageKey) : null);
      if (raw) {
        return normalizeStoredState(JSON.parse(raw), defaultLang);
      }
    } catch (_) {
    }
    const initial = {
      lang: defaultLang,
      folders: I18N[defaultLang].defaultFolders.map((f) => ({ ...f, keywords: [...f.keywords] })),
      prompts: I18N[defaultLang].defaultPrompts.map((p) => ({ ...p })),
      assignments: {},
      protectedIds: {},
      minimized: false,
      pos: null,
      toolbarPos: null,
      view: { filter: "ALL", sort: "DEFAULT", toolbarCollapsed: false, toolbarVertical: false }
    };
    saveFolderData(initial);
    return initial;
  }
  var lastSelfWrittenSyncJson = null;
  var lastSelfWrittenSharedJson = null;
  var lastSelfWrittenSharedContentJson = null;
  function getCurrentThemePreset() {
    try {
      const attr = typeof document !== "undefined" ? document.documentElement?.getAttribute("data-gcm-style") : null;
      if (attr) return normalizeThemePreset(attr);
      if (typeof localStorage !== "undefined") {
        return normalizeThemePreset(localStorage.getItem(THEME_STORAGE_KEY));
      }
    } catch (_) {
    }
    return "adaptive";
  }
  function buildQuotaSafeSharedPayload(sharedPayload) {
    const base = {
      folders: Array.isArray(sharedPayload.folders) ? sharedPayload.folders : [],
      prompts: Array.isArray(sharedPayload.prompts) ? sharedPayload.prompts : [],
      lang: sharedPayload.lang === "en" || sharedPayload.lang === "es" ? sharedPayload.lang : "es",
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
      if (size + entryLen > 7e3) break;
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
  function saveFolderData(data, options = {}) {
    try {
      localStorage.setItem(P.storageKey, JSON.stringify(data));
    } catch (_) {
    }
    if (options.localOnly) return;
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.sync?.set) {
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
    } catch (_) {
    }
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
  function initCloudSync(getState, applyIncoming) {
    try {
      if (typeof chrome === "undefined" || !chrome.storage?.sync?.get) return;
      chrome.storage.sync.get([P.storageKey, SHARED_CONFIG_KEY], (res) => {
        try {
          void chrome.runtime?.lastError;
          const cloudData = res?.[P.storageKey];
          const sharedData = res?.[SHARED_CONFIG_KEY];
          const current = getState();
          const hasCloud = !!(cloudData && typeof cloudData === "object");
          const hasShared = !!(sharedData && typeof sharedData === "object");
          if (hasCloud || hasShared) {
            if (hasShared) {
              lastSelfWrittenSharedJson = JSON.stringify(sharedData);
              if (sharedData.themePreset) {
                const normalizedTheme = applyThemePreset(sharedData.themePreset, { persist: false });
                try {
                  if (typeof localStorage !== "undefined") {
                    localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
                  }
                } catch (_) {
                }
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
              ...hasCloud ? cloudData : {},
              lang: (hasShared && (sharedData.lang === "en" || sharedData.lang === "es") ? sharedData.lang : null) || (hasCloud && (cloudData.lang === "en" || cloudData.lang === "es") ? cloudData.lang : null) || current.lang,
              folders: mergedFolders,
              prompts: mergedPrompts,
              assignments: { ...current.assignments || {}, ...hasCloud ? cloudData.assignments || {} : {} },
              protectedIds: { ...current.protectedIds || {}, ...hasCloud ? cloudData.protectedIds || {} : {} },
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
        } catch (_) {
        }
      });
      if (chrome.storage.onChanged?.addListener) {
        chrome.storage.onChanged.addListener((changes, area) => {
          if (area !== "sync") return;
          const platformChange = changes[P.storageKey]?.newValue;
          const sharedChange = changes[SHARED_CONFIG_KEY]?.newValue;
          if (!platformChange && !sharedChange) return;
          try {
            const current = getState();
            let nextRaw = { ...current };
            let changed = false;
            if (platformChange && typeof platformChange === "object") {
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
            if (sharedChange && typeof sharedChange === "object") {
              const incomingSharedJson = JSON.stringify(sharedChange);
              if (incomingSharedJson !== lastSelfWrittenSharedJson) {
                lastSelfWrittenSharedJson = incomingSharedJson;
                if (sharedChange.themePreset) {
                  const normalizedTheme = applyThemePreset(sharedChange.themePreset, { persist: false });
                  try {
                    if (typeof localStorage !== "undefined") {
                      localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
                    }
                  } catch (_) {
                  }
                }
                nextRaw = {
                  ...nextRaw,
                  folders: Array.isArray(sharedChange.folders) ? sharedChange.folders : nextRaw.folders,
                  prompts: Array.isArray(sharedChange.prompts) ? sharedChange.prompts : nextRaw.prompts,
                  lang: sharedChange.lang === "en" || sharedChange.lang === "es" ? sharedChange.lang : nextRaw.lang,
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
          } catch (_) {
          }
        });
      }
    } catch (_) {
    }
  }

  // src/state.js
  var BUILTIN_FILTERS = ["ALL", "UNASSIGNED", "PROTECTED"];
  var folderState = loadFolderData();
  var state = {
    /** Datos persistidos (idioma, carpetas, asignaciones, protegidos, posición, vista). */
    folderState,
    // Al abrir o recargar la página, mostrar siempre "Todas" ('ALL') y orden original ('DEFAULT')
    // para que ningún filtro u orden previo oculte o altere la lista de conversaciones al iniciar.
    activeFolderFilter: "ALL",
    searchQuery: "",
    sortMode: "DEFAULT",
    toolbarCollapsed: folderState.view.toolbarCollapsed,
    toolbarVertical: !!folderState.view.toolbarVertical,
    autoScrollActive: false,
    autoScrollRunId: 0,
    autoSelectAllMode: false,
    deletionInProgress: false,
    deletionStopRequested: false,
    lastCheckedCheckbox: null,
    lastCheckedConvId: null,
    delegatedListenerAttached: false,
    cachedSidebarEl: null,
    cachedChatGptToken: null,
    panelJustDragged: false,
    toolbarJustDragged: false,
    toastTimer: null,
    isRefreshing: false,
    refreshDebounceTimer: null
  };
  var selectedMap = /* @__PURE__ */ new Map();
  var autoClassifiedVisited = /* @__PURE__ */ new Set();
  var t = () => I18N[state.folderState.lang] || I18N.es;
  function saveView() {
    state.folderState.view = {
      filter: state.activeFolderFilter,
      sort: state.sortMode,
      toolbarCollapsed: state.toolbarCollapsed,
      toolbarVertical: state.toolbarVertical
    };
    saveFolderData(state.folderState, { localOnly: true });
  }

  // src/sidebar.js
  var rowIdCache = /* @__PURE__ */ new WeakMap();
  var rowTitleCache = /* @__PURE__ */ new WeakMap();
  var TASK_ID_RE = /\b(task_[0-9a-zA-Z_-]{5,})\b/;
  var UUID_RE = /\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/i;
  var CHATGPT_STATIC_LABELS = /* @__PURE__ */ new Set([
    "chat nuevo",
    "new chat",
    "buscar chats",
    "search chats",
    "imágenes",
    "imagenes",
    "images",
    "aplicaciones",
    "apps",
    "codex",
    "gpt",
    "gpts",
    "explorar gpt",
    "explore gpts",
    "proyectos",
    "projects",
    "nuevo proyecto",
    "new project",
    "tus chats",
    "your chats",
    "biblioteca",
    "library",
    "sora",
    "hoy",
    "today",
    "ayer",
    "yesterday",
    "últimos 7 días",
    "previous 7 days",
    "últimos 30 días",
    "previous 30 days"
  ]);
  function slugifyTitleForTaskId(title) {
    const base = (title || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 36);
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = hash * 31 + title.charCodeAt(i) >>> 0;
    }
    return `task_cloud_${base || "item"}_${hash.toString(36)}`;
  }
  function parseConvId(el2) {
    if (!el2) return null;
    const href = el2.getAttribute?.("href") || el2.querySelector?.(CONV_LINK_SELECTOR)?.getAttribute?.("href") || el2.querySelector?.("a[href]")?.getAttribute?.("href") || "";
    const cached = rowIdCache.get(el2);
    if (cached && cached.href === href && href) return cached.id;
    if (href) {
      let pathPart = href;
      if (href.startsWith("http")) {
        try {
          pathPart = new URL(href, location.origin).pathname;
        } catch (_) {
        }
      }
      const match = P.convHrefRegex.exec(pathPart);
      if (match) {
        rowIdCache.set(el2, { href, id: match[1] });
        return match[1];
      }
      const taskMatch = TASK_ID_RE.exec(href);
      if (taskMatch) {
        rowIdCache.set(el2, { href, id: taskMatch[1] });
        return taskMatch[1];
      }
      const uuidMatch = UUID_RE.exec(href);
      if (uuidMatch) {
        rowIdCache.set(el2, { href, id: uuidMatch[1] });
        return uuidMatch[1];
      }
    }
    const jslog = el2.getAttribute?.("jslog") || "";
    if (jslog) {
      const cachedJslog = rowIdCache.get(el2);
      if (cachedJslog && cachedJslog.href === jslog) return cachedJslog.id;
      const cMatch = /\bc_([0-9a-fA-F]{8,})\b/.exec(jslog);
      if (cMatch) {
        const id2 = `c_${cMatch[1]}`;
        rowIdCache.set(el2, { href: jslog, id: id2 });
        return id2;
      }
      let h1 = 2166136261;
      let h2 = 16777619;
      for (let i = 0; i < jslog.length; i++) {
        const ch = jslog.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 16777619) >>> 0;
        h2 = Math.imul(h2 ^ (ch << 5 | ch >>> 3), 2166136261) >>> 0;
      }
      const id = `conv_${h1.toString(36)}_${h2.toString(36)}`;
      rowIdCache.set(el2, { href: jslog, id });
      return id;
    }
    const keyHolder = (el2.hasAttribute?.("data-sidebar-chatgpt-conversation-key") ? el2 : null) || el2.closest?.("[data-sidebar-chatgpt-conversation-key]") || el2.querySelector?.("[data-sidebar-chatgpt-conversation-key]");
    if (keyHolder) {
      const key = keyHolder.getAttribute("data-sidebar-chatgpt-conversation-key");
      if (key) return key;
    }
    const testIdAttr = el2.getAttribute?.("data-testid") || el2.closest?.("[data-testid]")?.getAttribute("data-testid") || "";
    if (testIdAttr) {
      const tm = TASK_ID_RE.exec(testIdAttr) || UUID_RE.exec(testIdAttr);
      if (tm) return tm[1];
    }
    const bridgedId = el2.getAttribute?.("data-gcm-conv-id") || el2.closest?.("[data-gcm-conv-id]")?.getAttribute("data-gcm-conv-id") || el2.querySelector?.("[data-gcm-conv-id]")?.getAttribute("data-gcm-conv-id") || "";
    if (bridgedId) return bridgedId;
    return null;
  }
  function extractConvTitle(row, convId) {
    const cached = rowTitleCache.get(row);
    if (cached && cached.id === convId) return cached.title;
    const linkEl = row.querySelector?.(".conversation-title") || row.querySelector?.('[dir="auto"]') || row.querySelector?.(CONV_LINK_SELECTOR) || row;
    let rawText = "";
    if (linkEl.querySelector?.(".gcm-chat-badge, .gcm-lock-icon, button")) {
      const clone = linkEl.cloneNode(true);
      clone.querySelectorAll(".gcm-chat-badge, .gcm-lock-icon, .gcm-checkbox, button").forEach((n) => n.remove());
      rawText = clone.textContent || "";
    } else {
      rawText = linkEl.textContent || "";
    }
    const title = rawText.replace(/^🔒\s*/, "").trim();
    if (title && convId) rowTitleCache.set(row, { id: convId, title });
    return title;
  }
  function getSidebarElement() {
    if (state.cachedSidebarEl && state.cachedSidebarEl.isConnected && state.cachedSidebarEl.querySelector(SELECTORS.conversationLinks)) {
      return state.cachedSidebarEl;
    }
    const candidates = document.querySelectorAll(SELECTORS.sidebar);
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].querySelector(SELECTORS.conversationLinks)) {
        state.cachedSidebarEl = candidates[i];
        return state.cachedSidebarEl;
      }
    }
    state.cachedSidebarEl = candidates[0] || null;
    return state.cachedSidebarEl;
  }
  function isSingleRowContainer(container) {
    if (!container || container === document.body) return false;
    const tag = container.tagName;
    if (tag === "NAV" || tag === "ASIDE" || tag === "MAIN" || tag === "OL" || tag === "UL" || tag === "SECTION") {
      return false;
    }
    if (container.id === "history" || container.getAttribute?.("data-testid") === "stage-thread-flyout") {
      return false;
    }
    const links = container.querySelectorAll(CONV_LINK_SELECTOR);
    return links.length <= 1;
  }
  function findRowContainer(el2) {
    for (let i = 0; i < SELECTORS.rowClosest.length; i++) {
      const match = el2.closest(SELECTORS.rowClosest[i]);
      if (match && isSingleRowContainer(match)) return match;
    }
    return el2;
  }
  function hasTrailingIconAfterText(el2) {
    const firstSvg = el2.querySelector?.("svg");
    if (!firstSvg) return false;
    const walker = document.createTreeWalker(el2, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.nodeValue && node.nodeValue.trim().length >= 2) {
        return Boolean(node.compareDocumentPosition(firstSvg) & 4);
      }
      node = walker.nextNode();
    }
    return false;
  }
  function isLikelyChatGptCloudRow(el2, historyContainers) {
    if (!el2 || el2.nodeType !== 1) return false;
    if (el2.closest("main") || el2.closest('[id^="gcm-"]')) return false;
    if (!isSingleRowContainer(el2)) return false;
    if (el2.querySelector(CONV_LINK_SELECTOR)) return false;
    if (el2.querySelector('.__menu-item, [data-sidebar-item="true"], [data-testid^="history-item"], ol, ul, nav, aside')) {
      return false;
    }
    const href = (el2.getAttribute?.("href") || el2.querySelector?.("a[href]")?.getAttribute?.("href") || "").trim();
    if (href === "/" || href === "/gpts" || href === "/images" || href === "/codex" || href === "/library" || href === "/projects") {
      return false;
    }
    const title = extractConvTitle(el2, "");
    if (!title || title.length < 2 || title.length > 160 || title.includes("\n")) return false;
    if (CHATGPT_STATIC_LABELS.has(title.toLowerCase())) return false;
    const isMenuItem = el2.classList?.contains("__menu-item") || el2.getAttribute?.("data-sidebar-item") === "true" || (el2.getAttribute?.("data-testid") || "").startsWith("history-item");
    const inHistoryList = historyContainers.has(el2.parentElement);
    if ((isMenuItem || inHistoryList) && hasTrailingIconAfterText(el2)) {
      return true;
    }
    return false;
  }
  function getConversationRows() {
    const sidebar = getSidebarElement();
    const root = PLATFORM_KEY === "chatgpt" ? document : sidebar || (PLATFORM_KEY !== "gemini" ? document : null);
    if (!root) return [];
    const candidates = root.querySelectorAll(SELECTORS.conversationLinks);
    const rows = [];
    const seenRows = /* @__PURE__ */ new Set();
    const seenIds = /* @__PURE__ */ new Set();
    const historyContainers = /* @__PURE__ */ new Set();
    for (let i = 0; i < candidates.length; i++) {
      const el2 = candidates[i];
      if (PLATFORM_KEY !== "gemini" && el2.closest("main")) continue;
      if (el2.closest('[id^="gcm-"]')) continue;
      const id = parseConvId(el2);
      if (!id || seenIds.has(id)) continue;
      const row = findRowContainer(el2);
      if (!isSingleRowContainer(row)) continue;
      if (!seenRows.has(row)) {
        seenRows.add(row);
        seenIds.add(id);
        if (row.parentElement) historyContainers.add(row.parentElement);
        rows.push({
          id,
          row,
          link: el2,
          title: extractConvTitle(row, id)
        });
      }
    }
    if (PLATFORM_KEY === "chatgpt") {
      const cloudSelector = 'nav .__menu-item, aside .__menu-item, nav [data-sidebar-item="true"], aside [data-sidebar-item="true"], nav [data-testid^="history-item"], aside [data-testid^="history-item"]';
      const extraCandidates = Array.from(root.querySelectorAll(cloudSelector));
      for (const container of historyContainers) {
        if (container && container.children) {
          for (const child of container.children) {
            extraCandidates.push(child);
          }
        }
      }
      for (let i = 0; i < extraCandidates.length; i++) {
        const r = findRowContainer(extraCandidates[i]);
        const existingId = r?.getAttribute?.("data-gcm-conv-id");
        if (existingId) seenIds.add(existingId);
      }
      for (let i = 0; i < extraCandidates.length; i++) {
        const el2 = extraCandidates[i];
        const row = findRowContainer(el2);
        if (seenRows.has(row)) continue;
        if (!isLikelyChatGptCloudRow(row, historyContainers)) continue;
        const title = extractConvTitle(row, "");
        const existingId = row.getAttribute?.("data-gcm-conv-id");
        let id = existingId || parseConvId(row) || slugifyTitleForTaskId(title);
        if (!existingId && seenIds.has(id)) {
          let suffix = 2;
          while (seenIds.has(`${id}_${suffix}`)) suffix++;
          id = `${id}_${suffix}`;
        }
        if (!existingId) {
          row.setAttribute("data-gcm-conv-id", id);
        }
        row.setAttribute("data-gcm-task", "1");
        seenRows.add(row);
        seenIds.add(id);
        rows.push({
          id,
          row,
          link: row,
          title
        });
      }
    }
    return rows;
  }
  function findRowById(targetId) {
    const rows = getConversationRows();
    return rows.find((item) => item.id === targetId) || null;
  }

  // src/folders.js
  function runAutoClassification(items) {
    let changed = false;
    for (let i = 0; i < items.length; i++) {
      const { id, title } = items[i];
      if (autoClassifiedVisited.has(id) || state.folderState.assignments[id]) {
        autoClassifiedVisited.add(id);
        continue;
      }
      const lowerTitle = (title || "").toLowerCase();
      if (!lowerTitle) continue;
      autoClassifiedVisited.add(id);
      for (let j = 0; j < state.folderState.folders.length; j++) {
        const folder = state.folderState.folders[j];
        const kws = folder.keywords;
        if (!kws || kws.length === 0) continue;
        if (kws.some((kw) => kw && lowerTitle.includes(kw))) {
          state.folderState.assignments[id] = folder.id;
          changed = true;
          break;
        }
      }
    }
    if (changed) {
      saveFolderData(state.folderState);
    }
  }
  function applyFolderBadgesAndFilter(items) {
    const folderLookup = new Map(state.folderState.folders.map((f) => [f.id, f]));
    const cleanQuery = state.searchQuery.trim().toLowerCase();
    document.querySelectorAll(".gcm-hidden-by-filter").forEach((el2) => {
      if (state.activeFolderFilter === "ALL" && !cleanQuery || !isSingleRowContainer(el2)) {
        el2.classList.remove("gcm-hidden-by-filter");
      }
    });
    for (let i = 0; i < items.length; i++) {
      const { id, row, title } = items[i];
      const assignedFolderId = state.folderState.assignments[id];
      const folder = assignedFolderId ? folderLookup.get(assignedFolderId) : null;
      const isProtected = !!state.folderState.protectedIds[id];
      row.classList.toggle("gcm-has-lock", isProtected);
      row.classList.toggle("gcm-has-badge", !!folder);
      if (folder) {
        row.style.setProperty("--gcm-row-folder-color", folder.color);
      } else {
        row.style.removeProperty("--gcm-row-folder-color");
      }
      let lockEl = row.querySelector(".gcm-lock-icon");
      if (isProtected) {
        if (!lockEl) {
          lockEl = document.createElement("span");
          lockEl.className = "gcm-lock-icon";
          lockEl.appendChild(createIconElement(ICONS.lockSmall));
          lockEl.title = t().lockIconTitle;
          lockEl.setAttribute("role", "button");
          lockEl.setAttribute("tabindex", "0");
          lockEl.setAttribute("aria-label", t().lockIconTitle);
          lockEl.dataset.convId = id;
          lockEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              lockEl.click();
            }
          });
          row.appendChild(lockEl);
        }
      } else if (lockEl) {
        lockEl.remove();
      }
      let badge = row.querySelector(".gcm-chat-badge");
      if (folder) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "gcm-chat-badge";
          row.appendChild(badge);
        }
        badge.title = folder.name;
        const badgeSig = `${folder.id}:${folder.name}:${folder.color}`;
        if (badge.dataset.sig !== badgeSig) {
          badge.dataset.sig = badgeSig;
          badge.textContent = "";
          badge.style.setProperty("--gcm-badge-color", folder.color);
          const dot = document.createElement("span");
          dot.className = "gcm-badge-dot";
          const txt = document.createElement("span");
          txt.className = "gcm-badge-text";
          txt.textContent = folder.name;
          badge.appendChild(dot);
          badge.appendChild(txt);
        }
      } else if (badge) {
        badge.remove();
      }
      let visible = true;
      if (state.activeFolderFilter === "UNASSIGNED") {
        visible = !folder;
      } else if (state.activeFolderFilter === "PROTECTED") {
        visible = isProtected;
      } else if (state.activeFolderFilter !== "ALL") {
        visible = folder && folder.id === state.activeFolderFilter;
      }
      if (visible && cleanQuery) {
        const matchTitle = (title || "").toLowerCase().includes(cleanQuery);
        const matchFolder = folder && folder.name.toLowerCase().includes(cleanQuery);
        visible = matchTitle || !!matchFolder;
      }
      const isHidden = row.classList.contains("gcm-hidden-by-filter");
      if (visible && isHidden) {
        row.classList.remove("gcm-hidden-by-filter");
        const parentLi = row.closest("li");
        if (parentLi && isSingleRowContainer(parentLi)) {
          parentLi.classList.remove("gcm-hidden-by-filter");
        }
      } else if (!visible && !isHidden) {
        row.classList.add("gcm-hidden-by-filter");
        const parentLi = row.closest("li");
        if (parentLi && isSingleRowContainer(parentLi)) {
          parentLi.classList.add("gcm-hidden-by-filter");
        }
      }
    }
    if (state.sortMode === "DEFAULT") {
      for (let i = 0; i < items.length; i++) {
        const r = items[i].row;
        if (r.style.order) r.style.order = "";
        if (r.parentElement?.classList.contains("gcm-sort-container")) {
          r.parentElement.classList.remove("gcm-sort-container");
        }
      }
    } else {
      const sorted = [...items].sort((a, b) => {
        const cmp = (a.title || "").localeCompare(b.title || "", state.folderState.lang, { sensitivity: "base" });
        return state.sortMode === "AZ" ? cmp : -cmp;
      });
      for (let i = 0; i < sorted.length; i++) {
        const r = sorted[i].row;
        if (r.parentElement && !r.parentElement.classList.contains("gcm-sort-container")) {
          r.parentElement.classList.add("gcm-sort-container");
        }
        const targetOrder = String(i + 1);
        if (r.style.order !== targetOrder) {
          r.style.order = targetOrder;
        }
      }
    }
  }
  function deleteFolderById(folderId) {
    state.folderState.folders = state.folderState.folders.filter((f) => f.id !== folderId);
    for (const convId of Object.keys(state.folderState.assignments)) {
      if (state.folderState.assignments[convId] === folderId) {
        delete state.folderState.assignments[convId];
      }
    }
    if (state.activeFolderFilter === folderId) {
      state.activeFolderFilter = "ALL";
    }
    saveView();
    refreshUI();
  }

  // src/dialogs.js
  function openCreateFolderModal(onCreatedCallback = null, existingFolder = null) {
    const existing = document.getElementById("gcm-modal-overlay");
    if (existing) {
      existing._gcmClose?.(false);
      existing.remove();
    }
    const isEdit = Boolean(existingFolder);
    let chosenColor = isEdit ? existingFolder.color || PRESET_COLORS[0] : PRESET_COLORS[state.folderState.folders.length % PRESET_COLORS.length];
    const overlay = document.createElement("div");
    overlay.id = "gcm-modal-overlay";
    const card = document.createElement("div");
    card.className = "gcm-modal-card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    const closeModal = () => {
      document.removeEventListener("keydown", onEsc);
      overlay.remove();
    };
    overlay._gcmClose = closeModal;
    const title = document.createElement("div");
    title.className = "gcm-modal-title";
    title.textContent = isEdit ? t().modalEditFolderTitle : t().modalNewFolderTitle;
    const desc = document.createElement("div");
    desc.className = "gcm-modal-desc";
    desc.textContent = t().modalNewFolderDesc;
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.className = "gcm-modal-input";
    inputName.placeholder = t().modalFolderNamePlaceholder;
    if (isEdit) {
      inputName.value = existingFolder.name || "";
    }
    const inputKeywords = document.createElement("input");
    inputKeywords.type = "text";
    inputKeywords.className = "gcm-modal-input";
    inputKeywords.placeholder = t().modalKeywordsPlaceholder;
    if (isEdit && Array.isArray(existingFolder.keywords)) {
      inputKeywords.value = existingFolder.keywords.join(", ");
    }
    const colorRow = document.createElement("div");
    colorRow.className = "gcm-color-picker-row";
    PRESET_COLORS.forEach((col) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "gcm-color-swatch" + (col === chosenColor ? " selected" : "");
      swatch.style.backgroundColor = col;
      swatch.setAttribute("aria-label", col);
      swatch.setAttribute("aria-pressed", col === chosenColor ? "true" : "false");
      swatch.addEventListener("click", () => {
        chosenColor = col;
        colorRow.querySelectorAll(".gcm-color-swatch").forEach((s) => {
          s.classList.remove("selected");
          s.setAttribute("aria-pressed", "false");
        });
        swatch.classList.add("selected");
        swatch.setAttribute("aria-pressed", "true");
      });
      colorRow.appendChild(swatch);
    });
    const actions = document.createElement("div");
    actions.className = "gcm-modal-actions";
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "gcm-btn gcm-btn-cancel";
    cancelBtn.textContent = t().cancel;
    cancelBtn.addEventListener("click", closeModal);
    const saveBtn = document.createElement("button");
    saveBtn.className = "gcm-btn gcm-btn-stop";
    saveBtn.textContent = isEdit ? t().saveFolderConfirm : t().createFolderConfirm;
    const handleSave = () => {
      const name = inputName.value.trim();
      if (!name) {
        inputName.focus();
        return;
      }
      const keywords = inputKeywords.value.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
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
          id: "f_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6),
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
      if (typeof onCreatedCallback === "function" && savedFolder) {
        onCreatedCallback(savedFolder);
      }
    };
    saveBtn.addEventListener("click", handleSave);
    inputName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") closeModal();
    });
    inputKeywords.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") closeModal();
    });
    function onEsc(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onEsc);
    overlay.addEventListener("click", (e) => {
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
  function showConfirmModal(count, skippedProtectedCount = 0) {
    return new Promise((resolve) => {
      const existing = document.getElementById("gcm-modal-overlay");
      if (existing) {
        existing._gcmClose?.(false);
        existing.remove();
      }
      const overlay = document.createElement("div");
      overlay.id = "gcm-modal-overlay";
      const card = document.createElement("div");
      card.className = "gcm-modal-card";
      card.setAttribute("role", "dialog");
      card.setAttribute("aria-modal", "true");
      const title = document.createElement("div");
      title.className = "gcm-modal-title";
      title.textContent = t().confirmDeleteTitle(count);
      const desc = document.createElement("div");
      desc.className = "gcm-modal-desc";
      desc.textContent = t().confirmDeleteDesc(count, skippedProtectedCount);
      const actions = document.createElement("div");
      actions.className = "gcm-modal-actions";
      const cancelBtn = document.createElement("button");
      cancelBtn.className = "gcm-btn gcm-btn-cancel";
      cancelBtn.textContent = t().cancel;
      const confirmBtn = document.createElement("button");
      confirmBtn.className = "gcm-btn gcm-btn-danger";
      confirmBtn.textContent = t().confirmDeleteBtn(count);
      let settled = false;
      const close = (result) => {
        if (settled) return;
        settled = true;
        document.removeEventListener("keydown", onEsc);
        overlay.remove();
        resolve(result);
      };
      overlay._gcmClose = close;
      function onEsc(e) {
        if (e.key === "Escape") {
          close(false);
        }
      }
      document.addEventListener("keydown", onEsc);
      cancelBtn.addEventListener("click", () => close(false));
      confirmBtn.addEventListener("click", () => close(true));
      overlay.addEventListener("click", (e) => {
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
  function updateStatusToast(text, current = null, total = null, autoHideMs = 0) {
    let toast = document.getElementById("gcm-status-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "gcm-status-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      const label = document.createElement("div");
      label.id = "gcm-status-label";
      const track = document.createElement("div");
      track.className = "gcm-progress-track";
      track.id = "gcm-status-track";
      track.setAttribute("role", "progressbar");
      const fill = document.createElement("div");
      fill.className = "gcm-progress-fill";
      fill.id = "gcm-status-fill";
      track.appendChild(fill);
      toast.appendChild(label);
      toast.appendChild(track);
      document.body.appendChild(toast);
    }
    const labelEl = document.getElementById("gcm-status-label");
    const trackEl = document.getElementById("gcm-status-track");
    const fillEl = document.getElementById("gcm-status-fill");
    if (labelEl) labelEl.textContent = text;
    if (current !== null && total !== null && total > 0) {
      if (trackEl) trackEl.style.display = "block";
      const pct = Math.min(100, Math.round(current / total * 100));
      if (fillEl) fillEl.style.width = `${pct}%`;
    } else if (trackEl) {
      trackEl.style.display = "none";
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
  function openPromptVarsModal(promptTitle, variables) {
    return new Promise((resolve) => {
      const existing = document.getElementById("gcm-modal-overlay");
      if (existing) {
        existing._gcmClose?.(null);
        existing.remove();
      }
      const overlay = document.createElement("div");
      overlay.id = "gcm-modal-overlay";
      const card = document.createElement("div");
      card.className = "gcm-modal-card gcm-var-modal";
      card.setAttribute("role", "dialog");
      card.setAttribute("aria-modal", "true");
      const title = document.createElement("div");
      title.className = "gcm-modal-title";
      title.textContent = t().varModalTitle;
      const desc = document.createElement("div");
      desc.className = "gcm-modal-desc";
      desc.textContent = t().varModalDesc(promptTitle);
      const fieldsWrap = document.createElement("div");
      fieldsWrap.className = "gcm-var-fields";
      const inputs = variables.map((varName, idx) => {
        const field = document.createElement("div");
        field.className = "gcm-var-field";
        const label = document.createElement("label");
        label.className = "gcm-var-label";
        label.htmlFor = `gcm-var-input-${idx}`;
        label.textContent = varName;
        const input = document.createElement("input");
        input.type = "text";
        input.className = "gcm-modal-input gcm-var-input";
        input.id = `gcm-var-input-${idx}`;
        input.placeholder = t().varInputPlaceholder(varName);
        input.dataset.var = varName;
        field.append(label, input);
        fieldsWrap.appendChild(field);
        return input;
      });
      const actions = document.createElement("div");
      actions.className = "gcm-modal-actions";
      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "gcm-btn gcm-btn-cancel";
      cancelBtn.textContent = t().cancel;
      const submitBtn = document.createElement("button");
      submitBtn.type = "button";
      submitBtn.className = "gcm-btn gcm-btn-stop";
      submitBtn.textContent = t().varInsertBtn;
      let settled = false;
      const close = (result) => {
        if (settled) return;
        settled = true;
        document.removeEventListener("keydown", onEsc);
        overlay.remove();
        resolve(result);
      };
      overlay._gcmClose = close;
      const handleSubmit = () => {
        const values = {};
        for (const input of inputs) {
          values[input.dataset.var] = input.value;
        }
        close(values);
      };
      function onEsc(e) {
        if (e.key === "Escape") {
          close(null);
        }
      }
      document.addEventListener("keydown", onEsc);
      for (const input of inputs) {
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        });
      }
      cancelBtn.addEventListener("click", () => close(null));
      submitBtn.addEventListener("click", handleSubmit);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close(null);
      });
      actions.append(cancelBtn, submitBtn);
      card.append(title, desc, fieldsWrap, actions);
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      setTimeout(() => inputs[0]?.focus(), 40);
    });
  }

  // src/utils.js
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function realClick(el2) {
    if (!el2 || !el2.isConnected) return false;
    if (typeof el2.focus === "function") {
      el2.focus({ preventScroll: true });
    }
    let clickedDuringPointer = false;
    const onNativeClick = () => {
      clickedDuringPointer = true;
    };
    el2.addEventListener("click", onNativeClick, { once: true, capture: true });
    const EventClass = typeof PointerEvent === "function" ? PointerEvent : MouseEvent;
    for (const type of ["pointermove", "mouseover", "pointerdown", "mousedown", "pointerup", "mouseup"]) {
      el2.dispatchEvent(
        new (type.startsWith("pointer") ? EventClass : MouseEvent)(type, {
          bubbles: true,
          cancelable: true,
          composed: true,
          button: 0,
          buttons: type.endsWith("down") ? 1 : 0,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
          view: window
        })
      );
    }
    el2.removeEventListener("click", onNativeClick, true);
    if (clickedDuringPointer || el2.getAttribute?.("data-state") === "open" || el2.getAttribute?.("aria-expanded") === "true") {
      return true;
    }
    if (typeof el2.click === "function") {
      el2.click();
    } else {
      el2.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1, view: window }));
    }
    return true;
  }
  function isActiveOverlay(el2) {
    if (!el2 || !el2.isConnected || el2.getAttribute("data-state") === "closed") return false;
    const style = getComputedStyle(el2);
    return !el2.hidden && style.display !== "none" && style.visibility !== "hidden" && el2.getClientRects().length > 0;
  }
  async function pollUntil(predicate, timeout = 3e3, interval = 100) {
    const start = Date.now();
    let result = predicate();
    while (!result && Date.now() - start < timeout) {
      await sleep(interval);
      result = predicate();
    }
    return result;
  }

  // src/autoscroll.js
  function findScrollContainer(targetRow) {
    let scroller = targetRow?.parentElement || null;
    let fallbackScroller = null;
    while (scroller && scroller !== document.body && scroller !== document.documentElement) {
      if (scroller.scrollHeight > scroller.clientHeight + 10) {
        if (!fallbackScroller) fallbackScroller = scroller;
        try {
          const overflowY = typeof getComputedStyle === "function" ? getComputedStyle(scroller).overflowY : "";
          if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
            return scroller;
          }
        } catch (_) {
          return scroller;
        }
      }
      scroller = scroller.parentElement;
    }
    return fallbackScroller;
  }
  async function pulseScrollInBackground(targetRow) {
    const scroller = findScrollContainer(targetRow);
    if (!scroller) return;
    const savedScrollTop = scroller.scrollTop;
    scroller.scrollTop = scroller.scrollHeight;
    try {
      scroller.dispatchEvent(new Event("scroll", { bubbles: true }));
    } catch (_) {
    }
    await new Promise((resolve) => {
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(resolve);
      } else {
        setTimeout(resolve, 16);
      }
    });
    if (scroller.isConnected) {
      scroller.scrollTop = savedScrollTop;
    }
  }
  async function toggleAutoScrollHistory(options = {}) {
    const silent = !!options.silent;
    if (state.autoScrollActive) {
      state.autoScrollActive = false;
      refreshUI();
      return;
    }
    state.autoScrollActive = true;
    const runId = ++state.autoScrollRunId;
    refreshUI();
    if (!silent) {
      updateStatusToast(t().toastLoadingHistory);
    }
    let unchangedCycles = 0;
    let lastCount = getConversationRows().length;
    let finishedNaturally = false;
    while (state.autoScrollActive && runId === state.autoScrollRunId) {
      const items = getConversationRows();
      if (items.length > 0) {
        let targetRow = items[items.length - 1].row;
        for (let k = items.length - 1; k >= 0; k--) {
          if (!items[k].row.classList.contains("gcm-hidden-by-filter")) {
            targetRow = items[k].row;
            break;
          }
        }
        await pulseScrollInBackground(targetRow);
      }
      await sleep(1100);
      if (!state.autoScrollActive || runId !== state.autoScrollRunId) break;
      refreshUI();
      const currentCount = getConversationRows().length;
      if (!silent) {
        updateStatusToast(t().toastLoadedCount(currentCount));
      }
      if (currentCount === lastCount) {
        unchangedCycles++;
        if (unchangedCycles >= 4) {
          finishedNaturally = true;
          state.autoScrollActive = false;
          if (!silent) {
            updateStatusToast(t().toastLoadComplete(currentCount), null, null, 3500);
          }
          break;
        }
      } else {
        unchangedCycles = 0;
        lastCount = currentCount;
      }
    }
    if (runId !== state.autoScrollRunId) return;
    state.autoScrollActive = false;
    if (!finishedNaturally && !silent) {
      updateStatusToast(t().toastLoadedCount(getConversationRows().length), null, null, 2500);
    }
    refreshUI();
  }

  // src/backup.js
  function exportBackupConfig() {
    const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...backupData } = state.folderState;
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${PLATFORM_KEY}-folders-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    updateStatusToast(t().toastBackupSaved, null, null, 2500);
  }
  function applyImportedBackupJson(rawText) {
    try {
      const parsed = JSON.parse(String(rawText));
      if (Array.isArray(parsed?.folders)) {
        state.folderState = {
          lang: parsed.lang === "en" || parsed.lang === "es" ? parsed.lang : state.folderState.lang,
          folders: parsed.folders.map((f, idx) => ({
            id: typeof f?.id === "string" && f.id ? f.id : `f_imp_${idx}_${Math.random().toString(36).slice(2, 6)}`,
            name: typeof f?.name === "string" && f.name.trim() ? f.name.trim().slice(0, 40) : `Folder ${idx + 1}`,
            color: /^#[0-9a-fA-F]{6}$/.test(f?.color) ? f.color : PRESET_COLORS[idx % PRESET_COLORS.length],
            keywords: Array.isArray(f?.keywords) ? f.keywords.filter((k) => typeof k === "string").map((k) => k.trim().toLowerCase()).filter(Boolean) : []
          })),
          prompts: Array.isArray(parsed.prompts) ? parsed.prompts.filter((p) => p && typeof p.id === "string" && typeof p.title === "string" && typeof p.content === "string").map((p) => ({ id: p.id, title: p.title, content: p.content })) : state.folderState.prompts || [],
          assignments: sanitizeMap(parsed.assignments, (v) => typeof v === "string" && v ? v : void 0),
          protectedIds: sanitizeMap(parsed.protectedIds, (v) => v ? true : void 0),
          minimized: !!parsed.minimized,
          pos: state.folderState.pos || null,
          // la posición del panel es local a esta pantalla
          toolbarPos: state.folderState.toolbarPos || null,
          view: {
            filter: "ALL",
            sort: state.sortMode,
            toolbarCollapsed: state.toolbarCollapsed,
            toolbarVertical: state.toolbarVertical
          }
        };
        state.activeFolderFilter = "ALL";
        autoClassifiedVisited.clear();
        selectedMap.clear();
        saveFolderData(state.folderState);
        document.getElementById("gcm-toolbar")?.remove();
        document.getElementById("gcm-folders-box")?.remove();
        refreshUI();
        updateStatusToast(t().toastBackupRestored, null, null, 3e3);
        return true;
      }
    } catch (_) {
    }
    updateStatusToast(t().toastBackupInvalid, null, null, 3e3);
    return false;
  }
  function importBackupConfig(rawJsonString = null) {
    if (typeof rawJsonString === "string" && rawJsonString.trim()) {
      return applyImportedBackupJson(rawJsonString);
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        applyImportedBackupJson(reader.result);
      };
      reader.readAsText(file);
    });
    input.click();
    return true;
  }

  // src/prompts.js
  var VAR_PATTERN = /\{\{\s*([^{}]+?)\s*\}\}/g;
  function extractPromptVariables(text) {
    if (typeof text !== "string" || !text.includes("{{")) return [];
    const seen = /* @__PURE__ */ new Set();
    for (const match of text.matchAll(VAR_PATTERN)) {
      const name = match[1].trim();
      if (name) seen.add(name);
    }
    return [...seen];
  }
  function substitutePromptVariables(text, values = {}) {
    if (typeof text !== "string" || !values) return text;
    return text.replace(VAR_PATTERN, (full, rawName) => {
      const key = rawName.trim();
      return Object.hasOwn(values, key) ? String(values[key]) : full;
    });
  }
  function insertPromptIntoChat(text) {
    const input = document.querySelector(SELECTORS.promptInput);
    if (!input) {
      try {
        navigator.clipboard?.writeText(text);
      } catch (_) {
      }
      updateStatusToast(t().toastPromptCopied, null, null, 2800);
      return false;
    }
    input.focus();
    if (input.tagName === "TEXTAREA" || input.tagName === "INPUT") {
      const existing = input.value ? `${input.value}
` : "";
      const nextValue = existing + text;
      const proto = input.tagName === "TEXTAREA" ? window.HTMLTextAreaElement?.prototype : window.HTMLInputElement?.prototype;
      const nativeSetter = proto ? Object.getOwnPropertyDescriptor(proto, "value")?.set : null;
      if (nativeSetter) {
        nativeSetter.call(input, nextValue);
      } else {
        input.value = nextValue;
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      const currentText = (input.textContent || "").trim();
      const isRichEditor = input.classList?.contains("ProseMirror") || input.classList?.contains("ql-editor") || !!input.querySelector?.("p");
      if (isRichEditor) {
        const lines = (currentText ? `${currentText}
${text}` : text).split(/\r?\n/);
        input.textContent = "";
        for (const line of lines) {
          const p = document.createElement("p");
          if (line) {
            p.textContent = line;
          } else {
            p.appendChild(document.createElement("br"));
          }
          input.appendChild(p);
        }
      } else {
        const nextText = currentText ? `${currentText}
${text}` : text;
        input.textContent = nextText;
      }
      const InputEvt = typeof InputEvent === "function" ? InputEvent : Event;
      input.dispatchEvent(new InputEvt("input", { bubbles: true, inputType: "insertText", data: text }));
    }
    updateStatusToast(t().toastPromptInserted, null, null, 2500);
    return true;
  }
  function openPromptsModal() {
    const existing = document.getElementById("gcm-modal-overlay");
    if (existing) {
      existing._gcmClose?.(false);
      existing.remove();
    }
    if (!Array.isArray(state.folderState.prompts)) {
      state.folderState.prompts = structuredClone(t().defaultPrompts);
    }
    const isEs = state.folderState.lang === "es";
    let filterQuery = "";
    let editingPromptId = null;
    const overlay = document.createElement("div");
    overlay.id = "gcm-modal-overlay";
    const card = document.createElement("div");
    card.className = "gcm-modal-card gcm-prompts-modal-card gcm-cmd-palette";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    const closeModal = () => {
      document.removeEventListener("keydown", onEsc);
      overlay.remove();
    };
    overlay._gcmClose = closeModal;
    const cmdHeader = document.createElement("div");
    cmdHeader.className = "gcm-cmd-header";
    const searchIcon = createIconElement(ICONS.search);
    searchIcon.classList.add("gcm-cmd-search-icon");
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "gcm-cmd-search-input";
    searchInput.placeholder = t().cmdSearchPlaceholder;
    const toggleFormBtn = document.createElement("button");
    toggleFormBtn.type = "button";
    toggleFormBtn.className = "gcm-btn gcm-btn-folder gcm-cmd-new-btn";
    setButtonIconText(toggleFormBtn, ICONS.plus, t().cmdNewBtn);
    cmdHeader.appendChild(searchIcon);
    cmdHeader.appendChild(searchInput);
    cmdHeader.appendChild(toggleFormBtn);
    const formBox = document.createElement("div");
    formBox.className = "gcm-prompt-form gcm-cmd-drawer";
    formBox.style.display = "none";
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.className = "gcm-modal-input";
    inputTitle.placeholder = t().promptTitlePlaceholder;
    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.className = "gcm-modal-input";
    inputCategory.placeholder = t().promptCategoryPlaceholder;
    const inputBody = document.createElement("textarea");
    inputBody.className = "gcm-modal-input gcm-modal-textarea gcm-mono-textarea";
    inputBody.placeholder = t().promptBodyPlaceholder;
    inputBody.rows = 3;
    const formActions = document.createElement("div");
    formActions.className = "gcm-cmd-drawer-actions";
    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.type = "button";
    cancelEditBtn.className = "gcm-btn gcm-btn-cancel";
    cancelEditBtn.textContent = t().cancel;
    const savePromptBtn = document.createElement("button");
    savePromptBtn.type = "button";
    savePromptBtn.className = "gcm-btn gcm-btn-stop gcm-add-prompt-submit";
    setButtonIconText(savePromptBtn, ICONS.plus, t().addPromptBtn);
    formActions.appendChild(cancelEditBtn);
    formActions.appendChild(savePromptBtn);
    formBox.appendChild(inputTitle);
    formBox.appendChild(inputCategory);
    formBox.appendChild(inputBody);
    formBox.appendChild(formActions);
    const openDrawer = (promptToEdit = null) => {
      editingPromptId = promptToEdit ? promptToEdit.id : null;
      inputTitle.value = promptToEdit ? promptToEdit.title : "";
      inputCategory.value = promptToEdit?.category || "";
      inputBody.value = promptToEdit ? promptToEdit.content.trim() : "";
      setButtonIconText(
        savePromptBtn,
        promptToEdit ? ICONS.editPencil : ICONS.plus,
        promptToEdit ? t().updatePromptBtn : t().addPromptBtn
      );
      formBox.style.display = "flex";
      inputTitle.focus();
    };
    const closeDrawer = () => {
      editingPromptId = null;
      inputTitle.value = "";
      inputCategory.value = "";
      inputBody.value = "";
      formBox.style.display = "none";
    };
    toggleFormBtn.addEventListener("click", () => {
      if (formBox.style.display === "none") openDrawer(null);
      else closeDrawer();
    });
    cancelEditBtn.addEventListener("click", closeDrawer);
    const listContainer = document.createElement("div");
    listContainer.className = "gcm-prompts-list";
    const inferCategory = (p) => {
      if (p.category) return p.category;
      const lower = (p.title + " " + p.content).toLowerCase();
      if (/código|code|bug|script|sql|react|python/.test(lower)) return isEs ? "Código" : "Code";
      if (/resumen|summary|ejecutivo|bullet/.test(lower)) return isEs ? "Síntesis" : "Summary";
      if (/traduc|translat|idioma|english/.test(lower)) return isEs ? "Idiomas" : "Language";
      return "General";
    };
    const renderPromptsList = () => {
      listContainer.textContent = "";
      const q = filterQuery.trim().toLowerCase();
      const filtered = state.folderState.prompts.filter(
        (p) => !q || p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q)
      );
      if (filtered.length === 0) {
        const empty = document.createElement("div");
        empty.className = "gcm-prompts-empty";
        empty.textContent = q ? t().promptsNoResults(filterQuery) : t().promptsEmpty;
        listContainer.appendChild(empty);
        return;
      }
      filtered.forEach((p, idx) => {
        const item = document.createElement("div");
        item.className = "gcm-prompt-item" + (idx === 0 && q ? " gcm-prompt-item-active" : "");
        item.setAttribute("tabindex", "0");
        const info = document.createElement("div");
        info.className = "gcm-prompt-info";
        const titleRow = document.createElement("div");
        titleRow.className = "gcm-prompt-title-row";
        const itemTitle = document.createElement("span");
        itemTitle.className = "gcm-prompt-item-title";
        itemTitle.textContent = p.title;
        const tag = document.createElement("span");
        tag.className = "gcm-prompt-tag";
        tag.textContent = inferCategory(p);
        titleRow.appendChild(itemTitle);
        titleRow.appendChild(tag);
        const itemPreview = document.createElement("div");
        itemPreview.className = "gcm-prompt-item-preview";
        itemPreview.textContent = p.content.trim().slice(0, 140) + (p.content.length > 140 ? "…" : "");
        info.appendChild(titleRow);
        info.appendChild(itemPreview);
        const itemActions = document.createElement("div");
        itemActions.className = "gcm-prompt-item-actions";
        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "gcm-prompt-icon-btn";
        copyBtn.appendChild(createIconElement(ICONS.copy));
        copyBtn.title = t().copyPromptTitle;
        copyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          try {
            navigator.clipboard?.writeText(p.content.trim());
          } catch (_) {
          }
          updateStatusToast(t().toastPromptCopied, null, null, 2400);
        });
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "gcm-prompt-icon-btn";
        editBtn.appendChild(createIconElement(ICONS.editPencil));
        editBtn.title = t().editPromptTitle;
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openDrawer(p);
        });
        const handleUse = async (e) => {
          e?.stopPropagation();
          const vars = extractPromptVariables(p.content);
          closeModal();
          if (vars.length === 0) {
            insertPromptIntoChat(p.content);
            return;
          }
          const values = await openPromptVarsModal(p.title, vars);
          if (values) {
            insertPromptIntoChat(substitutePromptVariables(p.content, values));
          }
        };
        const useBtn = document.createElement("button");
        useBtn.type = "button";
        useBtn.className = "gcm-btn gcm-btn-stop gcm-prompt-use-btn";
        useBtn.textContent = `${t().insertPromptBtn} ↵`;
        useBtn.addEventListener("click", handleUse);
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "gcm-prompt-icon-btn gcm-prompt-del-btn";
        delBtn.appendChild(createIconElement(ICONS.close));
        delBtn.title = t().deletePromptTitle;
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          state.folderState.prompts = state.folderState.prompts.filter((itemPrompt) => itemPrompt.id !== p.id);
          saveFolderData(state.folderState);
          renderPromptsList();
        });
        itemActions.appendChild(copyBtn);
        itemActions.appendChild(editBtn);
        itemActions.appendChild(useBtn);
        itemActions.appendChild(delBtn);
        item.addEventListener("click", handleUse);
        item.addEventListener("keydown", (e) => {
          if (e.target === item && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleUse(e);
          }
        });
        item.appendChild(info);
        item.appendChild(itemActions);
        listContainer.appendChild(item);
      });
    };
    searchInput.addEventListener("input", (e) => {
      filterQuery = e.target.value;
      renderPromptsList();
    });
    savePromptBtn.addEventListener("click", () => {
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
          target.category = newCat || void 0;
          target.content = newBody + "\n\n";
        }
      } else {
        state.folderState.prompts.push({
          id: "p_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6),
          title: newTitle,
          category: newCat || void 0,
          content: newBody + "\n\n"
        });
      }
      saveFolderData(state.folderState);
      closeDrawer();
      renderPromptsList();
    });
    renderPromptsList();
    const cmdFooter = document.createElement("div");
    cmdFooter.className = "gcm-cmd-footer";
    const footerHint = document.createElement("span");
    footerHint.className = "gcm-cmd-footer-hint";
    footerHint.textContent = t().cmdFooterHint;
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "gcm-btn gcm-btn-cancel";
    closeBtn.textContent = t().cancel;
    closeBtn.addEventListener("click", closeModal);
    cmdFooter.appendChild(footerHint);
    cmdFooter.appendChild(closeBtn);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
    function onEsc(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onEsc);
    card.appendChild(cmdHeader);
    card.appendChild(formBox);
    card.appendChild(listContainer);
    card.appendChild(cmdFooter);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    setTimeout(() => searchInput.focus(), 40);
  }

  // src/deletion.js
  function isPinOrArchiveButton(btn, allowArchive = false) {
    if (!btn) return true;
    const label = ((btn.getAttribute?.("aria-label") || "") + " " + (btn.getAttribute?.("title") || "") + " " + (btn.getAttribute?.("data-testid") || "")).toLowerCase();
    if (allowArchive && label.includes("archiv")) {
      return false;
    }
    return label.includes("fijar") || label.includes("desfijar") || label.includes("pin") || label.includes("unpin") || label.includes("archiv");
  }
  function isRemoteTask(targetId, link, row) {
    if (typeof targetId === "string" && targetId.startsWith("task_")) return true;
    if (row?.getAttribute?.("data-gcm-task") === "1" || link?.getAttribute?.("data-gcm-task") === "1") return true;
    const href = link?.getAttribute?.("href") || "";
    return href.includes("/codex/tasks/") || href.includes("/codex") || href.includes("/tasks/");
  }
  function findOptionsTrigger(row, link, isTask = false) {
    const targets = [row, link, row.parentElement].filter(Boolean);
    for (const tEl of targets) {
      try {
        tEl.dispatchEvent(new CustomEvent("gcm:react-hover", { bubbles: true }));
      } catch (_) {
      }
      tEl.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
      tEl.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
      tEl.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      tEl.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    }
    const countConvLinks = (el2) => el2.querySelectorAll(CONV_LINK_SELECTOR).length;
    const scopes = [];
    scopes.push(row);
    if (row.parentElement && row.parentElement !== document.body && countConvLinks(row.parentElement) <= 1) {
      scopes.push(row.parentElement);
    }
    const allowArchiveBtn = Boolean(isTask);
    const prioritySelectors = PLATFORM_KEY === "chatgpt" ? [
      'button[data-testid^="history-item-"][data-testid$="-options"]',
      'button[data-testid*="options"]',
      'button[aria-haspopup="menu"]',
      "button[data-trailing-button]",
      'button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
      ...allowArchiveBtn ? ['button[aria-label*="rchiv"], button[title*="rchiv"], button[data-testid*="archive"]'] : []
    ] : [SELECTORS.optionsTrigger];
    for (const sel of prioritySelectors) {
      for (const scope of scopes) {
        const candidates = Array.from(scope.querySelectorAll(sel));
        const valid = candidates.find((b) => !b.classList?.contains("gcm-checkbox") && !isPinOrArchiveButton(b, allowArchiveBtn));
        if (valid) return valid;
      }
    }
    return null;
  }
  async function removeDeletedRowFromDOM(row, targetId) {
    if (!row && targetId) {
      const found = findRowById(targetId);
      row = found?.row;
    }
    if (!row) return;
    let containerToRemove = row;
    const parentLi = row.closest("li");
    if (parentLi && isSingleRowContainer(parentLi)) {
      containerToRemove = parentLi;
    } else if (row.parentElement && row.parentElement !== document.body && row.parentElement.tagName === "DIV" && isSingleRowContainer(row.parentElement) && (row.parentElement.hasAttribute("data-sidebar-chatgpt-conversation-key") || (row.parentElement.getAttribute("data-testid") || "").startsWith("history-item"))) {
      containerToRemove = row.parentElement;
    }
    if (isSingleRowContainer(containerToRemove)) {
      if (containerToRemove.isConnected) {
        row.classList?.add("gcm-row-deleting");
        containerToRemove.classList?.add("gcm-row-deleting");
        await sleep(220);
      }
      containerToRemove.remove();
    }
  }
  function cleanupEmptySidebarItems() {
    const sidebar = getSidebarElement() || document;
    const lis = sidebar.querySelectorAll("li");
    lis.forEach((li) => {
      if (!li.querySelector(CONV_LINK_SELECTOR) && !li.textContent?.trim()) {
        li.remove();
      }
    });
  }
  function checkRedirectIfActiveChatDeleted(deletedIds) {
    if (PLATFORM_KEY !== "chatgpt" || !Array.isArray(deletedIds) || deletedIds.length === 0) return;
    const currentPath = location.pathname;
    const isCurrentDeleted = deletedIds.some((id) => currentPath.includes(id));
    if (isCurrentDeleted) {
      const newChatBtn = document.querySelector('[data-testid="create-new-chat-button"], [data-testid="new-chat-button"], a[href="/"]');
      if (newChatBtn) {
        realClick(newChatBtn);
      } else {
        location.href = "/";
      }
    }
  }
  async function getChatGptToken(forceRefresh = false) {
    if (forceRefresh) state.cachedChatGptToken = null;
    if (!state.cachedChatGptToken) {
      const sessRes = await fetch("/api/auth/session", { credentials: "include" });
      if (sessRes.ok) {
        const sessData = await sessRes.json();
        state.cachedChatGptToken = sessData?.accessToken || null;
      }
    }
    return state.cachedChatGptToken;
  }
  function getCookieValue(name) {
    try {
      const m = (document.cookie || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (_) {
      return null;
    }
  }
  function buildChatGptHeaders(token, includeAccount = true) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    if (includeAccount) {
      const accountId = getCookieValue("_account");
      if (accountId && accountId !== "personal") {
        headers["ChatGPT-Account-Id"] = accountId;
      }
    }
    const deviceId = getCookieValue("oai-did") || typeof localStorage !== "undefined" && localStorage.getItem?.("oai-did");
    if (deviceId) {
      headers["OAI-Device-Id"] = deviceId;
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      headers["OAI-Language"] = navigator.language;
    }
    return headers;
  }
  async function hideChatGptConversation(targetId, token) {
    const headers = buildChatGptHeaders(token, true);
    let lastRes = await fetch(`/backend-api/conversation/${targetId}`, {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify({ is_visible: false })
    });
    if (lastRes.ok || lastRes.status === 401) return lastRes;
    if (headers["ChatGPT-Account-Id"]) {
      const personalRes = await fetch(`/backend-api/conversation/${targetId}`, {
        method: "PATCH",
        credentials: "include",
        headers: buildChatGptHeaders(token, false),
        body: JSON.stringify({ is_visible: false })
      });
      if (personalRes.ok || personalRes.status === 401) return personalRes;
      lastRes = personalRes;
    }
    try {
      const delRes = await fetch(`/backend-api/conversation/${targetId}`, {
        method: "DELETE",
        credentials: "include",
        headers
      });
      if (delRes.ok) return delRes;
    } catch (_) {
    }
    return lastRes;
  }
  async function deleteOrArchiveRemoteTaskApi(targetId, token) {
    const headers = buildChatGptHeaders(token, true);
    try {
      const delRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
        method: "DELETE",
        credentials: "include",
        headers
      });
      if (delRes.ok || delRes.status === 401) return delRes;
    } catch (_) {
    }
    try {
      const archRes = await fetch(`/backend-api/wham/tasks/${targetId}/archive`, {
        method: "POST",
        credentials: "include",
        headers
      });
      if (archRes.ok) {
        try {
          await fetch(`/backend-api/wham/tasks/${targetId}`, {
            method: "DELETE",
            credentials: "include",
            headers
          });
        } catch (_) {
        }
        return archRes;
      }
      if (archRes.status === 401) return archRes;
    } catch (_) {
    }
    try {
      const patchRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: JSON.stringify({ archived: true, is_archived: true, is_visible: false })
      });
      if (patchRes.ok || patchRes.status === 401) return patchRes;
    } catch (_) {
    }
    return fetch(`/backend-api/tasks/${targetId}`, {
      method: "DELETE",
      credentials: "include",
      headers
    });
  }
  function getAlternateChatGptId(id) {
    if (typeof id !== "string") return null;
    const taskHex = /^task_e_([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i.exec(id);
    if (taskHex) {
      return `${taskHex[1]}-${taskHex[2]}-${taskHex[3]}-${taskHex[4]}-${taskHex[5]}`.toLowerCase();
    }
    const uuidParts = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(id);
    if (uuidParts) {
      return `task_e_${uuidParts[1]}${uuidParts[2]}${uuidParts[3]}${uuidParts[4]}${uuidParts[5]}`.toLowerCase();
    }
    return null;
  }
  var cachedRemoteCatalog = { ts: 0, accountId: null, entries: [] };
  async function resolveChatGptIdByTitle(row, targetId, token) {
    if (!row) return null;
    const rawTitle = extractConvTitle(row, targetId) || "";
    const isTruncatedDom = /\.\.\.$|…$/.test(rawTitle.trim());
    const normTitle = rawTitle.replace(/(?:\.\.\.|…)$/, "").trim().toLowerCase();
    if (!normTitle) return null;
    const now = Date.now();
    const currentAccountId = getCookieValue("_account") || "personal";
    if (now - cachedRemoteCatalog.ts > 15e3 || cachedRemoteCatalog.accountId !== currentAccountId || cachedRemoteCatalog.entries.length === 0) {
      const headers = buildChatGptHeaders(token, true);
      const endpoints = [
        { url: "/backend-api/wham/tasks", isTask: true },
        { url: "/backend-api/tasks", isTask: true },
        { url: "/backend-api/conversations?offset=0&limit=100&order=updated", isTask: false }
      ];
      const entries = [];
      for (const ep of endpoints) {
        try {
          const r = await fetch(ep.url, { credentials: "include", headers });
          if (r.ok) {
            const data = await r.json();
            const list = data?.items || data?.tasks || data?.data || data?.results || (Array.isArray(data) ? data : []);
            if (Array.isArray(list)) {
              for (const item of list) {
                const id = item?.id || item?.task_id || item?.conversation_id;
                const title = (item?.title || item?.name || item?.prompt || "").trim();
                if (id && title) {
                  entries.push({ id: String(id), title: title.toLowerCase(), isTask: ep.isTask || String(id).startsWith("task_") });
                }
              }
            }
          }
        } catch (_) {
        }
      }
      cachedRemoteCatalog = { ts: now, accountId: currentAccountId, entries };
    }
    let match = cachedRemoteCatalog.entries.find((e) => e.isTask && e.title === normTitle) || cachedRemoteCatalog.entries.find((e) => e.title === normTitle);
    if (!match && isTruncatedDom && normTitle.length >= 20) {
      const prefixMatches = cachedRemoteCatalog.entries.filter((e) => e.isTask && e.title.startsWith(normTitle));
      if (prefixMatches.length === 1) {
        match = prefixMatches[0];
      }
    }
    if (match) {
      cachedRemoteCatalog.entries = cachedRemoteCatalog.entries.filter((e) => e.id !== match.id);
      return match;
    }
    return null;
  }
  async function deleteChatGptViaApi(targetId, row, isTask = false) {
    if (PLATFORM_KEY !== "chatgpt" || typeof fetch !== "function") return false;
    try {
      let token = await getChatGptToken();
      if (!token) return false;
      let effectiveId = targetId;
      let effectiveIsTask = isTask;
      if (typeof effectiveId === "string" && effectiveId.startsWith("task_cloud_")) {
        const resolved = await resolveChatGptIdByTitle(row, targetId, token);
        if (!resolved?.id) return false;
        effectiveId = resolved.id;
        effectiveIsTask = resolved.isTask;
      }
      const tryWithId = async (idToTry, tk) => {
        const runPrimary = () => effectiveIsTask ? deleteOrArchiveRemoteTaskApi(idToTry, tk) : hideChatGptConversation(idToTry, tk);
        const runSecondary = () => effectiveIsTask ? hideChatGptConversation(idToTry, tk) : deleteOrArchiveRemoteTaskApi(idToTry, tk);
        let r = await runPrimary();
        if (!r?.ok && r?.status !== 401) {
          const sec = await runSecondary();
          if (sec?.ok) r = sec;
        }
        return r;
      };
      let res = await tryWithId(effectiveId, token);
      if (res?.status === 401) {
        token = await getChatGptToken(true);
        if (!token) return false;
        res = await tryWithId(effectiveId, token);
      }
      if (!res?.ok) {
        const altId = getAlternateChatGptId(effectiveId);
        if (altId) {
          const altRes = await tryWithId(altId, token);
          if (altRes?.ok) res = altRes;
        }
      }
      if (res?.ok) {
        await removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        return true;
      }
    } catch (_) {
    }
    return false;
  }
  async function deleteSingleConversation(targetId) {
    const found = findRowById(targetId);
    const row = found?.row || null;
    const link = found?.link || null;
    const isTask = isRemoteTask(targetId, link, row);
    if (PLATFORM_KEY === "chatgpt") {
      const apiOk = await deleteChatGptViaApi(targetId, row, isTask);
      if (apiOk) return true;
    }
    if (!found) return false;
    row.scrollIntoView?.({ block: "center" });
    await sleep(180);
    try {
      const trigger = await pollUntil(() => findOptionsTrigger(row, link, isTask), 1200, 80);
      if (!trigger) {
        throw new Error("Options menu button not found.");
      }
      const triggerLabel = ((trigger.getAttribute?.("aria-label") || "") + " " + (trigger.getAttribute?.("title") || "") + " " + (trigger.getAttribute?.("data-testid") || "")).toLowerCase();
      const isDirectArchiveBtn = triggerLabel.includes("archiv") && !trigger.getAttribute?.("aria-haspopup");
      realClick(trigger);
      if (isDirectArchiveBtn) {
        await sleep(300);
        await removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        return true;
      }
      const menu = await pollUntil(
        () => Array.from(document.querySelectorAll(SELECTORS.menuPanel)).find(isActiveOverlay),
        2200
      );
      if (!menu) {
        if (isTask) {
          await sleep(300);
          await removeDeletedRowFromDOM(row, targetId);
          cleanupEmptySidebarItems();
          return true;
        }
        throw new Error("Menu did not open.");
      }
      await sleep(180);
      const menuItems = Array.from(menu.querySelectorAll(SELECTORS.deleteMenuItem));
      const allowArchiveMenu = Boolean(isTask);
      let deleteBtn = menuItems.find((el2) => {
        const txt = (el2.textContent || "").toLowerCase();
        const testId = (el2.getAttribute("data-testid") || "").toLowerCase();
        const cls = typeof el2.className === "string" ? el2.className.toLowerCase() : "";
        return testId.includes("delete") || cls.includes("text-danger") || cls.includes("text-token-text-error") || cls.includes("text-red") || txt.includes("eliminar") || txt.includes("delete") || txt.includes("borrar") || el2.querySelector('mat-icon[fonticon="delete"], mat-icon[data-mat-icon-name="delete"]');
      });
      if (!deleteBtn && allowArchiveMenu) {
        deleteBtn = menuItems.find((el2) => {
          const txt = (el2.textContent || "").toLowerCase();
          const testId = (el2.getAttribute("data-testid") || "").toLowerCase();
          return testId.includes("archive") || txt.includes("archivar") || txt.includes("archive");
        });
      }
      if (!deleteBtn) {
        throw new Error("Delete option not found.");
      }
      const isArchiveAction = allowArchiveMenu && ((deleteBtn.textContent || "").toLowerCase().includes("archiv") || (deleteBtn.getAttribute("data-testid") || "").toLowerCase().includes("archive"));
      realClick(deleteBtn);
      const dialog = await pollUntil(
        () => Array.from(document.querySelectorAll(SELECTORS.confirmDialog)).find(isActiveOverlay),
        isArchiveAction ? 1e3 : 2200
      );
      if (!dialog) {
        if (isArchiveAction) {
          await sleep(300);
          await removeDeletedRowFromDOM(row, targetId);
          cleanupEmptySidebarItems();
          return true;
        }
        throw new Error("Confirm dialog did not appear.");
      }
      await sleep(200);
      let confirmBtn = dialog.querySelector(SELECTORS.confirmButton);
      if (!confirmBtn) {
        const dialogBtns = Array.from(dialog.querySelectorAll("button"));
        confirmBtn = dialogBtns.find((b) => {
          const txt = (b.textContent || "").trim().toLowerCase();
          return txt === "eliminar" || txt === "delete" || txt === "borrar" || isTask && (txt.includes("archivar") || txt.includes("archive") || txt.includes("detener") || txt.includes("stop"));
        });
        if (!confirmBtn && dialogBtns.length === 2 && !dialog.querySelector("input, textarea")) {
          confirmBtn = dialogBtns[1];
        }
      }
      if (!confirmBtn) {
        throw new Error("Confirm button not found.");
      }
      realClick(confirmBtn);
      await pollUntil(() => !isActiveOverlay(dialog), 4e3);
      await sleep(PLATFORM_KEY === "chatgpt" ? 450 : 350);
      await removeDeletedRowFromDOM(row, targetId);
      cleanupEmptySidebarItems();
      return true;
    } catch (domErr) {
      if (PLATFORM_KEY === "chatgpt") {
        document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
        const apiOk = await deleteChatGptViaApi(targetId, row, isTask);
        if (apiOk) {
          await removeDeletedRowFromDOM(row, targetId);
          cleanupEmptySidebarItems();
          return true;
        }
      }
      throw domErr;
    }
  }
  async function deleteSelectedChats() {
    const allSelectedIds = Array.from(selectedMap.keys());
    if (allSelectedIds.length === 0 || state.deletionInProgress) return;
    const queueIds = allSelectedIds.filter((id) => !state.folderState.protectedIds[id]);
    const skippedProtected = allSelectedIds.length - queueIds.length;
    if (queueIds.length === 0) {
      updateStatusToast(t().toastAllProtected, null, null, 3500);
      return;
    }
    const confirmed = await showConfirmModal(queueIds.length, skippedProtected);
    if (!confirmed) return;
    state.deletionInProgress = true;
    state.deletionStopRequested = false;
    state.autoSelectAllMode = false;
    if (state.autoScrollActive) state.autoScrollActive = false;
    document.body.classList.add("gcm-stealth-delete");
    updateToolbarState();
    const total = queueIds.length;
    let deletedCount = 0;
    let errorCount = 0;
    let stateModified = false;
    const actuallyDeletedIds = [];
    try {
      for (let i = 0; i < queueIds.length; i++) {
        if (state.deletionStopRequested) break;
        const id = queueIds[i];
        updateStatusToast(t().toastDeletingProgress(i + 1, total), i, total);
        try {
          const ok = await deleteSingleConversation(id);
          if (ok) {
            deletedCount++;
            actuallyDeletedIds.push(id);
            selectedMap.delete(id);
            if (state.folderState.assignments[id]) {
              delete state.folderState.assignments[id];
              stateModified = true;
            }
          } else {
            errorCount++;
          }
        } catch (err) {
          console.warn("[Foldy] Error deleting conversation:", err);
          errorCount++;
          document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
          await sleep(400);
        }
      }
    } finally {
      if (stateModified) {
        saveFolderData(state.folderState);
      }
      document.body.classList.remove("gcm-stealth-delete");
      state.deletionInProgress = false;
      state.deletionStopRequested = false;
    }
    const selectAllCb = document.getElementById("gcm-select-all");
    if (selectAllCb) selectAllCb.checked = false;
    cleanupEmptySidebarItems();
    refreshUI();
    checkRedirectIfActiveChatDeleted(actuallyDeletedIds);
    const summary = errorCount > 0 ? t().toastDeleteFinishedErr(deletedCount, errorCount) : t().toastDeleteSuccess(deletedCount);
    updateStatusToast(summary, total, total, 4500);
  }
  function stopDeletion() {
    state.deletionStopRequested = true;
    updateStatusToast(t().toastStopping, null, null, 2500);
  }

  // src/markdown-export.js
  function exportSelectedConversationsToMarkdown() {
    const items = getConversationRows();
    const selectedIds = Array.from(selectedMap.keys());
    const folderLookup = new Map(state.folderState.folders.map((f) => [f.id, f.name]));
    let markdown = `# ${t().mdHeader}
`;
    markdown += `${t().mdDate}: ${(/* @__PURE__ */ new Date()).toLocaleString()}

`;
    const allMessages = Array.from(document.querySelectorAll(SELECTORS.activeMessages));
    const messages = allMessages.filter((m) => !allMessages.some((o) => o !== m && o.contains(m)));
    if (selectedIds.length === 0 && messages.length === 0) {
      updateStatusToast(t().toastMdEmpty || t().toastMdExported, null, null, 2800);
      return false;
    }
    if (selectedIds.length > 0) {
      markdown += `## ${t().mdSelectedIndex(selectedIds.length)}

`;
      selectedIds.forEach((id, idx) => {
        const rowObj = items.find((it) => it.id === id);
        const fallbackTitle = selectedMap.get(id)?.title || id;
        const title = (rowObj?.title || fallbackTitle).replace(/[[\]\r\n]/g, " ").trim();
        const folderName = folderLookup.get(state.folderState.assignments[id]) || t().pillUnassigned;
        const isLocked = state.folderState.protectedIds[id] ? " 🔒" : "";
        markdown += `${idx + 1}. **[${title}](${P.buildUrl(id)})** — *${t().mdFolderLabel}: ${folderName}*${isLocked}
`;
      });
      markdown += `
---

`;
    }
    if (messages.length > 0) {
      markdown += `## ${t().mdActiveChatHeader}

`;
      messages.forEach((msg) => {
        const text = (msg.innerText || msg.textContent || "").trim();
        if (!text) return;
        const isUser = msg.getAttribute?.("data-message-author-role") === "user" || msg.tagName.toLowerCase().includes("user") || msg.classList.contains("query-text") || !!msg.querySelector?.('[data-message-author-role="user"]');
        markdown += `### ${isUser ? t().mdUser : `✨ ${P.name}`}

${text}

---

`;
      });
    }
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${PLATFORM_KEY}-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    updateStatusToast(t().toastMdExported, null, null, 3e3);
  }

  // src/toolbar.js
  function appendButtonWithKbd(btn, iconBuilder, labelText, kbdText = null) {
    setButtonIconText(btn, iconBuilder, labelText);
    if (kbdText) {
      const kbd = document.createElement("kbd");
      kbd.className = "gcm-kbd";
      kbd.textContent = kbdText;
      btn.appendChild(kbd);
    }
  }
  function createToolbarSeparator() {
    const sep = document.createElement("span");
    sep.className = "gcm-toolbar-sep";
    sep.setAttribute("aria-hidden", "true");
    return sep;
  }
  function createToolbar() {
    if (document.getElementById("gcm-toolbar")) return;
    const toolbar = document.createElement("div");
    toolbar.id = "gcm-toolbar";
    toolbar.dataset.gcmCount = "0";
    const headWrap = document.createElement("div");
    headWrap.className = "gcm-toolbar-head";
    const collapseBtn = document.createElement("button");
    collapseBtn.id = "gcm-toolbar-toggle";
    collapseBtn.className = "gcm-toolbar-toggle";
    collapseBtn.addEventListener("click", () => {
      if (state.toolbarJustDragged) return;
      state.toolbarCollapsed = !state.toolbarCollapsed;
      saveView();
      applyToolbarLayout();
    });
    const orientBtn = document.createElement("button");
    orientBtn.id = "gcm-toolbar-orient";
    orientBtn.className = "gcm-toolbar-toggle gcm-toolbar-orient";
    orientBtn.addEventListener("click", () => {
      if (state.toolbarJustDragged) return;
      state.toolbarVertical = !state.toolbarVertical;
      saveView();
      applyToolbarLayout();
    });
    headWrap.appendChild(collapseBtn);
    headWrap.appendChild(orientBtn);
    const selectAllWrap = document.createElement("label");
    selectAllWrap.className = "gcm-select-all-wrap";
    selectAllWrap.title = t().selectAllTitle;
    const selectAllCb = document.createElement("input");
    selectAllCb.type = "checkbox";
    selectAllCb.id = "gcm-select-all";
    selectAllCb.className = "gcm-checkbox";
    selectAllCb.style.margin = "0";
    selectAllCb.addEventListener("change", (e) => toggleSelectAll(e.target.checked));
    const selectAllText = document.createElement("span");
    selectAllText.textContent = t().selectAll;
    selectAllWrap.appendChild(selectAllCb);
    selectAllWrap.appendChild(selectAllText);
    const countBadgeWrap = document.createElement("div");
    countBadgeWrap.id = "gcm-selection-pill";
    countBadgeWrap.className = "gcm-selection-pill";
    const countNum = document.createElement("span");
    countNum.id = "gcm-selection-count";
    countNum.className = "gcm-selection-count-text";
    countNum.textContent = state.folderState.lang === "es" ? "0 seleccionados" : "0 selected";
    const clearSelBtn = document.createElement("button");
    clearSelBtn.type = "button";
    clearSelBtn.id = "gcm-clear-selection-btn";
    clearSelBtn.className = "gcm-selection-clear-btn";
    clearSelBtn.title = state.folderState.lang === "es" ? "Limpiar selección (Esc)" : "Clear selection (Esc)";
    clearSelBtn.appendChild(createIconElement(ICONS.close));
    clearSelBtn.addEventListener("click", () => toggleSelectAll(false));
    countBadgeWrap.appendChild(countNum);
    countBadgeWrap.appendChild(clearSelBtn);
    const folderBtn = document.createElement("button");
    folderBtn.id = "gcm-folder-btn";
    folderBtn.className = "gcm-btn gcm-btn-folder";
    folderBtn.disabled = true;
    folderBtn.dataset.label = t().folderBtn(0);
    folderBtn.dataset.lang = state.folderState.lang;
    appendButtonWithKbd(folderBtn, ICONS.folder, state.folderState.lang === "es" ? "Carpeta" : "Folder", "M");
    folderBtn.title = t().folderBtnTitle;
    folderBtn.addEventListener("click", () => toggleMoveToFolderPopover(folderBtn));
    const protectBtn = document.createElement("button");
    protectBtn.id = "gcm-protect-btn";
    protectBtn.className = "gcm-btn gcm-btn-neutral";
    protectBtn.disabled = true;
    protectBtn.dataset.lang = state.folderState.lang;
    appendButtonWithKbd(protectBtn, ICONS.lock, t().protectBtn, "L");
    protectBtn.title = t().protectBtnTitle;
    protectBtn.addEventListener("click", toggleProtectSelected);
    const exportBtn = document.createElement("button");
    exportBtn.id = "gcm-export-btn";
    exportBtn.className = "gcm-btn gcm-btn-neutral";
    setButtonIconText(exportBtn, ICONS.fileText, t().exportBtn);
    exportBtn.title = t().exportBtnTitle;
    exportBtn.addEventListener("click", exportSelectedConversationsToMarkdown);
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "gcm-delete-btn";
    deleteBtn.className = "gcm-btn gcm-btn-danger";
    deleteBtn.disabled = true;
    deleteBtn.dataset.label = t().deleteBtn(0);
    deleteBtn.dataset.lang = state.folderState.lang;
    appendButtonWithKbd(deleteBtn, ICONS.trash, state.folderState.lang === "es" ? "Borrar" : "Delete", "⌫");
    deleteBtn.addEventListener("click", deleteSelectedChats);
    const stopBtn = document.createElement("button");
    stopBtn.id = "gcm-stop-btn";
    stopBtn.className = "gcm-btn gcm-btn-stop";
    stopBtn.style.display = "none";
    setButtonIconText(stopBtn, ICONS.stop, t().stopBtn);
    stopBtn.addEventListener("click", stopDeletion);
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
    toolbar.classList.add("gcm-dragging");
    applyToolbarLayout();
    void toolbar.offsetWidth;
    requestAnimationFrame(() => toolbar.classList.remove("gcm-dragging"));
  }
  function applyToolbarLayout() {
    const toolbar = document.getElementById("gcm-toolbar");
    const collapseBtn = document.getElementById("gcm-toolbar-toggle");
    const orientBtn = document.getElementById("gcm-toolbar-orient");
    if (!toolbar || !collapseBtn) return;
    toolbar.classList.toggle("gcm-collapsed", state.toolbarCollapsed);
    toolbar.classList.toggle("gcm-vertical", !!state.toolbarVertical && !state.toolbarCollapsed);
    collapseBtn.textContent = "";
    collapseBtn.appendChild(createIconElement(state.toolbarCollapsed ? ICONS.menu : ICONS.chevronRight));
    const collapseTitle = state.toolbarCollapsed ? t().toolbarExpandTitle : t().toolbarCollapseTitle;
    collapseBtn.title = collapseTitle;
    collapseBtn.setAttribute("aria-label", collapseTitle);
    collapseBtn.setAttribute("aria-expanded", String(!state.toolbarCollapsed));
    if (orientBtn) {
      orientBtn.textContent = "";
      orientBtn.appendChild(createIconElement(state.toolbarVertical ? ICONS.layoutHorizontal : ICONS.layoutVertical));
      const orientTitle = state.toolbarVertical ? t().toolbarHorizontalTitle : t().toolbarVerticalTitle;
      orientBtn.title = orientTitle;
      orientBtn.setAttribute("aria-label", orientTitle);
      orientBtn.setAttribute("aria-expanded", String(!state.toolbarCollapsed));
    }
    clampToolbarPosition(toolbar);
  }
  function clampToolbarPosition(toolbar) {
    const pos = state.folderState.toolbarPos;
    if (!toolbar || !toolbar.isConnected || !pos) return;
    const rect = toolbar.getBoundingClientRect();
    const left = Math.min(Math.max(6, pos.left), Math.max(6, window.innerWidth - rect.width - 6));
    const top = Math.min(Math.max(6, pos.top), Math.max(6, window.innerHeight - rect.height - 6));
    toolbar.style.setProperty("left", `${left}px`, "important");
    toolbar.style.setProperty("top", `${top}px`, "important");
    toolbar.style.setProperty("right", "auto", "important");
    toolbar.style.setProperty("bottom", "auto", "important");
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
    toolbar.addEventListener(
      "click",
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
      toolbar.style.setProperty("left", `${left}px`, "important");
      toolbar.style.setProperty("top", `${top}px`, "important");
      toolbar.style.setProperty("right", "auto", "important");
      toolbar.style.setProperty("bottom", "auto", "important");
      state.folderState.toolbarPos = { left, top };
    };
    const onMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging = true;
        toolbar.classList.add("gcm-dragging");
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
      document.removeEventListener("pointermove", onMove, true);
      document.removeEventListener("pointerup", onEnd, true);
      document.removeEventListener("pointercancel", onEnd, true);
      if (dragging) {
        dragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          applyDrag();
        }
        toolbar.classList.remove("gcm-dragging");
        saveFolderData(state.folderState);
        state.toolbarJustDragged = true;
        setTimeout(() => {
          state.toolbarJustDragged = false;
        }, 40);
      }
    };
    toolbar.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      const rect = toolbar.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      originLeft = rect.left;
      originTop = rect.top;
      dragging = false;
      document.addEventListener("pointermove", onMove, true);
      document.addEventListener("pointerup", onEnd, true);
      document.addEventListener("pointercancel", onEnd, true);
    });
  }
  function updateToolbarState() {
    const toolbar = document.getElementById("gcm-toolbar");
    const countNum = document.getElementById("gcm-selection-count");
    const clearSelBtn = document.getElementById("gcm-clear-selection-btn");
    const folderBtn = document.getElementById("gcm-folder-btn");
    const protectBtn = document.getElementById("gcm-protect-btn");
    const exportBtn = document.getElementById("gcm-export-btn");
    const deleteBtn = document.getElementById("gcm-delete-btn");
    const stopBtn = document.getElementById("gcm-stop-btn");
    const selectAllCb = document.getElementById("gcm-select-all");
    if (!deleteBtn || !stopBtn || !folderBtn) return;
    const count = selectedMap.size;
    const isEs = state.folderState.lang === "es";
    document.documentElement.toggleAttribute("data-gcm-selection-mode", count > 0);
    if (toolbar) {
      toolbar.dataset.gcmCount = String(count);
      toolbar.classList.toggle("gcm-has-selection", count > 0 || state.deletionInProgress);
    }
    if (countNum) {
      countNum.textContent = isEs ? `${count} seleccionado${count === 1 ? "" : "s"}` : `${count} selected`;
    }
    if (clearSelBtn) {
      clearSelBtn.title = isEs ? "Limpiar selección (Esc)" : "Clear selection (Esc)";
    }
    if (state.deletionInProgress) {
      folderBtn.style.display = "none";
      if (protectBtn) protectBtn.style.display = "none";
      if (exportBtn) exportBtn.style.display = "none";
      deleteBtn.style.display = "none";
      stopBtn.style.display = "inline-flex";
      if (selectAllCb) selectAllCb.disabled = true;
    } else {
      folderBtn.style.display = "inline-flex";
      if (protectBtn) protectBtn.style.display = "inline-flex";
      if (exportBtn) exportBtn.style.display = "inline-flex";
      deleteBtn.style.display = "inline-flex";
      stopBtn.style.display = "none";
      if (selectAllCb) selectAllCb.disabled = false;
      if (selectAllCb) {
        const rowCbs = document.querySelectorAll(".gcm-chat-row .gcm-checkbox:not(#gcm-select-all)");
        let visibleTotal = 0;
        let visibleChecked = 0;
        rowCbs.forEach((cb) => {
          const r = cb.closest(".gcm-chat-row") || cb.parentElement;
          if (!r || r.classList.contains("gcm-hidden-by-filter")) return;
          visibleTotal++;
          if (selectedMap.has(cb.dataset.convId)) visibleChecked++;
        });
        const allChecked = visibleTotal > 0 && visibleChecked === visibleTotal;
        if (selectAllCb.checked !== allChecked) selectAllCb.checked = allChecked;
        selectAllCb.classList.toggle("gcm-checked", allChecked);
        selectAllCb.indeterminate = visibleChecked > 0 && !allChecked;
      }
      folderBtn.disabled = count === 0;
      const fText = t().folderBtn(count);
      if (folderBtn.dataset.label !== fText || folderBtn.dataset.lang !== state.folderState.lang) {
        folderBtn.dataset.label = fText;
        folderBtn.dataset.lang = state.folderState.lang;
        appendButtonWithKbd(folderBtn, ICONS.folder, isEs ? "Carpeta" : "Folder", "M");
      }
      if (protectBtn) {
        protectBtn.disabled = count === 0;
        if (protectBtn.dataset.lang !== state.folderState.lang) {
          protectBtn.dataset.lang = state.folderState.lang;
          appendButtonWithKbd(protectBtn, ICONS.lock, t().protectBtn, "L");
        }
      }
      deleteBtn.disabled = count === 0;
      const dText = t().deleteBtn(count);
      if (deleteBtn.dataset.label !== dText || deleteBtn.dataset.lang !== state.folderState.lang) {
        deleteBtn.dataset.label = dText;
        deleteBtn.dataset.lang = state.folderState.lang;
        appendButtonWithKbd(deleteBtn, ICONS.trash, isEs ? "Borrar" : "Delete", "⌫");
      }
    }
  }

  // src/selection.js
  function toggleProtectSelected() {
    const ids = Array.from(selectedMap.keys());
    if (ids.length === 0) return;
    const allAlreadyProtected = ids.every((id) => !!state.folderState.protectedIds[id]);
    ids.forEach((id) => {
      if (allAlreadyProtected) {
        delete state.folderState.protectedIds[id];
      } else {
        state.folderState.protectedIds[id] = true;
      }
    });
    saveFolderData(state.folderState);
    clearAllSelections();
    refreshUI();
    updateStatusToast(
      allAlreadyProtected ? t().toastUnprotected(ids.length) : t().toastProtected(ids.length),
      null,
      null,
      3e3
    );
  }
  function clearAllSelections() {
    state.autoSelectAllMode = false;
    selectedMap.clear();
    const sidebar = getSidebarElement() || document;
    sidebar.querySelectorAll(".gcm-checkbox").forEach((cb) => {
      cb.checked = false;
      cb.classList.remove("gcm-checked");
    });
    sidebar.querySelectorAll(".gcm-chat-row.gcm-selected").forEach((r) => r.classList.remove("gcm-selected"));
    const selectAllCb = document.getElementById("gcm-select-all");
    if (selectAllCb) {
      selectAllCb.checked = false;
      selectAllCb.classList.remove("gcm-checked");
    }
  }
  function toggleMoveToFolderPopover(anchorBtn) {
    const existing = document.getElementById("gcm-folder-popover");
    if (existing) {
      existing.remove();
      return;
    }
    const rect = anchorBtn.getBoundingClientRect();
    const popover = document.createElement("div");
    popover.id = "gcm-folder-popover";
    popover.setAttribute("role", "menu");
    popover.style.top = `${rect.bottom + 8}px`;
    popover.style.left = `${Math.max(12, rect.left - 30)}px`;
    const closePopover = () => {
      popover.remove();
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEsc);
    };
    state.folderState.folders.forEach((f) => {
      const item = document.createElement("button");
      item.className = "gcm-popover-item";
      item.setAttribute("role", "menuitem");
      const dot = document.createElement("span");
      dot.className = "gcm-folder-dot";
      dot.style.backgroundColor = f.color;
      dot.style.color = f.color;
      const txt = document.createElement("span");
      txt.textContent = f.name;
      item.appendChild(dot);
      item.appendChild(txt);
      item.addEventListener("click", () => {
        assignSelectedToFolder(f.id);
        closePopover();
      });
      popover.appendChild(item);
    });
    const divider = document.createElement("div");
    divider.className = "gcm-popover-divider";
    popover.appendChild(divider);
    const removeBtn = document.createElement("button");
    removeBtn.className = "gcm-popover-item";
    removeBtn.setAttribute("role", "menuitem");
    setButtonIconText(removeBtn, ICONS.folderMinus, t().removeFromFolder);
    removeBtn.addEventListener("click", () => {
      assignSelectedToFolder(null);
      closePopover();
    });
    popover.appendChild(removeBtn);
    const createNewBtn = document.createElement("button");
    createNewBtn.className = "gcm-popover-item gcm-popover-item-accent";
    createNewBtn.setAttribute("role", "menuitem");
    setButtonIconText(createNewBtn, ICONS.folderPlus, t().createNewFolderMenu);
    createNewBtn.addEventListener("click", () => {
      closePopover();
      openCreateFolderModal((newFolder) => {
        assignSelectedToFolder(newFolder.id);
      });
    });
    popover.appendChild(createNewBtn);
    document.body.appendChild(popover);
    const popRect = popover.getBoundingClientRect();
    const clampedLeft = Math.min(Math.max(12, rect.left - 30), Math.max(12, window.innerWidth - popRect.width - 12));
    const preferTop = rect.bottom + 8 + popRect.height > window.innerHeight - 12 && rect.top - popRect.height - 8 >= 12 ? rect.top - popRect.height - 8 : Math.min(rect.bottom + 8, Math.max(12, window.innerHeight - popRect.height - 12));
    popover.style.left = `${clampedLeft}px`;
    popover.style.top = `${preferTop}px`;
    const closeOnOutside = (e) => {
      if (!popover.contains(e.target) && e.target !== anchorBtn) {
        closePopover();
      }
    };
    const closeOnEsc = (e) => {
      if (e.key === "Escape") {
        closePopover();
      }
    };
    document.addEventListener("keydown", closeOnEsc);
    setTimeout(() => document.addEventListener("mousedown", closeOnOutside), 20);
  }
  function assignSelectedToFolder(folderId) {
    const ids = Array.from(selectedMap.keys());
    if (ids.length === 0) return;
    ids.forEach((convId) => {
      if (folderId) {
        state.folderState.assignments[convId] = folderId;
      } else {
        delete state.folderState.assignments[convId];
      }
    });
    saveFolderData(state.folderState);
    clearAllSelections();
    refreshUI();
    updateStatusToast(
      folderId ? t().toastMovedToFolder(ids.length) : t().toastRemovedFromFolder(ids.length),
      null,
      null,
      2500
    );
  }
  function assignChatToFolderWithUndo(convId, nextFolderId, onUndo = null) {
    if (!convId) return false;
    const normalizedNext = nextFolderId || null;
    const prevFolderId = state.folderState.assignments[convId] ?? null;
    if (prevFolderId === normalizedNext) return false;
    if (normalizedNext) {
      state.folderState.assignments[convId] = normalizedNext;
    } else {
      delete state.folderState.assignments[convId];
    }
    saveFolderData(state.folderState);
    refreshUI();
    const message = normalizedNext ? t().toastMovedToFolder(1) : t().toastRemovedFromFolder(1);
    showUndoToast(message, () => {
      if (prevFolderId) {
        state.folderState.assignments[convId] = prevFolderId;
      } else {
        delete state.folderState.assignments[convId];
      }
      saveFolderData(state.folderState);
      refreshUI();
      onUndo?.(convId, prevFolderId);
      updateStatusToast(
        t().toastAssignmentUndone ?? (state.folderState.lang === "es" ? "↩️ Asignación revertida." : "↩️ Assignment reverted."),
        null,
        null,
        2500
      );
    });
    return true;
  }
  var activeUndoController = null;
  var activeUndoTimer = null;
  function showUndoToast(message, onUndo, durationMs = 5e3) {
    activeUndoController?.abort();
    if (activeUndoTimer) {
      clearTimeout(activeUndoTimer);
      activeUndoTimer = null;
    }
    document.querySelectorAll(".gcm-toast-undo").forEach((el2) => el2.remove());
    const controller = new AbortController();
    activeUndoController = controller;
    const { signal } = controller;
    const toast = document.createElement("div");
    toast.className = "gcm-toast-undo";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    const msgEl = document.createElement("span");
    msgEl.className = "gcm-toast-undo-msg";
    msgEl.textContent = message;
    const undoBtn = document.createElement("button");
    undoBtn.type = "button";
    undoBtn.className = "gcm-toast-undo-btn";
    undoBtn.textContent = t().undoBtn ?? (state.folderState.lang === "es" ? "Deshacer" : "Undo");
    const progress = document.createElement("div");
    progress.className = "gcm-toast-progress";
    const dismiss = () => {
      controller.abort();
      if (activeUndoTimer) {
        clearTimeout(activeUndoTimer);
        activeUndoTimer = null;
      }
      if (activeUndoController === controller) activeUndoController = null;
      toast.remove();
    };
    undoBtn.addEventListener(
      "click",
      () => {
        dismiss();
        onUndo?.();
      },
      { signal }
    );
    toast.append(msgEl, undoBtn, progress);
    document.body.appendChild(toast);
    activeUndoTimer = setTimeout(dismiss, durationMs);
  }
  var activeDragConvId = null;
  var getDraggingConvId = () => activeDragConvId;
  var delegatedListenerController = null;
  function setupDelegatedSidebarListener() {
    if (state.delegatedListenerAttached) return;
    state.delegatedListenerAttached = true;
    delegatedListenerController?.abort();
    delegatedListenerController = new AbortController();
    const { signal } = delegatedListenerController;
    const stopPressOnControls = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.classList.contains("gcm-checkbox") || target.closest(".gcm-lock-icon")) {
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
        if (e.type === "mousedown" && target.id !== "gcm-select-all") {
          e.preventDefault();
        }
      }
    };
    document.addEventListener("pointerdown", stopPressOnControls, { capture: true, signal });
    document.addEventListener("mousedown", stopPressOnControls, { capture: true, signal });
    document.addEventListener("pointerup", stopPressOnControls, { capture: true, signal });
    document.addEventListener("mouseup", stopPressOnControls, { capture: true, signal });
    document.addEventListener(
      "dragstart",
      (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (target.closest("input, button, .gcm-checkbox, .gcm-lock-icon")) {
          e.preventDefault();
          return;
        }
        const row = target.closest(".gcm-chat-row");
        const convId = row?.dataset?.gcmConvId ?? row?.querySelector(".gcm-checkbox")?.dataset?.convId;
        if (!row || !convId) return;
        activeDragConvId = convId;
        row.classList.add("gcm-dragging");
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("application/x-gcm-conv-id", convId);
          e.dataTransfer.setData("text/plain", convId);
        }
      },
      { capture: true, signal }
    );
    document.addEventListener(
      "dragend",
      () => {
        activeDragConvId = null;
        document.querySelectorAll(".gcm-chat-row.gcm-dragging").forEach((el2) => el2.classList.remove("gcm-dragging"));
        document.querySelectorAll(".gcm-folder-pill.gcm-drop-active").forEach((el2) => el2.classList.remove("gcm-drop-active"));
      },
      { capture: true, signal }
    );
    document.addEventListener(
      "click",
      (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        const lockTarget = target.closest(".gcm-lock-icon");
        if (lockTarget) {
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          e.preventDefault();
          const id = lockTarget.dataset.convId;
          if (id) {
            delete state.folderState.protectedIds[id];
            saveFolderData(state.folderState);
            refreshUI();
            updateStatusToast(t().toastUnprotected(1), null, null, 2500);
          }
          return;
        }
        if (target.classList.contains("gcm-checkbox") && target.id !== "gcm-select-all") {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          const checkbox = target;
          const id = checkbox.dataset.convId;
          const row = checkbox.closest(".gcm-chat-row") || checkbox.parentElement;
          if (!id || !row) return;
          const willBeChecked = !selectedMap.has(id);
          if (!willBeChecked) {
            state.autoSelectAllMode = false;
            if (state.autoScrollActive) state.autoScrollActive = false;
          }
          const applyCbState = (cb, r, cbId, isChecked) => {
            cb.checked = isChecked;
            cb.classList.toggle("gcm-checked", isChecked);
            if (isChecked) {
              selectedMap.set(cbId, { id: cbId, title: r.textContent?.trim() || cbId });
              r.classList.add("gcm-selected");
            } else {
              selectedMap.delete(cbId);
              r.classList.remove("gcm-selected");
            }
          };
          const sidebar = getSidebarElement() || document;
          const visibleCheckboxes = Array.from(
            sidebar.querySelectorAll(".gcm-checkbox:not(#gcm-select-all)")
          ).filter((cb) => {
            const r = cb.closest(".gcm-chat-row") || cb.parentElement;
            return r && !r.classList.contains("gcm-hidden-by-filter");
          });
          const anchorId = state.lastCheckedConvId || state.lastCheckedCheckbox?.dataset?.convId;
          if (e.shiftKey && anchorId && anchorId !== id) {
            const start = visibleCheckboxes.findIndex((cb) => cb.dataset.convId === anchorId);
            const end = visibleCheckboxes.findIndex((cb) => cb === checkbox || cb.dataset.convId === id);
            if (start !== -1 && end !== -1) {
              const [low, high] = [Math.min(start, end), Math.max(start, end)];
              for (let i = low; i <= high; i++) {
                const cb = visibleCheckboxes[i];
                const cbId = cb.dataset.convId;
                const cbRow = cb.closest(".gcm-chat-row") || cb.parentElement;
                if (cbId && cbRow) {
                  applyCbState(cb, cbRow, cbId, willBeChecked);
                }
              }
            } else {
              applyCbState(checkbox, row, id, willBeChecked);
            }
          } else {
            applyCbState(checkbox, row, id, willBeChecked);
          }
          const syncNativeChecked = () => {
            visibleCheckboxes.forEach((cb) => {
              const cbId = cb.dataset.convId;
              if (cbId) {
                const st = selectedMap.has(cbId);
                cb.checked = st;
                cb.classList.toggle("gcm-checked", st);
              }
            });
          };
          if (typeof queueMicrotask === "function") queueMicrotask(syncNativeChecked);
          setTimeout(syncNativeChecked, 0);
          state.lastCheckedCheckbox = checkbox;
          state.lastCheckedConvId = id;
          updateToolbarState();
        }
      },
      { capture: true, signal }
    );
  }
  function injectCheckboxes(items) {
    for (let i = 0; i < items.length; i++) {
      const { id, row, title } = items[i];
      if (!row.classList.contains("gcm-chat-row")) {
        row.classList.add("gcm-chat-row");
      }
      if (!row.draggable) {
        row.draggable = true;
      }
      if (row.dataset.gcmConvId !== id) {
        row.dataset.gcmConvId = id;
      }
      if (state.autoSelectAllMode && !row.classList.contains("gcm-hidden-by-filter") && !selectedMap.has(id)) {
        selectedMap.set(id, { id, title: title || row.textContent?.trim() || id });
      }
      const isSelected = selectedMap.has(id);
      const existingCb = row.querySelector(".gcm-checkbox");
      if (existingCb) {
        if (existingCb.dataset.convId !== id) existingCb.dataset.convId = id;
        if (existingCb.checked !== isSelected) existingCb.checked = isSelected;
        existingCb.classList.toggle("gcm-checked", isSelected);
        row.classList.toggle("gcm-selected", isSelected);
        continue;
      }
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "gcm-checkbox" + (isSelected ? " gcm-checked" : "");
      checkbox.title = t().checkboxTitle;
      checkbox.dataset.convId = id;
      checkbox.checked = isSelected;
      row.classList.toggle("gcm-selected", isSelected);
      row.prepend(checkbox);
    }
  }
  function toggleSelectAll(checked) {
    if (!checked) {
      clearAllSelections();
      updateToolbarState();
      if (state.autoScrollActive) {
        state.autoScrollActive = false;
        refreshUI();
      }
      return;
    }
    state.autoSelectAllMode = true;
    const selectAllCb = document.getElementById("gcm-select-all");
    if (selectAllCb) {
      selectAllCb.checked = true;
      selectAllCb.classList.add("gcm-checked");
    }
    const sidebar = getSidebarElement() || document;
    const checkboxes = Array.from(sidebar.querySelectorAll(".gcm-checkbox:not(#gcm-select-all)")).filter((cb) => {
      const r = cb.closest(".gcm-chat-row") || cb.parentElement;
      return r && !r.classList.contains("gcm-hidden-by-filter");
    });
    checkboxes.forEach((cb) => {
      cb.checked = true;
      cb.classList.add("gcm-checked");
      const id = cb.dataset.convId;
      const row = cb.closest(".gcm-chat-row") || cb.parentElement;
      if (id && row) {
        selectedMap.set(id, { id, title: row.textContent?.trim() || id });
        row.classList.add("gcm-selected");
      }
    });
    updateToolbarState();
    if (!state.autoScrollActive) {
      toggleAutoScrollHistory({ silent: true });
    }
  }

  // src/panel.js
  function setAppLanguage(nextLang) {
    const normalized = nextLang === "en" || nextLang === "es" ? nextLang : state.folderState.lang === "es" ? "en" : "es";
    if (state.folderState.lang === normalized) return;
    state.folderState.lang = normalized;
    saveFolderData(state.folderState);
    document.getElementById("gcm-toolbar")?.remove();
    document.getElementById("gcm-folders-box")?.remove();
    document.getElementById("gcm-folder-popover")?.remove();
    refreshUI();
  }
  function injectSidebarFoldersPanel(items) {
    let box = document.getElementById("gcm-folders-box");
    if (!box) {
      box = document.createElement("div");
      box.id = "gcm-folders-box";
      document.body.appendChild(box);
      buildFoldersPanelDOM(box);
      box.classList.add("gcm-dragging");
      clampBoxPosition(box);
      void box.offsetWidth;
      requestAnimationFrame(() => box.classList.remove("gcm-dragging"));
    }
    const isMin = box.classList.contains("gcm-minimized");
    if (state.folderState.minimized && !isMin) {
      box.classList.add("gcm-minimized");
      clampBoxPosition(box);
    } else if (!state.folderState.minimized && isMin) {
      box.classList.remove("gcm-minimized");
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
      if (fId && counts[fId] !== void 0) {
        counts[fId]++;
      } else {
        counts.UNASSIGNED++;
      }
      if (state.folderState.protectedIds[id]) {
        counts.PROTECTED++;
      }
    }
    const pillsContainer = document.getElementById("gcm-pills-container");
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
      createFolderPill({ id: "ALL", name: t().pillAll, color: null, count: counts.ALL, deletable: false })
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
    if (counts.PROTECTED > 0 || state.activeFolderFilter === "PROTECTED") {
      frag.appendChild(
        createFolderPill({ id: "PROTECTED", name: t().pillProtected, color: "#fbbc04", count: counts.PROTECTED, deletable: false })
      );
    }
    frag.appendChild(
      createFolderPill({ id: "UNASSIGNED", name: t().pillUnassigned, color: "#8e918f", count: counts.UNASSIGNED, deletable: false })
    );
    pillsContainer.textContent = "";
    pillsContainer.appendChild(frag);
    const sortBtn = document.getElementById("gcm-sort-btn");
    if (sortBtn) {
      const sortLabel = state.sortMode === "DEFAULT" ? t().sortRecent : state.sortMode === "AZ" ? t().sortAZ : t().sortZA;
      setButtonIconText(sortBtn, ICONS.sort, sortLabel);
    }
    const scrollBtn = document.getElementById("gcm-autoscroll-btn");
    if (scrollBtn) {
      if (state.autoScrollActive) {
        scrollBtn.classList.add("active");
        setButtonIconText(scrollBtn, ICONS.stop, t().stopLoadBtn);
      } else {
        scrollBtn.classList.remove("active");
        setButtonIconText(scrollBtn, ICONS.chevronsDown, t().loadAllBtn);
      }
    }
  }
  function clampBoxPosition(box) {
    const pos = state.folderState.pos;
    if (!box || !box.isConnected || !pos) return;
    const rect = box.getBoundingClientRect();
    const left = Math.min(Math.max(0, pos.left), Math.max(0, window.innerWidth - rect.width));
    const bottom = Math.min(Math.max(0, pos.bottom), Math.max(0, window.innerHeight - rect.height));
    box.style.setProperty("left", `${left}px`, "important");
    box.style.setProperty("bottom", `${bottom}px`, "important");
    box.style.setProperty("top", "auto", "important");
  }
  function enablePanelDrag(box, handle) {
    const DRAG_THRESHOLD = 4;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;
    let dragging = false;
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
      box.style.setProperty("left", `${left}px`, "important");
      box.style.setProperty("bottom", `${bottom}px`, "important");
      box.style.setProperty("top", "auto", "important");
      state.folderState.pos = { left, bottom };
    };
    const onMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging = true;
        box.classList.add("gcm-dragging");
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
      document.removeEventListener("pointermove", onMove, true);
      document.removeEventListener("pointerup", onEnd, true);
      document.removeEventListener("pointercancel", onEnd, true);
      if (dragging) {
        dragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          applyDrag();
        }
        box.classList.remove("gcm-dragging");
        saveFolderData(state.folderState);
        state.panelJustDragged = true;
        setTimeout(() => {
          state.panelJustDragged = false;
        }, 0);
      }
    };
    handle.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest("button")) return;
      const rect = box.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      originLeft = rect.left;
      originTop = rect.top;
      dragging = false;
      document.addEventListener("pointermove", onMove, true);
      document.addEventListener("pointerup", onEnd, true);
      document.addEventListener("pointercancel", onEnd, true);
    });
  }
  function registerGlobalListeners() {
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
        state.activeFolderFilter = "ALL";
      }
      autoClassifiedVisited.clear();
      if (langChanged) {
        document.getElementById("gcm-toolbar")?.remove();
        document.getElementById("gcm-folders-box")?.remove();
      } else {
        const box = document.getElementById("gcm-folders-box");
        if (box) {
          box.classList.toggle("gcm-minimized", state.folderState.minimized);
          clampBoxPosition(box);
        }
        applyToolbarLayout();
        const pills = document.getElementById("gcm-pills-container");
        if (pills) delete pills.dataset.sig;
      }
      refreshUI();
    };
    window.addEventListener("storage", (e) => {
      if (e.key !== P.storageKey || !e.newValue) return;
      try {
        const incoming = normalizeStoredState(JSON.parse(e.newValue), state.folderState.lang);
        applyExternalState(incoming);
      } catch (_) {
      }
    });
    initCloudSync(
      () => state.folderState,
      (merged) => applyExternalState(merged)
    );
    document.addEventListener("keydown", (e) => {
      if (!e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return;
      const key = (e.key || "").toUpperCase();
      const code = e.code || "";
      if (key === "F" || code === "KeyF") {
        e.preventDefault();
        state.folderState.minimized = !state.folderState.minimized;
        saveFolderData(state.folderState);
        refreshUI();
      } else if (key === "S" || code === "KeyS") {
        e.preventDefault();
        if (state.folderState.minimized) {
          state.folderState.minimized = false;
          saveFolderData(state.folderState);
          refreshUI();
        }
        const input = document.getElementById("gcm-search-input") ?? document.querySelector("#gcm-folders-box .gcm-search-input");
        input?.focus();
        input?.select();
      }
    });
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.onMessage?.addListener) {
        chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
          if (!msg || typeof msg.action !== "string") return;
          if (msg.action === "TOGGLE_PANEL") {
            state.folderState.minimized = !state.folderState.minimized;
            saveFolderData(state.folderState);
            refreshUI();
            sendResponse?.({ ok: true, minimized: state.folderState.minimized });
          } else if (msg.action === "OPEN_PROMPTS") {
            openPromptsModal();
            sendResponse?.({ ok: true });
          } else if (msg.action === "EXPORT_BACKUP") {
            exportBackupConfig();
            sendResponse?.({ ok: true });
          } else if (msg.action === "IMPORT_BACKUP") {
            importBackupConfig(msg.rawJson);
            sendResponse?.({ ok: true });
          } else if (msg.action === "SET_LANG" || msg.action === "TOGGLE_LANG") {
            setAppLanguage(msg.lang);
            sendResponse?.({ ok: true, lang: state.folderState.lang });
          } else if (msg.action === "GET_STATE") {
            sendResponse?.({ ok: true, lang: state.folderState.lang, minimized: state.folderState.minimized });
          }
        });
      }
    } catch (_) {
    }
    window.addEventListener("resize", () => {
      clampBoxPosition(document.getElementById("gcm-folders-box"));
      clampToolbarPosition(document.getElementById("gcm-toolbar"));
    });
  }
  function buildFoldersPanelDOM(box) {
    box.textContent = "";
    const header = document.createElement("div");
    header.className = "gcm-folders-header";
    const title = document.createElement("span");
    title.style.display = "inline-flex";
    title.style.alignItems = "center";
    title.style.gap = "7px";
    title.appendChild(createIconElement(ICONS.foldyLogo));
    const titleText = document.createElement("span");
    titleText.textContent = t().panelTitle;
    title.appendChild(titleText);
    title.title = t().toggleMinTitle;
    title.addEventListener("click", () => {
      if (state.panelJustDragged) return;
      state.folderState.minimized = !state.folderState.minimized;
      saveFolderData(state.folderState);
      refreshUI();
    });
    const headerActions = document.createElement("div");
    headerActions.className = "gcm-header-actions";
    const addBtn = document.createElement("button");
    addBtn.className = "gcm-add-folder-btn";
    setButtonIconText(addBtn, ICONS.folderPlus, t().newFolderBtn);
    addBtn.title = t().newFolderTitle;
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCreateFolderModal();
    });
    const minBtn = document.createElement("button");
    minBtn.className = "gcm-mini-btn gcm-mini-icon-btn";
    minBtn.appendChild(createIconElement(ICONS.minus));
    minBtn.title = t().toggleMinTitle;
    minBtn.addEventListener("click", (e) => {
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
    const body = document.createElement("div");
    body.className = "gcm-folders-body";
    const searchRow = document.createElement("div");
    searchRow.className = "gcm-search-sort-row";
    const searchWrap = document.createElement("div");
    searchWrap.className = "gcm-search-wrap";
    const searchIcon = createIconElement(ICONS.search);
    searchIcon.classList.add("gcm-search-lead-icon");
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "gcm-search-input";
    searchInput.className = "gcm-search-input";
    searchInput.placeholder = t().searchPlaceholder;
    searchInput.setAttribute("aria-label", t().searchPlaceholder);
    searchInput.value = state.searchQuery;
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "gcm-search-clear";
    clearBtn.appendChild(createIconElement(ICONS.close));
    clearBtn.title = t().searchClearTitle;
    clearBtn.style.display = state.searchQuery ? "inline-flex" : "none";
    const applySearchFilter = () => {
      const items = getConversationRows();
      applyFolderBadgesAndFilter(items);
      updateEmptyState(items, pillsContainer);
    };
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      clearBtn.style.display = state.searchQuery ? "inline-flex" : "none";
      applySearchFilter();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.searchQuery) {
        e.stopPropagation();
        state.searchQuery = "";
        searchInput.value = "";
        clearBtn.style.display = "none";
        applySearchFilter();
      }
    });
    clearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      searchInput.value = "";
      clearBtn.style.display = "none";
      applySearchFilter();
      searchInput.focus();
    });
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);
    searchWrap.appendChild(clearBtn);
    const sortBtn = document.createElement("button");
    sortBtn.id = "gcm-sort-btn";
    sortBtn.className = "gcm-sort-btn";
    sortBtn.title = t().sortTitle;
    setButtonIconText(sortBtn, ICONS.sort, t().sortRecent);
    sortBtn.addEventListener("click", () => {
      state.sortMode = state.sortMode === "DEFAULT" ? "AZ" : state.sortMode === "AZ" ? "ZA" : "DEFAULT";
      saveView();
      refreshUI();
    });
    searchRow.appendChild(searchWrap);
    searchRow.appendChild(sortBtn);
    const pillsContainer = document.createElement("div");
    pillsContainer.id = "gcm-pills-container";
    pillsContainer.className = "gcm-folders-pills";
    setupPillsDropZone(pillsContainer);
    const footer = document.createElement("div");
    footer.className = "gcm-panel-footer";
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "gcm-autoscroll-btn";
    scrollBtn.className = "gcm-footer-btn";
    setButtonIconText(scrollBtn, ICONS.chevronsDown, t().loadAllBtn);
    scrollBtn.title = t().loadAllTitle;
    scrollBtn.addEventListener("click", () => toggleAutoScrollHistory({ silent: false }));
    const promptsBtn = document.createElement("button");
    promptsBtn.id = "gcm-prompts-btn";
    promptsBtn.className = "gcm-footer-btn";
    setButtonIconText(promptsBtn, ICONS.zap, t().promptsBtn);
    promptsBtn.title = t().promptsBtnTitle;
    promptsBtn.addEventListener("click", openPromptsModal);
    footer.appendChild(scrollBtn);
    footer.appendChild(promptsBtn);
    body.appendChild(searchRow);
    body.appendChild(pillsContainer);
    body.appendChild(footer);
    box.appendChild(header);
    box.appendChild(body);
  }
  function updateEmptyState(items, pillsContainer) {
    let emptyBox = document.getElementById("gcm-empty-state");
    const visibleRowsCount = items.filter((it) => !it.row.classList.contains("gcm-hidden-by-filter")).length;
    const isFiltered = state.activeFolderFilter !== "ALL" || state.searchQuery.trim().length > 0;
    if (items.length > 0 && visibleRowsCount === 0 && isFiltered) {
      if (!emptyBox) {
        emptyBox = document.createElement("div");
        emptyBox.id = "gcm-empty-state";
        emptyBox.className = "gcm-empty-state";
        const ill = createIconElement(ICONS.emptyFolderSearch);
        const msg = document.createElement("div");
        msg.className = "gcm-empty-state-text";
        msg.id = "gcm-empty-state-text";
        const resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "gcm-empty-reset-btn";
        resetBtn.id = "gcm-empty-reset-btn";
        resetBtn.addEventListener("click", () => {
          state.activeFolderFilter = "ALL";
          state.searchQuery = "";
          const input = document.getElementById("gcm-search-input") ?? document.querySelector("#gcm-folders-box .gcm-search-input");
          if (input) input.value = "";
          const clearBtn = document.querySelector("#gcm-folders-box .gcm-search-clear");
          if (clearBtn) clearBtn.style.display = "none";
          saveView();
          refreshUI();
        });
        emptyBox.appendChild(ill);
        emptyBox.appendChild(msg);
        emptyBox.appendChild(resetBtn);
        pillsContainer.insertAdjacentElement("afterend", emptyBox);
      }
      const textEl = document.getElementById("gcm-empty-state-text");
      const resetEl = document.getElementById("gcm-empty-reset-btn");
      if (textEl) textEl.textContent = t().emptyStateText;
      if (resetEl) resetEl.textContent = t().emptyStateResetBtn;
      emptyBox.style.display = "flex";
    } else if (emptyBox) {
      emptyBox.style.display = "none";
    }
  }
  var pillsDropController = null;
  function setupPillsDropZone(pillsContainer) {
    pillsDropController?.abort();
    pillsDropController = new AbortController();
    const { signal } = pillsDropController;
    const getDropPill = (target) => target instanceof Element ? target.closest(".gcm-folder-pill.gcm-drop-target") : null;
    pillsContainer.addEventListener(
      "dragenter",
      (e) => {
        const pill = getDropPill(e.target);
        if (!pill) return;
        e.preventDefault();
        pill.classList.add("gcm-drop-active");
      },
      { signal }
    );
    pillsContainer.addEventListener(
      "dragover",
      (e) => {
        const pill = getDropPill(e.target);
        if (!pill) return;
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
        if (!pill.classList.contains("gcm-drop-active")) {
          pillsContainer.querySelectorAll(".gcm-drop-active").forEach((p) => p.classList.remove("gcm-drop-active"));
          pill.classList.add("gcm-drop-active");
        }
      },
      { signal }
    );
    pillsContainer.addEventListener(
      "dragleave",
      (e) => {
        const pill = getDropPill(e.target);
        if (!pill) return;
        const related = e.relatedTarget;
        if (!(related instanceof Node) || !pill.contains(related)) {
          pill.classList.remove("gcm-drop-active");
        }
      },
      { signal }
    );
    pillsContainer.addEventListener(
      "drop",
      (e) => {
        const pill = getDropPill(e.target);
        if (!pill) return;
        e.preventDefault();
        pill.classList.remove("gcm-drop-active");
        const targetFolderId = pill.dataset.folderId;
        const convId = e.dataTransfer?.getData("application/x-gcm-conv-id") || e.dataTransfer?.getData("text/plain") || getDraggingConvId();
        if (!convId || !targetFolderId) return;
        assignChatToFolderWithUndo(convId, targetFolderId === "UNASSIGNED" ? null : targetFolderId);
      },
      { signal }
    );
  }
  function createFolderPill({ id, name, color, count, deletable, keywords }) {
    const pill = document.createElement("div");
    const hasRules = Array.isArray(keywords) && keywords.length > 0;
    const isDropTarget = id !== "ALL" && id !== "PROTECTED";
    pill.className = "gcm-folder-pill" + (state.activeFolderFilter === id ? " active" : "") + (hasRules ? " gcm-pill-has-rules" : "") + (isDropTarget ? " gcm-drop-target" : "");
    if (isDropTarget) {
      pill.dataset.folderId = id;
    }
    pill.setAttribute("role", "button");
    pill.setAttribute("tabindex", "0");
    pill.setAttribute("aria-pressed", String(state.activeFolderFilter === id));
    if (hasRules) {
      pill.title = `${t().autoRulesPrefix} (${keywords.length}): ${keywords.join(", ")}`;
    }
    if (id === "PROTECTED") {
      pill.appendChild(createIconElement(ICONS.lockSmall));
    } else if (color) {
      const dot = document.createElement("span");
      dot.className = "gcm-folder-dot";
      dot.style.backgroundColor = color;
      dot.style.color = color;
      pill.appendChild(dot);
    }
    const label = document.createElement("span");
    label.className = "gcm-folder-label";
    label.textContent = name;
    pill.appendChild(label);
    if (hasRules) {
      const ruleTag = document.createElement("span");
      ruleTag.className = "gcm-folder-autorule";
      ruleTag.appendChild(createIconElement(ICONS.sparkle));
      pill.appendChild(ruleTag);
    }
    const badgeCount = document.createElement("span");
    badgeCount.className = "gcm-folder-count";
    badgeCount.textContent = String(count);
    pill.appendChild(badgeCount);
    if (deletable) {
      const actionsWrap = document.createElement("span");
      actionsWrap.className = "gcm-folder-pill-actions";
      const editBtn = document.createElement("span");
      editBtn.className = "gcm-folder-edit";
      editBtn.appendChild(createIconElement(ICONS.editPencil));
      editBtn.title = t().editFolderTitle(name);
      editBtn.setAttribute("role", "button");
      editBtn.setAttribute("tabindex", "0");
      editBtn.setAttribute("aria-label", t().editFolderTitle(name));
      const triggerEdit = (e) => {
        e.stopPropagation();
        const targetFolder = state.folderState.folders.find((f) => f.id === id);
        if (targetFolder) openCreateFolderModal(null, targetFolder);
      };
      editBtn.addEventListener("click", triggerEdit);
      editBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerEdit(e);
        }
      });
      const del = document.createElement("span");
      del.className = "gcm-folder-del";
      del.textContent = "×";
      del.title = t().delFolderTitle(name);
      del.setAttribute("role", "button");
      del.setAttribute("tabindex", "0");
      del.setAttribute("aria-label", t().delFolderTitle(name));
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteFolderById(id);
      });
      del.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          deleteFolderById(id);
        }
      });
      actionsWrap.appendChild(editBtn);
      actionsWrap.appendChild(del);
      pill.appendChild(actionsWrap);
    }
    pill.addEventListener("click", () => {
      state.autoSelectAllMode = false;
      state.activeFolderFilter = id;
      saveView();
      refreshUI();
    });
    pill.addEventListener("keydown", (e) => {
      if (e.target === pill && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        pill.click();
      }
    });
    return pill;
  }

  // src/main.js
  var attachedStorageListeners = /* @__PURE__ */ new WeakSet();
  var attachedRuntimeListeners = /* @__PURE__ */ new WeakSet();
  function initThemeEngine() {
    let fallbackPreset = null;
    try {
      if (typeof localStorage !== "undefined") {
        fallbackPreset = localStorage.getItem(THEME_STORAGE_KEY);
      }
    } catch (_) {
    }
    applyThemePreset(fallbackPreset, { persist: false });
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local?.get) {
        chrome.storage.local.get([THEME_STORAGE_KEY], (res) => {
          void chrome.runtime?.lastError;
          const stored = res?.[THEME_STORAGE_KEY];
          if (stored) {
            const normalized = applyThemePreset(stored, { persist: false });
            try {
              if (typeof localStorage !== "undefined") {
                localStorage.setItem(THEME_STORAGE_KEY, normalized);
              }
            } catch (_) {
            }
          }
        });
      }
    } catch (_) {
    }
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.sync?.get) {
        chrome.storage.sync.get([THEME_STORAGE_KEY], (res) => {
          void chrome.runtime?.lastError;
          const synced = res?.[THEME_STORAGE_KEY];
          if (synced) {
            const normalized = applyThemePreset(synced, { persist: false });
            try {
              if (typeof localStorage !== "undefined") {
                localStorage.setItem(THEME_STORAGE_KEY, normalized);
              }
            } catch (_) {
            }
            try {
              if (chrome.storage?.local?.set) {
                const p = chrome.storage.local.set({ [THEME_STORAGE_KEY]: normalized });
                if (p && typeof p.catch === "function") p.catch(() => {
                });
              }
            } catch (_) {
            }
          }
        });
      }
    } catch (_) {
    }
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.onChanged?.addListener && !attachedStorageListeners.has(chrome.storage.onChanged)) {
        attachedStorageListeners.add(chrome.storage.onChanged);
        chrome.storage.onChanged.addListener((changes, area) => {
          if (area !== "local" && area !== "sync" || !changes?.[THEME_STORAGE_KEY]) return;
          const normalized = applyThemePreset(changes[THEME_STORAGE_KEY].newValue, { persist: false });
          try {
            if (typeof localStorage !== "undefined") {
              localStorage.setItem(THEME_STORAGE_KEY, normalized);
            }
          } catch (_) {
          }
        });
      }
    } catch (_) {
    }
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.onMessage?.addListener && !attachedRuntimeListeners.has(chrome.runtime.onMessage)) {
        attachedRuntimeListeners.add(chrome.runtime.onMessage);
        chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
          if (msg?.type === "SET_THEME_PRESET") {
            const applied = applyThemePreset(msg.preset);
            sendResponse?.({ ok: true, preset: applied });
          }
        });
      }
    } catch (_) {
    }
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
  function refreshUI() {
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
  function init() {
    if (!document.body) {
      setTimeout(init, 300);
      return;
    }
    syncHostTheme();
    initThemeEngine();
    registerGlobalListeners();
    setupDelegatedSidebarListener();
    setTimeout(refreshUI, 800);
    const themeObserver = new MutationObserver(() => {
      syncHostTheme();
    });
    if (document.documentElement) {
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "data-color-scheme", "data-mode", "style"]
      });
    }
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-color-scheme", "data-mode", "style"]
    });
    const isOwnNode = (n) => {
      const el2 = n.nodeType === 1 ? n : n.parentElement;
      return !!el2 && !!el2.closest('[id^="gcm-"], [class*="gcm-"]');
    };
    const hasNonOwnNode = (list) => {
      for (let i = 0; i < list.length; i++) {
        if (!isOwnNode(list[i])) return true;
      }
      return false;
    };
    const isInsideStreamingMain = (targetNode) => {
      const el2 = targetNode?.nodeType === 1 ? targetNode : targetNode?.parentElement;
      if (!el2) return false;
      const mainEl = el2.closest('main, [role="main"]');
      if (!mainEl) return false;
      const sidebar = getSidebarElement();
      return !sidebar || !mainEl.contains(sidebar);
    };
    const observer = new MutationObserver((mutations) => {
      if (document.hidden || state.isRefreshing) return;
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
    if (getSidebarElement()) {
      startObserving();
    } else {
      let attempts = 0;
      const waitForSidebar = setInterval(() => {
        attempts++;
        if (getSidebarElement() || attempts >= 25) {
          clearInterval(waitForSidebar);
          startObserving();
        }
      }, 200);
    }
    setInterval(() => {
      if (!document.hidden && observedTarget) {
        const sidebar = getSidebarElement();
        if (!observedTarget.isConnected || sidebar && sidebar !== observedTarget) {
          startObserving();
          scheduleRefresh(0);
        }
      }
    }, 4e3);
  }

  // src/content.js
  if (PLATFORM_KEY) {
    init();
  }
})();
