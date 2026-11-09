import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const REPO = 'dsaez27/ChatFold';

const releases = [
  {
    tag: 'v3.5.5',
    title: 'ChatFold v3.5.5 — Silent Background History Loading',
    body: `### 🇺🇸 English
- **Invisible Background Loading**: Chat history now loads smoothly and silently in the background when selecting all chats, preserving user scroll position.
- **No Distracting Toasts**: Eliminated intrusive loading alerts during multi-selection for a seamless workflow.

---

### 🇪🇸 Español
- **Carga Silenciosa en Segundo Plano**: El historial de chats se carga de forma invisible y fluida al seleccionar todo, preservando la posición de scroll del usuario.
- **Sin Alertas Invasivas**: Se eliminaron avisos emergentes repetitivos durante la selección múltiple para una experiencia limpia.`
  },
  {
    tag: 'v3.5.4',
    title: 'ChatFold v3.5.4 — Clean Interface & Minimized Panel Optimization',
    body: `### 🇺🇸 English
- **Streamlined Folders Panel**: Removed the language toggle button from the collapsible folders panel (\`#gcm-folders-box\`) to keep the floating interface minimal and focused.
- **Smart Minimized State**: The "+ Add Folder" button is now automatically hidden when the panel is minimized.

---

### 🇪🇸 Español
- **Panel de Carpetas Simplificado**: Se eliminó el botón de idioma del panel contraíble (\`#gcm-folders-box\`) para mantener una interfaz flotante limpia y enfocada.
- **Modo Minimizado Inteligente**: El botón "+ Carpeta" se oculta automáticamente cuando el panel se encuentra minimizado.`
  },
  {
    tag: 'v3.5.3',
    title: 'ChatFold v3.5.3 — Popup Language Switcher & Full Localization',
    body: `### 🇺🇸 English
- **Popup Menu Language Switcher**: Moved the language selector (English / Spanish) to the extension popup menu (\`popup.html\`), updating both the popup and the active chat tab in real time.
- **Bilingual Popup UI**: Fully translated metrics, shortcuts, hints, and action buttons.

---

### 🇪🇸 Español
- **Selector de Idioma en Popup**: El selector de idioma (ES/EN) se trasladó al menú flotante del popup (\`popup.html\`), actualizando en vivo el popup y la pestaña activa.
- **Interfaz Bilingüe del Popup**: Traducción completa de métricas, atajos de teclado, consejos y botones de acción.`
  },
  {
    tag: 'v3.5.2',
    title: 'ChatFold v3.5.2 — Spring Animations & Modern Checkbox Redesign',
    body: `### 🇺🇸 English
- **Redesigned Modern Checkboxes**: Centered SVG checkmarks with glowing borders, hover states, and smooth spring feedback.
- **Micro-Interactions & Fluid Animations**: Spring transitions on buttons, dropdown menus, toast alerts, and smooth exit animations when deleting conversations.

---

### 🇪🇸 Español
- **Checkboxes Modernos Rediseñados**: Checkboxes centrados con tilde SVG, bordes iluminados, estados hover y respuesta con rebote elástico.
- **Micro-interacciones y Animaciones Fluidas**: Transiciones con rebote (spring) en botones, menús desplegables, avisos toast y animación de salida al eliminar conversaciones.`
  },
  {
    tag: 'v3.5.1',
    title: 'ChatFold v3.5.1 — Auto-scroll Selection & Centralized Backup Menu',
    body: `### 🇺🇸 English
- **Auto-scroll on Select All**: Checking "Select All" (\`#gcm-select-all\`) automatically scrolls down through conversation history, marking each new chat as it appears.
- **Centralized Backup Tools**: Relocated "Save Backup" and "Import Backup" JSON buttons to the extension popup menu.

---

### 🇪🇸 Español
- **Auto-desplazamiento al Seleccionar Todo**: Al marcar "Todo" (\`#gcm-select-all\`), se desplaza automáticamente el historial hacia abajo, seleccionando cada nuevo chat conforme aparece.
- **Herramientas de Respaldo Centralizadas**: Botones de Guardar e Importar JSON reubicados en el menú popup de la extensión.`
  },
  {
    tag: 'v3.5.0',
    title: 'ChatFold v3.5.0 — ChatGPT DOM Stability & Fiber Hydration Fix',
    body: `### 🇺🇸 English
- **ChatGPT Chat Visibility Fix**: Resolved issue where conversation rows could disappear on initial page load in ChatGPT.
- **Fiber Hydration Protection**: Default initial filter resets to "All" and eliminates React Fiber DOM mutations during page hydration.

---

### 🇪🇸 Español
- **Estabilidad de Chats en ChatGPT**: Corrección definitiva para evitar que desaparezcan los chats al cargar ChatGPT.
- **Protección de Hidratación React Fiber**: El filtro inicial se establece en "Todas" y se eliminan mutaciones de React Fiber durante la hidratación.`
  },
  {
    tag: 'v3.4.9',
    title: 'ChatFold v3.4.9 — ChatGPT Sidebar Container Protection',
    body: `### 🇺🇸 English
- **Sidebar Container Protection**: Prevents parent containers (\`div.group\`, \`#history\`, \`nav\`, \`aside\`) from being falsely matched as a single chat or hidden when 1 chat remains.
- **Auto-Reset on Empty Filters**: Automatically resets filter to "All" if a saved folder filter yields zero visible matches.
- **React Wrapper Preservation**: Preserves \`.relative\` React wrapper containers during chat deletion.

---

### 🇪🇸 Español
- **Protección de Contenedores de Barra Lateral**: Impide que contenedores padre (\`div.group\`, \`#history\`, \`nav\`, \`aside\`) sean ocultados o tratados como filas individuales cuando queda <= 1 chat.
- **Auto-restablecimiento de Filtros Vacíos**: Restablece el filtro a "Todas" si no hay coincidencias visibles para evitar barras laterales vacías.
- **Preservación de Contenedores React**: Elimina únicamente la fila individual sin afectar los wrappers \`.relative\`.`
  },
  {
    tag: 'v3.4.8',
    title: 'ChatFold v3.4.8 — Clean App Name & Boxed Version Badge',
    body: `### 🇺🇸 English
- **Clean App Branding**: Panel header displays clean **ChatFold** branding next to the official logo, separating version numbers.
- **Boxed Version Badge**: Displays the version number in a compact, styled badge in the extension popup menu.

---

### 🇪🇸 Español
- **Nombre de Marca Limpio**: El encabezado del panel muestra únicamente **ChatFold** junto al logo oficial.
- **Insignia de Versión en Recuadro**: Muestra el número de versión dentro de una pequeña insignia estilizada en el popup de la extensión.`
  },
  {
    tag: 'v3.4.7',
    title: 'ChatFold v3.4.7 — Full Chat Title Visibility & Translucent Badge',
    body: `### 🇺🇸 English
- **Eliminated Title Truncation**: Removed stacked right padding (88px + 76px) allowing conversation titles to utilize the full row width.
- **Translucent Acrylic Badge**: Replaced opaque black background with a modern frosted glass badge (\`backdrop-filter: blur(4px)\`) that subtly fades on row hover.

---

### 🇪🇸 Español
- **Eliminación del Corte de Título**: Removido el padding derecho acumulado (88px + 76px), permitiendo que el título ocupe todo el ancho de la fila.
- **Etiqueta Translúcida Acrílica**: Reemplazo de fondo opaco por cristal translúcido con desenfoque (\`backdrop-filter: blur(4px)\`) que se atenúa al pasar el cursor.`
  },
  {
    tag: 'v3.4.6',
    title: 'ChatFold v3.4.6 — Cloud Tasks (☁️) Detection & Batch API Deletion',
    body: `### 🇺🇸 English
- **100% Cloud Tasks Detection**: Injected \`page-bridge.js\` to inspect React Fiber properties and structural DOM patterns for ChatGPT cloud tasks without href tags.
- **Batch API Deletion**: Full multi-selection and batch deletion/archiving via authenticated backend endpoints (\`/backend-api/wham/tasks/{id}/archive\`).

---

### 🇪🇸 Español
- **Detección Total de Tareas en la Nube**: Puente \`page-bridge.js\` en MAIN world para inspeccionar React Fiber y detectar tareas sin atributo href en ChatGPT.
- **Borrado Masivo por API**: Soporte de casillas de selección y borrado por lote mediante endpoints \`/backend-api/wham/tasks/{id}/archive\`.`
  },
  {
    tag: 'v3.4.5',
    title: 'ChatFold v3.4.5 — Draggable Toolbar (H/V) & ChatGPT API Deletion Fix',
    body: `### 🇺🇸 English
- **Draggable Multi-Orientation Toolbar**: Drag the toolbar anywhere on the screen and switch between horizontal and vertical layouts with one click.
- **Prioritized API Deletion**: Direct authenticated API deletion fallback for ChatGPT chats, projects, custom GPTs, and tasks.

---

### 🇪🇸 Español
- **Barra Superior Arrastrable (H/V)**: Arrastra la barra libremente por la pantalla y alterna entre orientación horizontal y vertical con un clic.
- **Borrado Prioritario por API**: Borrado directo por API para conversaciones, proyectos, GPTs y tareas en ChatGPT.`
  },
  {
    tag: 'v3.4.4',
    title: 'ChatFold v3.4.4 — Trusted Types CSP Vector Icons Fix',
    body: `### 🇺🇸 English
- **Trusted Types CSP Compliance**: Built SVG nodes using \`document.createElementNS\` preventing CSP script injection blocks across all 5 AI platforms.
- **Explicit Icon Dimensions**: Enforced explicit width/height constraints preventing external stylesheet collapses.

---

### 🇪🇸 Español
- **Cumplimiento de CSP Trusted Types**: Creación de nodos SVG mediante \`document.createElementNS\`, evitando bloqueos de seguridad CSP en las 5 IAs.
- **Dimensiones Explícitas en CSS**: Dimensiones exactas de ancho y alto para evitar colapso de iconos por estilos externos.`
  },
  {
    tag: 'v3.4.3',
    title: 'ChatFold v3.4.3 — ChatGPT / Codex Remote Tasks Management',
    body: `### 🇺🇸 English
- **Remote Tasks Detection**: Checkboxes, folder badges, and lock protection for \`/codex/tasks/\` and \`/tasks/\`.
- **Direct API Deletion**: Authenticated deletion via \`DELETE /backend-api/wham/tasks/{task_id}\` with DOM fallback.

---

### 🇪🇸 Español
- **Gestión de Tareas Remotas**: Checkboxes, insignias de carpetas y candado para tareas remotas de ChatGPT y Codex.
- **Borrado Directo por API**: Eliminación autenticada mediante \`DELETE /backend-api/wham/tasks/{task_id}\` con respaldo por DOM.`
  },
  {
    tag: 'v3.4.2',
    title: 'ChatFold v3.4.2 — Complete Vector SVG Iconography & Brand Logo',
    body: `### 🇺🇸 English
- **Official Vector SVG Logo**: Integrated clean transparent SVG logo in floating panel and popup.
- **Feather/Lucide Vector Icons**: Replaced legacy emojis with clean vector SVG icons across toolbars, panels, menus, and popups.

---

### 🇪🇸 Español
- **Logo Oficial en SVG Vectorial**: Integración de logo SVG con fondo transparente en panel flotante y popup.
- **Iconos Vectoriales Estilo Feather/Lucide**: Reemplazo de emojis antiguos por iconos SVG vectoriales en barras, menús y popups.`
  },
  {
    tag: 'v3.4.1',
    title: 'ChatFold v3.4.1 — UI/UX Polish, Grid Footer & Quick Clear',
    body: `### 🇺🇸 English
- **2×2 Grid Panel Footer**: Clean 2×2 button layout with highlighted Quick Prompts button.
- **Quick Search Clear Button (×)**: 1-click search clear and input refocus.
- **Light & Dark Theme Badges**: Adaptive CSS badge variables (\`--gcm-badge-bg\`).

---

### 🇪🇸 Español
- **Pie de Panel en Cuadrícula 2×2**: Distribución equilibrada en cuadrícula con estilo destacado para Prompts.
- **Botón de Limpieza Rápida (×)**: Limpia el buscador con 1 clic y devuelve el foco.
- **Insignias Adaptables**: Variables CSS para compatibilidad total con modo claro y oscuro.`
  },
  {
    tag: 'v3.4.0',
    title: 'ChatFold v3.4.0 — Universal Multi-AI, Cloud Sync & Prompt Vault',
    body: `### 🇺🇸 English
- **Universal Multi-AI Support**: Full compatibility with **Google Gemini**, **OpenAI ChatGPT**, **Anthropic Claude**, **DeepSeek**, and **OpenCode**.
- **Automatic Cloud Sync**: Transparent synchronization of folders, rules, prompts, and locked chats across all browsers using \`chrome.storage.sync\`.
- **Quick Prompts Vault**: Built-in reusable productivity prompt library with 1-click injection into active AI chat composers.
- **Popup Control & Shortcuts**: Dedicated extension popup with platform counters and global keyboard shortcuts.

---

### 🇪🇸 Español
- **Soporte Universal Multi-IA**: Compatibilidad completa con **Google Gemini**, **OpenAI ChatGPT**, **Anthropic Claude**, **DeepSeek** y **OpenCode**.
- **Sincronización Automática en la Nube**: Sincronización en tiempo real de carpetas, reglas, prompts y chats protegidos con \`chrome.storage.sync\`.
- **Bóveda de Prompts Rápidos**: Biblioteca integrada de prompts de alta productividad con inserción en 1 clic en el editor de chat activo.
- **Popup de Control y Atajos**: Ventana popup con estadísticas por plataforma y atajos de teclado globales.`
  },
  {
    tag: 'v3.3.2',
    title: 'ChatFold v3.3.2 — Official Logos & Brand Identity',
    body: `### 🇺🇸 English
- **Official High-Resolution Brand Identity**: Integrated 2048x2048, 1024x1024, and transparent brand assets.
- **Polished Visual Assets**: Packaged crisp branding for store listings and extension headers.

---

### 🇪🇸 Español
- **Identidad de Marca Oficial en Alta Resolución**: Integración de logos oficiales de alta resolución y activos transparentes.
- **Activos Visuales Pulidos**: Empaquetado de marca oficial para las tiendas y la extensión.`
  },
  {
    tag: 'v3.3.1',
    title: 'ChatFold v3.3.1 — Official ChatFold Rebranding',
    body: `### 🇺🇸 English
- **Official ChatFold Rebranding**: Renamed project to ChatFold with unified cross-browser manifest configurations.
- **Refined Nomenclature**: Standardized naming across codebases, storage keys, and locale files.

---

### 🇪🇸 Español
- **Cambio de Nombre Oficial a ChatFold**: Renombrado del proyecto a ChatFold con configuración unificada de manifiesto.
- **Nomenclatura Estandarizada**: Actualización en todo el código fuente, claves de almacenamiento y diccionarios.`
  },
  {
    tag: 'v3.3.0',
    title: 'ChatFold v3.3.0 — Collapsible Top Toolbar & Modular Architecture',
    body: `### 🇺🇸 English
- **Collapsible Top Toolbar**: Added compact collapsible floating toolbar with quick action buttons.
- **Modular Architecture**: Complete esbuild modularization with 23 automated tests.

---

### 🇪🇸 Español
- **Barra Superior Contraíble**: Incorporación de barra flotante compacta con botones de acción rápida.
- **Arquitectura Modular**: Modularización completa con esbuild y 23 pruebas automatizadas.`
  },
  {
    tag: 'v3.2.4',
    title: 'ChatFold v3.2.4 — Draggable Panel & Cross-Tab Sync',
    body: `### 🇺🇸 English
- **Draggable Floating Panel**: Free positioning across the browser viewport with persistent coordinates.
- **Cross-Tab Synchronization**: Real-time folder updates synchronized across multiple tabs.

---

### 🇪🇸 Español
- **Panel Flotante Arrastrable**: Posicionamiento libre en pantalla con persistencia de coordenadas.
- **Sincronización entre Pestañas**: Actualizaciones de carpetas en tiempo real sincronizadas entre pestañas.`
  }
];

const tmpFile = path.join(os.tmpdir(), 'cf_release_notes.md');

for (const rel of releases) {
  try {
    process.stdout.write('Updating ' + rel.tag + '... ');
    fs.writeFileSync(tmpFile, rel.body, 'utf8');
    const cmd = 'gh release edit ' + rel.tag + ' --repo ' + REPO + ' --title "' + rel.title + '" --notes-file "' + tmpFile + '"';
    execSync(cmd, { stdio: 'pipe' });
    console.log('OK');
  } catch (err) {
    console.error('Failed: ' + err.message);
  }
}

if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
console.log('All releases updated successfully!');
