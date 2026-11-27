export type Lang = 'es' | 'en';
export type PlatformKey = 'claude' | 'gemini' | 'chatgpt';
export type FolderId = 'all' | 'dev' | 'research' | 'product' | 'design';

export interface DemoChat {
  id: string;
  folder: Exclude<FolderId, 'all'>;
  locked: boolean;
  selected: boolean;
  es: string;
  en: string;
}

export interface PlatformConfig {
  key: PlatformKey;
  name: string;
  tabLabel: string;
  urlHost: string;
  urlPath: string;
  accent: string;
  accent2: string;
  rgb: string;
  contrast: string;
  model: string;
  greetingEs: string;
  greetingEn: string;
  placeholderEs: string;
  placeholderEn: string;
  captionEs: string;
  captionEn: string;
  tagsEs: string[];
  tagsEn: string[];
  chats: DemoChat[];
}

export interface VisualTheme {
  id: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  swatchBg: string;
  swatchBar: string;
  swatchDot: string;
  vars: Record<string, string>;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

export const FOLDER_COLORS: Record<Exclude<FolderId, 'all'>, string> = {
  dev: '#4c8df6',
  research: '#10a37f',
  product: '#f59e0b',
  design: '#a855f7'
};

export const FOLDERS_META: { id: FolderId; es: string; en: string; color: string | null }[] = [
  { id: 'all', es: 'Todas', en: 'All', color: null },
  { id: 'dev', es: 'Programación', en: 'Engineering', color: FOLDER_COLORS.dev },
  { id: 'research', es: 'Investigación', en: 'Research', color: FOLDER_COLORS.research },
  { id: 'product', es: 'Producto', en: 'Product', color: FOLDER_COLORS.product },
  { id: 'design', es: 'Diseño', en: 'Design', color: FOLDER_COLORS.design }
];

export const PLATFORMS: Record<PlatformKey, PlatformConfig> = {
  claude: {
    key: 'claude',
    name: 'Claude',
    tabLabel: 'Claude',
    urlHost: 'claude.ai',
    urlPath: '/new',
    accent: '#ff7a59',
    accent2: '#f59e0b',
    rgb: '255, 122, 89',
    contrast: '#08090d',
    model: 'Claude Sonnet 4.6',
    greetingEs: 'Buenas tardes, Alex',
    greetingEn: 'Good afternoon, Alex',
    placeholderEs: '¿En qué proyecto trabajamos hoy?',
    placeholderEn: 'What project are we building today?',
    captionEs: 'Claude en Chrome (macOS) — Haz clic en las carpetas o checkboxes del panel para probar Foldy en vivo.',
    captionEn: 'Claude in Chrome (macOS) — Click folders or sidebar checkboxes to test Foldy live.',
    tagsEs: ['Tema terracota', 'Barra vertical', 'Demo interactiva'],
    tagsEn: ['Terracotta theme', 'Vertical bar', 'Live interactive demo'],
    chats: [
      { id: 'c1', folder: 'dev', locked: true, selected: true, es: 'Arquitectura Microservicios Go', en: 'Go Microservices Architecture' },
      { id: 'c2', folder: 'design', locked: false, selected: true, es: 'Sistema de Tokens UI 2026', en: '2026 UI Token System' },
      { id: 'c3', folder: 'research', locked: true, selected: false, es: 'Estrategia RAG Híbrido', en: 'Hybrid RAG Strategy' },
      { id: 'c4', folder: 'dev', locked: false, selected: true, es: 'Optimización Consultas SQL', en: 'PostgreSQL Query Tuning' },
      { id: 'c5', folder: 'product', locked: false, selected: false, es: 'Roadmap Lanzamiento Q4', en: 'Q4 Product Launch Roadmap' },
      { id: 'c6', folder: 'dev', locked: false, selected: false, es: 'Auditoría Auth OAuth 2.1', en: 'OAuth 2.1 Security Audit' }
    ]
  },
  gemini: {
    key: 'gemini',
    name: 'Gemini',
    tabLabel: 'Google Gemini',
    urlHost: 'gemini.google.com',
    urlPath: '/app',
    accent: '#4f8cff',
    accent2: '#7c5cff',
    rgb: '79, 140, 255',
    contrast: '#060913',
    model: 'Gemini 2.5 Pro',
    greetingEs: '¿Por dónde empezamos, Alex?',
    greetingEn: 'Where should we start, Alex?',
    placeholderEs: 'Pregunta a Gemini o inserta un prompt con Alt+Shift+F...',
    placeholderEn: 'Ask Gemini or insert a prompt with Alt+Shift+F...',
    captionEs: 'Google Gemini en Chrome (macOS) — Cristal azul adaptativo, búsqueda en tiempo real y selección múltiple.',
    captionEn: 'Google Gemini in Chrome (macOS) — Adaptive blue glass, live search, and range multi-select.',
    tagsEs: ['Cristal azul', 'Selección múltiple', 'Filtro en vivo'],
    tagsEn: ['Blue glass', 'Multi-select', 'Live filter'],
    chats: [
      { id: 'g1', folder: 'research', locked: true, selected: true, es: 'Benchmark Modelos Multimodales', en: 'Multimodal Model Benchmark' },
      { id: 'g2', folder: 'dev', locked: false, selected: true, es: 'Pipeline CI/CD GitHub Actions', en: 'GitHub Actions CI/CD Pipeline' },
      { id: 'g3', folder: 'design', locked: false, selected: false, es: 'Patrones CSS Anchor Positioning', en: 'CSS Anchor Positioning Patterns' },
      { id: 'g4', folder: 'product', locked: true, selected: false, es: 'Métricas Retención Onboarding', en: 'Onboarding Retention Metrics' },
      { id: 'g5', folder: 'research', locked: false, selected: false, es: 'Resumen Paper Attention 2026', en: '2026 Attention Paper Summary' },
      { id: 'g6', folder: 'dev', locked: false, selected: false, es: 'Índices Base de Datos Vectorial', en: 'Vector Database Indexing' }
    ]
  },
  chatgpt: {
    key: 'chatgpt',
    name: 'ChatGPT',
    tabLabel: 'ChatGPT',
    urlHost: 'chatgpt.com',
    urlPath: '/',
    accent: '#10d998',
    accent2: '#06b6d4',
    rgb: '16, 217, 152',
    contrast: '#04120d',
    model: 'GPT-5 · Codex',
    greetingEs: '¿Qué tienes en mente hoy?',
    greetingEn: 'What is on your mind today?',
    placeholderEs: 'Escribe tu consulta o abre la Bóveda de Prompts...',
    placeholderEn: 'Type a message or open the Prompt Vault...',
    captionEs: 'OpenAI ChatGPT en Chrome (macOS) — Acento esmeralda nativo, soporte Codex y borrado seguro con CSRF.',
    captionEn: 'OpenAI ChatGPT in Chrome (macOS) — Native emerald accent, Codex support, and CSRF-safe cleanup.',
    tagsEs: ['Acento esmeralda', 'Soporte Codex', 'Candados activos'],
    tagsEn: ['Emerald accent', 'Codex support', 'Active locks'],
    chats: [
      { id: 'o1', folder: 'dev', locked: true, selected: true, es: 'Refactor API GraphQL a REST', en: 'GraphQL to REST API Refactor' },
      { id: 'o2', folder: 'dev', locked: false, selected: true, es: 'Generador Tests E2E Playwright', en: 'Playwright E2E Test Suite' },
      { id: 'o3', folder: 'product', locked: false, selected: false, es: 'Documentación OpenAPI 3.1', en: 'OpenAPI 3.1 Specification' },
      { id: 'o4', folder: 'research', locked: true, selected: false, es: 'Arquitectura Local-First Sync', en: 'Local-First Sync Architecture' },
      { id: 'o5', folder: 'design', locked: false, selected: false, es: 'Checklist Accesibilidad WCAG', en: 'WCAG Accessibility Checklist' },
      { id: 'o6', folder: 'dev', locked: false, selected: false, es: 'Seguridad Extensiones MV3', en: 'Manifest V3 Security Hardening' }
    ]
  }
};

export const THEMES: VisualTheme[] = [
  {
    id: 'adaptive', nameEs: 'Adaptativo', nameEn: 'Adaptive',
    descEs: 'Cristal adaptativo por plataforma', descEn: 'Platform-adaptive glass',
    swatchBg: '#161b28', swatchBar: '#9eb8ff', swatchDot: '#4c8df6',
    vars: { '--tp-bg': '#121621', '--tp-fg': '#f3f6ff', '--tp-muted': '#96a3be', '--tp-accent': '#4c8df6', '--tp-accent-fg': '#07101e', '--tp-accent-soft': 'rgba(76,141,246,0.16)', '--tp-border': 'rgba(255,255,255,0.12)', '--tp-input': 'rgba(255,255,255,0.05)', '--tp-pill': 'rgba(255,255,255,0.04)', '--tp-radius': '999px', '--tp-radius-sm': '10px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 24px 56px -22px rgba(0,0,0,0.85)' }
  },
  {
    id: 'neobrutal', nameEs: 'Neo-Brutal', nameEn: 'Neo-Brutal',
    descEs: 'Bordes marcados y sombras duras', descEn: 'Bold borders and hard shadows',
    swatchBg: '#111111', swatchBar: '#ffffff', swatchDot: '#ffd000',
    vars: { '--tp-bg': '#141414', '--tp-fg': '#ffffff', '--tp-muted': '#b8b8b8', '--tp-accent': '#ffd000', '--tp-accent-fg': '#111111', '--tp-accent-soft': 'rgba(255,208,0,0.16)', '--tp-border': '#ffffff', '--tp-input': '#0a0a0a', '--tp-pill': '#1e1e1e', '--tp-radius': '4px', '--tp-radius-sm': '4px', '--tp-font': 'var(--font-display)', '--tp-shadow': '5px 5px 0 #ffd000' }
  },
  {
    id: 'terminal', nameEs: 'Terminal', nameEn: 'Terminal',
    descEs: 'Consola monospace verde fósforo', descEn: 'Phosphor green monospace console',
    swatchBg: '#08120c', swatchBar: '#22c55e', swatchDot: '#4ade80',
    vars: { '--tp-bg': '#07110b', '--tp-fg': '#d1fae5', '--tp-muted': '#6ee7b7', '--tp-accent': '#22c55e', '--tp-accent-fg': '#041208', '--tp-accent-soft': 'rgba(34,197,94,0.16)', '--tp-border': 'rgba(34,197,94,0.42)', '--tp-input': '#040b07', '--tp-pill': 'rgba(34,197,94,0.08)', '--tp-radius': '6px', '--tp-radius-sm': '6px', '--tp-font': 'var(--font-mono)', '--tp-shadow': '0 20px 44px -20px rgba(0,0,0,0.9)' }
  },
  {
    id: 'minimal', nameEs: 'Minimal Flat', nameEn: 'Minimal Flat',
    descEs: 'Superficies planas sin sombras', descEn: 'Flat surfaces with zero shadow',
    swatchBg: '#191b1f', swatchBar: '#d4d8e1', swatchDot: '#9ca3af',
    vars: { '--tp-bg': '#181a1f', '--tp-fg': '#eceef2', '--tp-muted': '#989fa9', '--tp-accent': '#e5e7eb', '--tp-accent-fg': '#111317', '--tp-accent-soft': 'rgba(229,231,235,0.12)', '--tp-border': 'rgba(255,255,255,0.1)', '--tp-input': '#121418', '--tp-pill': '#20232a', '--tp-radius': '8px', '--tp-radius-sm': '8px', '--tp-font': 'var(--font-sans)', '--tp-shadow': 'none' }
  },
  {
    id: 'neon', nameEs: 'Neon Synth', nameEn: 'Neon Synth',
    descEs: 'Cian y magenta de alto contraste', descEn: 'High-contrast cyan and magenta',
    swatchBg: '#160d24', swatchBar: '#22d3ee', swatchDot: '#f43f8e',
    vars: { '--tp-bg': '#130b21', '--tp-fg': '#f8ecff', '--tp-muted': '#c0a3e8', '--tp-accent': '#f43f8e', '--tp-accent-fg': '#130714', '--tp-accent-soft': 'rgba(244,63,142,0.18)', '--tp-border': 'rgba(34,211,238,0.38)', '--tp-input': 'rgba(34,211,238,0.06)', '--tp-pill': 'rgba(244,63,142,0.08)', '--tp-radius': '999px', '--tp-radius-sm': '10px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 24px 56px -22px rgba(0,0,0,0.9)' }
  },
  {
    id: 'nord', nameEs: 'Nord Frost', nameEn: 'Nord Frost',
    descEs: 'Paleta ártica serena de bajo cansancio', descEn: 'Calm arctic low-strain palette',
    swatchBg: '#2e3440', swatchBar: '#d8dee9', swatchDot: '#88c0d0',
    vars: { '--tp-bg': '#242933', '--tp-fg': '#eceff4', '--tp-muted': '#a5b1c2', '--tp-accent': '#88c0d0', '--tp-accent-fg': '#1a2029', '--tp-accent-soft': 'rgba(136,192,208,0.16)', '--tp-border': 'rgba(216,222,233,0.14)', '--tp-input': '#1e232c', '--tp-pill': '#2c323e', '--tp-radius': '12px', '--tp-radius-sm': '9px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 22px 48px -22px rgba(0,0,0,0.78)' }
  },
  {
    id: 'catppuccin', nameEs: 'Catppuccin', nameEn: 'Catppuccin',
    descEs: 'Tonos pastel suaves sobre grafito', descEn: 'Soft pastel accents on mocha graphite',
    swatchBg: '#1e1e2e', swatchBar: '#cdd6f4', swatchDot: '#cba6f7',
    vars: { '--tp-bg': '#1e1e2e', '--tp-fg': '#cdd6f4', '--tp-muted': '#a6adc8', '--tp-accent': '#cba6f7', '--tp-accent-fg': '#181825', '--tp-accent-soft': 'rgba(203,166,247,0.16)', '--tp-border': 'rgba(205,214,244,0.13)', '--tp-input': '#181825', '--tp-pill': '#26263a', '--tp-radius': '999px', '--tp-radius-sm': '10px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 22px 50px -22px rgba(0,0,0,0.8)' }
  },
  {
    id: 'paper', nameEs: 'Papel Cálido', nameEn: 'Warm Paper',
    descEs: 'Lectura diurna en tono editorial marfil', descEn: 'Daylight ivory editorial surface',
    swatchBg: '#f4efe6', swatchBar: '#2a2520', swatchDot: '#b45309',
    vars: { '--tp-bg': '#f4efe6', '--tp-fg': '#231f1a', '--tp-muted': '#675e53', '--tp-accent': '#b45309', '--tp-accent-fg': '#fffaf2', '--tp-accent-soft': 'rgba(180,83,9,0.12)', '--tp-border': 'rgba(35,31,26,0.16)', '--tp-input': '#ebe4d8', '--tp-pill': '#eae2d5', '--tp-radius': '10px', '--tp-radius-sm': '8px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 22px 48px -22px rgba(0,0,0,0.55)' }
  },
  {
    id: 'amber', nameEs: 'Ámbar Solar', nameEn: 'Solar Amber',
    descEs: 'Contraste cálido con acentos dorados', descEn: 'Warm contrast with golden amber accents',
    swatchBg: '#1c150c', swatchBar: '#fde68a', swatchDot: '#f59e0b',
    vars: { '--tp-bg': '#18120a', '--tp-fg': '#fef3c7', '--tp-muted': '#d4b483', '--tp-accent': '#f59e0b', '--tp-accent-fg': '#1a1104', '--tp-accent-soft': 'rgba(245,158,11,0.16)', '--tp-border': 'rgba(245,158,11,0.28)', '--tp-input': '#110c06', '--tp-pill': 'rgba(245,158,11,0.08)', '--tp-radius': '12px', '--tp-radius-sm': '9px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 22px 50px -22px rgba(0,0,0,0.85)' }
  },
  {
    id: 'forest', nameEs: 'Bosque', nameEn: 'Forest Moss',
    descEs: 'Verde orgánico y calma sostenida', descEn: 'Organic moss green for sustained focus',
    swatchBg: '#101c16', swatchBar: '#bbf7d0', swatchDot: '#34d399',
    vars: { '--tp-bg': '#0f1914', '--tp-fg': '#ecfdf5', '--tp-muted': '#8eb8a3', '--tp-accent': '#34d399', '--tp-accent-fg': '#061a11', '--tp-accent-soft': 'rgba(52,211,153,0.16)', '--tp-border': 'rgba(52,211,153,0.24)', '--tp-input': '#0a120e', '--tp-pill': 'rgba(52,211,153,0.08)', '--tp-radius': '999px', '--tp-radius-sm': '10px', '--tp-font': 'var(--font-sans)', '--tp-shadow': '0 22px 50px -22px rgba(0,0,0,0.85)' }
  }
];

export const VAULT_PROMPTS = [
  {
    id: 'p1',
    titleEs: 'Revisor de Código Senior',
    titleEn: 'Senior Code Reviewer',
    tagEs: 'CÓDIGO',
    tagEn: 'CODE',
    previewEs: 'Audita este módulo en {{lenguaje}} buscando cuellos de botella y riesgos de seguridad...',
    previewEn: 'Audit this {{language}} module for performance bottlenecks and security edge cases...'
  },
  {
    id: 'p2',
    titleEs: 'Resumen Ejecutivo',
    titleEn: 'Executive Summary',
    tagEs: 'SÍNTESIS',
    tagEn: 'SYNTHESIS',
    previewEs: 'Condensa el documento en 5 decisiones accionables con impacto y siguientes pasos...',
    previewEn: 'Condense this document into 5 actionable decisions with impact and next steps...'
  },
  {
    id: 'p3',
    titleEs: 'Traductor Técnico Natural',
    titleEn: 'Natural Technical Translator',
    tagEs: 'IDIOMAS',
    tagEn: 'LANGUAGES',
    previewEs: 'Traduce al {{idioma_destino}} manteniendo precisión técnica y tono editorial limpio...',
    previewEn: 'Translate into {{target_language}} preserving technical precision and crisp tone...'
  },
  {
    id: 'p4',
    titleEs: 'Arquitecto de APIs REST',
    titleEn: 'REST API Architect',
    tagEs: 'BACKEND',
    tagEn: 'BACKEND',
    previewEs: 'Diseña el contrato OpenAPI 3.1 para {{servicio}} con paginación por cursor e idempotencia...',
    previewEn: 'Design an OpenAPI 3.1 contract for {{service}} with cursor pagination and idempotency...'
  }
];

export const I18N = {
  es: {
    skip: 'Saltar al contenido principal',
    navPlatforms: 'Demo Chrome',
    navAnatomy: 'Capacidades',
    navThemes: 'Estilos',
    navInstall: 'Instalar',
    navSync: 'Sync foldy1:',
    navDownload: 'Descargar',
    heroTitle: 'Tus chats de IA, por fin bajo control.',
    heroSub: 'Organiza Gemini, ChatGPT, Claude, DeepSeek, OpenCode y Antigravity CLI con carpetas inteligentes, Bóveda de Prompts {{var}}, candados y sincronización foldy1: sin cuentas.',
    ctaDownload: 'Descargar Extensión v4.2.5',
    ctaCli: 'Instalar en Antigravity CLI',
    metaM3: 'Manifest V3',
    metaMit: 'Open Source (MIT)',
    metaLocal: '100% local · Sync opcional',
    wsNewChat: 'Nueva conversación',
    wsRecent: 'Recientes',
    fpNew: '+ Nueva',
    fpSearch: 'Buscar chats...',
    fpLoad: 'Cargar',
    fpPrompts: 'Prompts',
    compatLabel: 'Compatible con',
    anatomyTitle: 'Diseñado para vivir dentro de cada IA sin estorbar.',
    anatomyDesc: 'Cada componente de Foldy adopta la paleta, los bordes y el ritmo de la plataforma donde estás trabajando. Nada de paneles genéricos pegados encima.',
    s1Title: 'Panel flotante, carpetas con auto-reglas y chats ocultos.',
    s1Desc: 'Crea carpetas con color propio y reglas de palabras clave para clasificar conversaciones automáticamente. Arrastra chats sobre cualquier píldora con Deshacer de 5 segundos, oculta hilos sin borrarlos y minimiza el panel a una cápsula discreta cuando necesites pantalla completa.',
    s1Li1: 'Búsqueda instantánea sin retardo con atajo Alt+Shift+S y orden por recientes.',
    s1Li2: 'Píldora dedicada Ocultos para despejar tu barra lateral sin perder contexto.',
    s1Li3: 'Arrastre libre con márgenes seguros de 8 px para que el panel nunca se escape.',
    s2Title: 'Bóveda de Prompts con {{variables}} e inserción en 1 clic.',
    s2Desc: 'Guarda tus instrucciones más efectivas por categoría y ábrelas desde cualquier IA con una paleta de comandos rápida. Al insertar un prompt con {{placeholders}}, Foldy solicita cada variable antes de inyectar párrafos limpios directamente en el editor.',
    s2Li1: 'Inyección nativa compatible con ProseMirror (ChatGPT/Claude) y Quill (Gemini).',
    s2Li2: 'Copia, edita, crea o inserta con Enter y cierra con Escape sin soltar el teclado.',
    s2Li3: 'Sincronizada entre todas tus pestañas y respaldable en JSON o código foldy1:.',
    s3Title: 'Selección múltiple por rango, candados y borrado masivo seguro.',
    s3Desc: 'Marca conversaciones individuales o selecciona rangos completos con Shift+Clic. La barra contextual (horizontal o vertical, en modo normal o solo íconos) te permite mover a carpetas, proteger chats clave con candado, ocultar, exportar a Markdown o limpiar el resto sin riesgo.',
    s3Li1: 'Los chats con candado quedan bloqueados frente a cualquier borrado masivo.',
    s3Li2: 'Exportación directa a Markdown (.md) del índice seleccionado o la conversación activa.',
    s3Li3: 'Borrado seguro vía DOM y API autenticada con CSRF en ChatGPT y Codex.',
    s4Title: 'Un popup de control con métricas reales y cuota en vivo.',
    s4Desc: 'Supervisa cuántas carpetas, chats asignados y candados tienes en Gemini, ChatGPT, Claude, DeepSeek y OpenCode. Cambia de idioma (ES/EN), alterna entre 10 estilos visuales, activa la barra compacta y genera tu código de sincronización desde un solo panel.',
    s4Li1: 'Medidor en tiempo real de chrome.storage.sync (KB / 8.0 KB) con fusión sin pérdida.',
    s4Li2: 'Atajos globales configurados: Alt+Shift+F para el panel y Alt+Shift+S para buscar.',
    s4Li3: 'Respaldo e importación JSON sanitizada en un clic para migraciones completas.',
    themesTitle: '10 estilos visuales que responden a tu entorno.',
    themesDesc: 'Desde el cristal adaptativo por plataforma hasta Terminal verde fósforo o Papel Cálido diurno. Prueba cada estilo en vivo antes de instalar.',
    tpNew: '+ Nueva',
    tpSearch: 'Buscar conversación...',
    tpAll: 'Todas 12',
    tpDev: 'Programación',
    tpStudy: 'Investigación',
    tpIdeas: 'Producto',
    tpLoad: 'Cargar',
    tpPrompts: 'Prompts',
    installTitle: 'Instala Foldy en tu navegador o en tu terminal.',
    installDesc: 'Gratuito, auditable y con paquetes verificados mediante SHA-256 en GitHub Releases.',
    extTitle: 'Extensión de Navegador',
    extBadge: 'Manifest V3 · v4.2.5',
    extDesc: 'Chrome, Brave, Edge, Firefox (109+), Opera y Safari. Lista para Gemini, ChatGPT, Claude, DeepSeek y OpenCode.',
    extBtnZip: 'Descargar .zip (Chromium)',
    extBtnReleases: 'Ver GitHub Releases',
    extStep1: 'Descarga y descomprime foldy-v4.2.5-chromium.zip.',
    extStep2: 'Abre chrome://extensions (o brave:// / edge://) y activa Modo desarrollador.',
    extStep3: 'Pulsa Cargar descomprimida y selecciona la carpeta extraída.',
    cliTitle: 'Plugin Antigravity CLI',
    cliBadge: 'MCP + Hooks · /foldy',
    cliDesc: 'Lleva tus mismas carpetas, candados, Bóveda de Prompts {{var}}, selector interactivo (↑/↓ + Espacio) y exportación Markdown directo a tu terminal agy.',
    copy: 'Copiar',
    copied: 'Copiado',
    cliBtnRepo: 'Ver repo Foldy-agy',
    cliBtnMarket: 'marketplace.json',
    syncTitle: 'Un ecosistema conectado por foldy1: sin cuentas ni servidores.',
    syncDesc: 'Genera un código compacto (gzip nativo + Base64url) desde el popup de Foldy en Chrome, Brave, Edge o Firefox y aplícalo en otro navegador o en Antigravity CLI con /foldy sync. Tus datos viajan contigo, nunca a través de terceros.',
    syncFlow1: 'Navegador',
    syncFlow2: 'gzip + Base64url',
    syncFlow3: 'Otro navegador / CLI',
    footerCopy: '© 2026 Foldy · Open Source (MIT) · Creado por dsaez27',
    footerWeb: 'Foldy Web',
    footerCli: 'Foldy-agy (CLI)',
    footerReleases: 'Releases',
    footerChangelog: 'Changelog',
    vaultInsert: 'Insertar ↵',
    vaultInserted: 'Insertado'
  },
  en: {
    skip: 'Skip to main content',
    navPlatforms: 'Chrome Demo',
    navAnatomy: 'Capabilities',
    navThemes: 'Themes',
    navInstall: 'Install',
    navSync: 'foldy1: Sync',
    navDownload: 'Download',
    heroTitle: 'Your AI chats, finally under control.',
    heroSub: 'Organize Gemini, ChatGPT, Claude, DeepSeek, OpenCode, and Antigravity CLI with smart folders, a {{var}} Prompt Vault, lock protection, and account-free foldy1: sync.',
    ctaDownload: 'Download Extension v4.2.5',
    ctaCli: 'Install for Antigravity CLI',
    metaM3: 'Manifest V3',
    metaMit: 'Open Source (MIT)',
    metaLocal: '100% local · Optional sync',
    wsNewChat: 'New conversation',
    wsRecent: 'Recent',
    fpNew: '+ New',
    fpSearch: 'Search chats...',
    fpLoad: 'Load',
    fpPrompts: 'Prompts',
    compatLabel: 'Works across',
    anatomyTitle: 'Built to live inside every AI without getting in the way.',
    anatomyDesc: 'Every Foldy surface adapts to the palette, geometry, and rhythm of the platform you are using—no generic floating widgets bolted on top.',
    s1Title: 'Floating panel, auto-rule folders, and hidden threads.',
    s1Desc: 'Create color-coded folders with keyword auto-classification rules. Drag chats directly onto any folder pill with a 5-second Undo toast, hide threads without deleting them, and collapse the panel into a discreet pill whenever you want full focus.',
    s1Li1: 'Zero-latency instant search via Alt+Shift+S with recent sorting.',
    s1Li2: 'Dedicated Hidden pill to declutter your sidebar without losing context.',
    s1Li3: 'Free dragging with 8 px viewport clamping so the handle never clips off-screen.',
    s2Title: 'Prompt Vault with {{variables}} and 1-click injection.',
    s2Desc: 'Store your sharpest instructions by category and summon them from any AI via a fast command palette. Whenever a prompt includes {{placeholders}}, Foldy opens a quick-fill modal before injecting clean paragraphs right into the editor.',
    s2Li1: 'Native rich injection for ProseMirror (ChatGPT/Claude) and Quill (Gemini).',
    s2Li2: 'Copy, edit, create, or insert with Enter and dismiss with Escape—keyboard first.',
    s2Li3: 'Synced across every tab and portable via JSON backup or foldy1: Sync Code.',
    s3Title: 'Range multi-select, locks, and safe bulk cleanup.',
    s3Desc: 'Check individual chats or select full ranges with Shift+Click. The contextual toolbar—horizontal or vertical, full or icon-only—lets you move to folders, lock key threads, hide, export to Markdown, or bulk-delete the rest safely.',
    s3Li1: 'Locked conversations are strictly protected from accidental bulk deletion.',
    s3Li2: 'Direct Markdown (.md) export of your selected index or active conversation.',
    s3Li3: 'Safe DOM and CSRF-authenticated API bulk deletion on ChatGPT and Codex.',
    s4Title: 'A control popup with live metrics and sync quota.',
    s4Desc: 'Monitor folder, chat, and lock counts across Gemini, ChatGPT, Claude, DeepSeek, and OpenCode. Switch ES/EN language, pick from 10 visual themes, toggle the compact toolbar, and copy your sync code from one place.',
    s4Li1: 'Real-time chrome.storage.sync meter (KB / 8.0 KB) with additive lossless merge.',
    s4Li2: 'Built-in shortcuts: Alt+Shift+F toggles the panel, Alt+Shift+S focuses search.',
    s4Li3: 'One-click sanitized JSON backup and restore for full workspace migrations.',
    themesTitle: '10 visual themes that match how you work.',
    themesDesc: 'From platform-adaptive glass to phosphor-green Terminal or daylight Warm Paper. Preview every theme live before installing.',
    tpNew: '+ New',
    tpSearch: 'Search conversations...',
    tpAll: 'All 12',
    tpDev: 'Engineering',
    tpStudy: 'Research',
    tpIdeas: 'Product',
    tpLoad: 'Load',
    tpPrompts: 'Prompts',
    installTitle: 'Install Foldy in your browser or your terminal.',
    installDesc: 'Free, auditable, and shipped with SHA-256 verified packages on GitHub Releases.',
    extTitle: 'Browser Extension',
    extBadge: 'Manifest V3 · v4.2.5',
    extDesc: 'Chrome, Brave, Edge, Firefox (109+), Opera, and Safari. Ready for Gemini, ChatGPT, Claude, DeepSeek, and OpenCode.',
    extBtnZip: 'Download .zip (Chromium)',
    extBtnReleases: 'View GitHub Releases',
    extStep1: 'Download and extract foldy-v4.2.5-chromium.zip.',
    extStep2: 'Open chrome://extensions (or brave:// / edge://) and enable Developer mode.',
    extStep3: 'Click Load unpacked and select the extracted folder.',
    cliTitle: 'Antigravity CLI Plugin',
    cliBadge: 'MCP + Hooks · /foldy',
    cliDesc: 'Bring the same smart folders, locks, {{var}} Prompt Vault, interactive picker (↑/↓ + Space), and Markdown export straight into your agy terminal.',
    copy: 'Copy',
    copied: 'Copied',
    cliBtnRepo: 'View Foldy-agy repo',
    cliBtnMarket: 'marketplace.json',
    syncTitle: 'One ecosystem linked by foldy1: — zero accounts or servers.',
    syncDesc: 'Copy a compact Sync Code (native gzip + Base64url) from Foldy popup in Chrome, Brave, Edge, or Firefox and apply it in another browser or Antigravity CLI via /foldy sync. Your setup travels with you, never through third-party clouds.',
    syncFlow1: 'Browser',
    syncFlow2: 'gzip + Base64url',
    syncFlow3: 'Other browser / CLI',
    footerCopy: '© 2026 Foldy · Open Source (MIT) · Built by dsaez27',
    footerWeb: 'Foldy Web',
    footerCli: 'Foldy-agy (CLI)',
    footerReleases: 'Releases',
    footerChangelog: 'Changelog',
    vaultInsert: 'Insert ↵',
    vaultInserted: 'Inserted'
  }
} as const;
