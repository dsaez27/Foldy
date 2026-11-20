import { updateStatusToast } from './dialogs.js';
import { refreshUI } from './main.js';
import { PLATFORM_KEY, PRESET_COLORS, normalizeThemePreset } from './platform.js';
import { autoClassifiedVisited, selectedMap, state, t } from './state.js';
import { sanitizeMap, saveFolderData } from './storage.js';

export { sanitizeMap };

export function exportBackupConfig() {
  // La posición del panel/barra y la vista actual son locales: no van en el respaldo.
  const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...backupData } = state.folderState;
  const dataStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${PLATFORM_KEY}-folders-backup-${new Date().toISOString().slice(0, 10)}.json`;
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
        lang: parsed.lang === 'en' || parsed.lang === 'es' ? parsed.lang : state.folderState.lang,
        folders: parsed.folders.map((f, idx) => ({
          id: typeof f?.id === 'string' && f.id ? f.id : `f_imp_${idx}_${Math.random().toString(36).slice(2, 6)}`,
          name: typeof f?.name === 'string' && f.name.trim() ? f.name.trim().slice(0, 40) : `Folder ${idx + 1}`,
          color: /^#[0-9a-fA-F]{6}$/.test(f?.color) ? f.color : PRESET_COLORS[idx % PRESET_COLORS.length],
          keywords: Array.isArray(f?.keywords)
            ? f.keywords.filter((k) => typeof k === 'string').map((k) => k.trim().toLowerCase()).filter(Boolean)
            : []
        })),
        prompts: Array.isArray(parsed.prompts)
          ? parsed.prompts
              .filter((p) => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.content === 'string')
              .map((p) => ({ id: p.id, title: p.title, content: p.content }))
          : state.folderState.prompts || [],
        assignments: sanitizeMap(parsed.assignments, (v) => (typeof v === 'string' && v ? v : undefined)),
        protectedIds: sanitizeMap(parsed.protectedIds, (v) => (v ? true : undefined)),
        minimized: !!parsed.minimized,
        pos: state.folderState.pos || null, // la posición del panel es local a esta pantalla
        toolbarPos: state.folderState.toolbarPos || null,
        view: {
          filter: 'ALL',
          sort: state.sortMode,
          toolbarCollapsed: state.toolbarCollapsed,
          toolbarVertical: state.toolbarVertical
        }
      };
      state.activeFolderFilter = 'ALL';
      autoClassifiedVisited.clear();
      selectedMap.clear();
      saveFolderData(state.folderState);
      document.getElementById('gcm-toolbar')?.remove();
      document.getElementById('gcm-folders-box')?.remove();
      refreshUI();
      updateStatusToast(t().toastBackupRestored, null, null, 3000);
      return true;
    }
  } catch (_) {}
  updateStatusToast(t().toastBackupInvalid, null, null, 3000);
  return false;
}

export function importBackupConfig(rawJsonString = null) {
  if (typeof rawJsonString === 'string' && rawJsonString.trim()) {
    return applyImportedBackupJson(rawJsonString);
  }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', (e) => {
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

const SYNC_CODE_PREFIX = 'foldy1:';

function uint8ToBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToUint8(str) {
  if (!str || typeof str !== 'string' || !/^[A-Za-z0-9\-_]+$/.test(str)) {
    throw new Error('Invalid base64url sync code');
  }
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function transformBytes(bytes, stream) {
  const writer = stream.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const reader = stream.readable.getReader();
  const chunks = [];
  let totalLen = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalLen += value.byteLength;
  }
  const out = new Uint8Array(totalLen);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

function normalizeSyncConfig(raw, { requireFoldersOrPrompts = false } = {}) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('Invalid sync config object');
  }
  if (requireFoldersOrPrompts && !Array.isArray(raw.folders) && !Array.isArray(raw.prompts)) {
    throw new Error('Missing folders or prompts in sync config');
  }

  const folders = Array.isArray(raw.folders)
    ? raw.folders
        .filter((f) => f && typeof f.id === 'string' && typeof f.name === 'string')
        .map((f, idx) => ({
          id: f.id,
          name: f.name.trim().slice(0, 40) || `Folder ${idx + 1}`,
          color: /^#[0-9a-fA-F]{6}$/.test(f.color) ? f.color : PRESET_COLORS[idx % PRESET_COLORS.length],
          keywords: Array.isArray(f.keywords)
            ? f.keywords.filter((k) => typeof k === 'string').map((k) => k.trim().toLowerCase()).filter(Boolean)
            : []
        }))
    : [];

  const prompts = Array.isArray(raw.prompts)
    ? raw.prompts
        .filter((p) => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.content === 'string')
        .map((p) => ({
          id: p.id,
          title: p.title,
          content: p.content
        }))
    : [];

  return {
    folders,
    prompts,
    lang: raw.lang === 'en' || raw.lang === 'es' ? raw.lang : 'es',
    themePreset: normalizeThemePreset(raw.themePreset),
    updatedAt: Number.isFinite(raw.updatedAt) ? raw.updatedAt : Date.now()
  };
}

export async function encodeSyncCode(config) {
  const normalized = normalizeSyncConfig(config);
  const rawBytes = new TextEncoder().encode(JSON.stringify(normalized));
  let payloadBytes = rawBytes;
  if (typeof CompressionStream === 'function') {
    payloadBytes = await transformBytes(rawBytes, new CompressionStream('gzip'));
  }
  return SYNC_CODE_PREFIX + uint8ToBase64Url(payloadBytes);
}

export async function decodeSyncCode(code) {
  if (typeof code !== 'string') {
    throw new Error('Sync code must be a string');
  }
  const trimmed = code.trim();
  if (!trimmed.startsWith(SYNC_CODE_PREFIX)) {
    throw new Error('Sync code must start with foldy1:');
  }
  const encoded = trimmed.slice(SYNC_CODE_PREFIX.length);
  const bytes = base64UrlToUint8(encoded);
  const isGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
  let plainBytes = bytes;
  if (isGzip) {
    if (typeof DecompressionStream !== 'function') {
      throw new Error('DecompressionStream is not available');
    }
    plainBytes = await transformBytes(bytes, new DecompressionStream('gzip'));
  }
  const jsonStr = new TextDecoder().decode(plainBytes);
  const parsed = JSON.parse(jsonStr);
  return normalizeSyncConfig(parsed, { requireFoldersOrPrompts: true });
}
