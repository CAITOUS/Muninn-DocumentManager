/**
 * Muninn sign-in relay — Cloudflare Worker
 *
 * Lets Muninn (a browser app) use GitHub's device sign-in, which GitHub
 * does not allow browsers to call directly (no CORS). The relay only
 * forwards two requests to github.com and adds CORS headers.
 * It stores nothing and holds no secret.
 *
 * Settings (wrangler.toml [vars] or the Cloudflare dashboard):
 *   CLIENT_ID        Required. Your GitHub App's client ID. Other IDs are refused.
 *   ALLOWED_ORIGINS  Optional. Comma-separated origins allowed to call the relay,
 *                    e.g. "https://docs.example.com,null". "null" = Muninn opened as a
 *                    local file. Default "*" (any origin; acceptable because no secret is held).
 */
const ROUTES = {
  '/login/device/code': 'https://github.com/login/device/code',
  '/login/oauth/access_token': 'https://github.com/login/oauth/access_token',
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || 'null';
    const allowed = String(env.ALLOWED_ORIGINS || '*').split(',').map((s) => s.trim()).filter(Boolean);
    const allowOrigin = allowed.includes('*') ? '*' : allowed.includes(origin) ? origin : '';
    const cors = {
      'Access-Control-Allow-Origin': allowOrigin || 'https://invalid.origin',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };
    const reply = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!allowOrigin) return reply(403, { error: 'origin_not_allowed' });

    const url = new URL(request.url);
    const target = ROUTES[url.pathname];
    if (request.method === 'GET' && url.pathname === '/') return reply(200, { ok: true, service: 'muninn-relay' });
    if (request.method !== 'POST' || !target) return reply(404, { error: 'not_found' });

    let body;
    try { body = await request.json(); } catch { return reply(400, { error: 'invalid_json' }); }
    if (!env.CLIENT_ID) return reply(500, { error: 'relay_not_configured', error_description: 'Set CLIENT_ID on the relay.' });
    if (body.client_id !== env.CLIENT_ID) return reply(403, { error: 'client_id_not_allowed' });

    // Forward only the fields GitHub's device flow needs.
    const forward = url.pathname === '/login/device/code'
      ? { client_id: env.CLIENT_ID, scope: body.scope || 'repo' }
      : { client_id: env.CLIENT_ID, device_code: String(body.device_code || ''), grant_type: 'urn:ietf:params:oauth:grant-type:device_code' };

    const gh = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'muninn-relay' },
      body: JSON.stringify(forward),
    });
    return new Response(await gh.text(), { status: gh.status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  },
};
