export const GIST_FILENAME = 'foldy-sync.json';
export const GIST_STORAGE_KEY = 'gcm_gist_config';

const GITHUB_API_BASE = 'https://api.github.com';

async function githubRequest(fetchFn, url, token, options = {}) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  const res = await fetchFn(url, {
    ...options,
    headers,
    signal: options.signal ?? AbortSignal.timeout?.(10000)
  });

  if (!res.ok) {
    let detail = '';
    try {
      const errBody = await res.json();
      detail = errBody?.message ? `: ${errBody.message}` : '';
    } catch (_) {}
    throw new Error(`GitHub Gist API error ${res.status}${detail}`);
  }

  return res.json();
}

/**
 * Synchronizes Foldy shared config with a private GitHub Gist (`foldy-sync.json`).
 * Pure & dependency-injected (`fetchFn`) so it runs cleanly in both extension and tests.
 */
export async function syncWithGist({ token, gistId = '', localConfig = {}, fetchFn = fetch } = {}) {
  const cleanToken = typeof token === 'string' ? token.trim() : '';
  if (!cleanToken) {
    throw new Error('GitHub token is required');
  }

  let targetGistId = typeof gistId === 'string' ? gistId.trim() : '';

  if (!targetGistId) {
    const gists = await githubRequest(fetchFn, `${GITHUB_API_BASE}/gists?per_page=30`, cleanToken, {
      method: 'GET'
    });
    const existing = Array.isArray(gists) ? gists.find((g) => g?.files?.[GIST_FILENAME]) : null;

    if (!existing) {
      const created = await githubRequest(fetchFn, `${GITHUB_API_BASE}/gists`, cleanToken, {
        method: 'POST',
        body: JSON.stringify({
          public: false,
          description: 'Foldy Sync Config',
          files: {
            [GIST_FILENAME]: {
              content: JSON.stringify(localConfig, null, 2)
            }
          }
        })
      });
      return {
        action: 'created',
        gistId: created?.id || '',
        config: localConfig
      };
    }

    targetGistId = existing.id;
  }

  const gistData = await githubRequest(
    fetchFn,
    `${GITHUB_API_BASE}/gists/${encodeURIComponent(targetGistId)}`,
    cleanToken,
    { method: 'GET' }
  );

  let remoteConfig = null;
  const rawContent = gistData?.files?.[GIST_FILENAME]?.content;
  if (typeof rawContent === 'string' && rawContent.trim()) {
    try {
      const parsed = JSON.parse(rawContent);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        remoteConfig = parsed;
      }
    } catch (_) {
      remoteConfig = null;
    }
  }

  const remoteUpdated = Number(remoteConfig?.updatedAt) || 0;
  const localUpdated = Number(localConfig?.updatedAt) || 0;

  if (remoteConfig && remoteUpdated > localUpdated) {
    return {
      action: 'pulled',
      gistId: targetGistId,
      config: remoteConfig
    };
  }

  await githubRequest(
    fetchFn,
    `${GITHUB_API_BASE}/gists/${encodeURIComponent(targetGistId)}`,
    cleanToken,
    {
      method: 'PATCH',
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(localConfig, null, 2)
          }
        }
      })
    }
  );

  return {
    action: 'pushed',
    gistId: targetGistId,
    config: localConfig
  };
}
