import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import { createChromeMock } from './chrome-storage-mock.js';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FIXTURES = {
  gemini: {
    url: 'https://gemini.google.com/app/abc12345',
    html: `<body><nav><conversations-list>
      <div data-test-id="conversation"><a href="/app/aaaaa11111"><span class="conversation-title">Python script para facturas</span></a></div>
      <div data-test-id="conversation"><a href="/app/bbbbb22222"><span class="conversation-title">Resumen del examen de historia</span></a></div>
      <div data-test-id="conversation"><a href="/app/ccccc33333"><span class="conversation-title">Receta de empanadas</span></a></div>
      <div data-test-id="conversation"><a href="/app/ddddd44444"><span class="conversation-title">Idea de proyecto nuevo</span></a></div>
    </conversations-list></nav><main><textarea id="chat-input"></textarea></main></body>`
  },
  chatgpt: {
    url: 'https://chatgpt.com/c/zzzzz99999',
    html: `<body><nav aria-label="Historial"><ol>
      <li data-testid="history-item-0"><a href="/c/aaaaa11111"><div dir="auto">Fix javascript bug</div></a></li>
      <li data-testid="history-item-1"><a href="/c/bbbbb22222"><div dir="auto">Course summary</div></a></li>
      <li data-testid="history-item-2"><a href="/codex/tasks/task_e_ccccc33333"><div dir="auto">Remote Codex task</div></a></li>
    </ol></nav><main><div data-message-author-role="user">hola</div><div data-message-author-role="assistant">mundo</div><textarea id="prompt-textarea"></textarea></main></body>`
  },
  claude: {
    url: 'https://claude.ai/chat/zzzzz99999',
    html: `<body><nav aria-label="Sidebar"><ul>
      <li><a href="/chat/aaaaa11111"><span>Python API error</span></a></li>
      <li><a href="/chat/bbbbb22222"><span>Study summary</span></a></li>
      <li><a href="/chat/ccccc33333"><span>Travel notes</span></a></li>
    </ul></nav><main><textarea></textarea></main></body>`
  },
  deepseek: {
    url: 'https://chat.deepseek.com/a/chat/s/zzzzz99999',
    html: `<body><aside><ul>
      <li><a href="/a/chat/s/aaaaa11111"><span>SQL script optimization</span></a></li>
      <li><a href="/a/chat/s/bbbbb22222"><span>Math exam explain</span></a></li>
      <li><a href="/a/chat/s/ccccc33333"><span>Daily log</span></a></li>
    </ul></aside><main><textarea id="chat-input"></textarea></main></body>`
  },
  opencode: {
    url: 'https://opencode.ai/chat/zzzzz99999',
    html: `<body><aside><ul>
      <li><a href="/session/aaaaa11111"><span>React bug fix</span></a></li>
      <li><a href="/session/bbbbb22222"><span>Project design plan</span></a></li>
      <li><a href="/session/ccccc33333"><span>General chat</span></a></li>
    </ul></aside><main><textarea></textarea></main></body>`
  }
};

/**
 * Carga un content.js en un DOM simulado (jsdom) imitando cualquiera de las 5 plataformas soportadas.
 * Devuelve la ventana lista para interactuar.
 */
export function loadExtension(contentJsPath, platform = 'gemini', { storage = {}, initialSync = {}, html = null } = {}) {
  const fx = FIXTURES[platform];
  const dom = new JSDOM(`<!doctype html><html lang="es">${html || fx.html}</html>`, {
    url: fx.url,
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const { window } = dom;
  Object.entries(storage).forEach(([k, v]) => window.localStorage.setItem(k, v));
  window.chrome = createChromeMock({ initialSync, version: '3.5.7' });
  Object.defineProperty(window.navigator, 'language', { value: 'es-CL', configurable: true });
  window.URL.createObjectURL = () => 'blob:test';
  window.URL.revokeObjectURL = () => {};
  window.HTMLAnchorElement.prototype.click = () => {};
  window.eval(readFileSync(contentJsPath, 'utf8'));
  return window;
}

export const $ = (w, sel) => w.document.querySelector(sel);
export const $$ = (w, sel) => Array.from(w.document.querySelectorAll(sel));

export function click(w, el, extra = {}) {
  el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, view: w, ...extra }));
}
