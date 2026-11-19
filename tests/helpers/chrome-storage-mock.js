/**
 * Mock realista de `chrome.storage.sync` y `chrome.runtime` con cuotas MV3:
 * - QUOTA_BYTES_PER_ITEM = 8192
 * - MAX_WRITE_OPERATIONS_PER_MINUTE = 120
 * - Soporte de `storage.onChanged` y `runtime.onMessage`
 */
export function createChromeMock({
  initialSync = {},
  quotaBytesPerItem = 8192,
  maxWriteOpsPerMinute = 120,
  version = '3.5.6'
} = {}) {
  const syncStore = structuredClone(initialSync);
  const onChangedListeners = [];
  const onMessageListeners = [];
  let writeCount = 0;

  const chrome = {
    runtime: {
      lastError: null,
      getManifest: () => ({ version }),
      getURL: (p) => `chrome-extension://test/${p}`,
      onMessage: {
        addListener: (fn) => {
          if (typeof fn === 'function') onMessageListeners.push(fn);
        }
      }
    },
    storage: {
      sync: {
        QUOTA_BYTES_PER_ITEM: quotaBytesPerItem,
        MAX_WRITE_OPERATIONS_PER_MINUTE: maxWriteOpsPerMinute,
        get: (keys, cb) => {
          chrome.runtime.lastError = null;
          if (!keys) {
            cb?.(structuredClone(syncStore));
            return;
          }
          const keyList = Array.isArray(keys) ? keys : typeof keys === 'string' ? [keys] : Object.keys(keys);
          const out = {};
          for (const k of keyList) {
            if (Object.prototype.hasOwnProperty.call(syncStore, k)) {
              out[k] = structuredClone(syncStore[k]);
            }
          }
          cb?.(out);
        },
        set: (obj, cb) => {
          writeCount++;
          if (writeCount > maxWriteOpsPerMinute) {
            chrome.runtime.lastError = { message: 'MAX_WRITE_OPERATIONS_PER_MINUTE quota exceeded' };
            cb?.();
            return;
          }
          for (const [k, v] of Object.entries(obj || {})) {
            const bytes = Buffer.byteLength(k, 'utf8') + Buffer.byteLength(JSON.stringify(v), 'utf8');
            if (bytes > quotaBytesPerItem) {
              chrome.runtime.lastError = { message: `QUOTA_BYTES_PER_ITEM quota exceeded (${bytes} > ${quotaBytesPerItem})` };
              cb?.();
              return;
            }
          }
          chrome.runtime.lastError = null;
          const changes = {};
          for (const [k, v] of Object.entries(obj || {})) {
            const oldValue = syncStore[k];
            const newValue = structuredClone(v);
            syncStore[k] = newValue;
            changes[k] = { oldValue, newValue };
          }
          cb?.();
          for (const listener of onChangedListeners) {
            listener(structuredClone(changes), 'sync');
          }
        }
      },
      onChanged: {
        addListener: (fn) => {
          if (typeof fn === 'function') onChangedListeners.push(fn);
        }
      }
    },
    __mock: {
      getSyncStore: () => syncStore,
      getWriteCount: () => writeCount,
      resetWriteCount: () => {
        writeCount = 0;
      },
      emitExternalSyncChange: (key, newValue) => {
        const oldValue = syncStore[key];
        syncStore[key] = structuredClone(newValue);
        const changes = { [key]: { oldValue, newValue: structuredClone(newValue) } };
        for (const listener of onChangedListeners) {
          listener(changes, 'sync');
        }
      },
      sendRuntimeMessage: (msg, sender = {}) => {
        let response;
        for (const listener of onMessageListeners) {
          listener(msg, sender, (res) => {
            response = res;
          });
        }
        return response;
      }
    }
  };

  return chrome;
}
