# Muninn sign-in relay (Cloudflare Worker)

This relay lets staff click **GitHub sign-in** in Muninn instead of pasting personal tokens.

GitHub's device sign-in can't be called directly from a web page, so this small Worker passes two requests through to `github.com` and adds the browser headers that page needs. It stores nothing and holds no secret: the GitHub token goes straight back to the user's browser.

You set this up once per organization. It takes about 15 minutes.

---

## 1. Create a GitHub App for your organization

1. In GitHub, go to **your organization → Settings → Developer settings → GitHub Apps → New GitHub App**.
2. Fill in the basics:
   - **Name:** e.g. `Muninn – <Org name>`
   - **Homepage URL:** your company site (any URL works)
   - **Webhook:** untick **Active**. No webhook is needed.
3. Tick **Enable Device Flow**. Muninn's sign-in depends on this.
4. Set these **Repository permissions**:

   | Permission | Access |
   |---|---|
   | Contents | Read and write |
   | Pull requests | Read and write |
   | Metadata | Read-only (set automatically) |

5. Under **Where can this GitHub App be installed?**, choose **Only on this account**.
6. Click **Create GitHub App**, then copy the **Client ID** (it starts with `Iv1.` or `Iv23`).
7. Click **Install App**, choose your organization, and select the repository (or repositories) that holds your documents.

> **Access stays with GitHub.** A user signed in through the app can only do what *both* the app and *their own GitHub role* allow. Read-only staff stay read-only; branch protection and required reviewers still apply.
>
> **Sessions expire.** If the app's user tokens expire (GitHub's default for GitHub Apps is 8 hours), users simply sign in again.

---

## 2. Deploy the Worker

### Option A: Cloudflare dashboard (no tools needed)

1. Go to **Cloudflare dashboard → Workers & Pages → Create → Create Worker**. Name it `muninn-relay` and deploy the starter.
2. Click **Edit code**, replace everything with the contents of `worker.js`, then **Deploy**.
3. Go to **Settings → Variables and Secrets** and add:
   - `CLIENT_ID` = the Client ID from step 1.6
   - `ALLOWED_ORIGINS` = `*` (or a narrower list; see below)
4. Copy the Worker URL, e.g. `https://muninn-relay.<your-account>.workers.dev`.

### Option B: command line

```bash
# in this folder, after editing CLIENT_ID in wrangler.toml
npx wrangler login
npx wrangler deploy
```

### Check it

Open the Worker URL in a browser. You should see:

```json
{"ok":true,"service":"muninn-relay"}
```

---

## 3. Point Muninn at the relay

Pick one:

- **Per user:** in Muninn, choose **Connect → GitHub sign-in** and enter the relay URL and Client ID.
- **For the whole team (recommended):**
  1. Connect to the repo once as a maintainer.
  2. Click **Preconfigured app**.
  3. Share the downloaded `Muninn-<org>.html`. It opens with the repo, docs folder and relay already filled in.

Signing in shows a short code. The user enters it at `github.com/login/device`, approves, and Muninn connects.

---

## Settings reference

| Variable | Required | Meaning |
|---|---|---|
| `CLIENT_ID` | Yes | The GitHub App's Client ID. The relay refuses any other ID, so it can't be used for someone else's app. |
| `ALLOWED_ORIGINS` | No | Comma-separated web origins allowed to call the relay. Default `*`. Use `null` for Muninn opened as a local `.html` file, e.g. `null,https://docs.example.com`. |

## Single sign-on (optional)

To have staff sign in to GitHub with their company account (Entra ID or another identity provider), configure SAML SSO or Enterprise Managed Users in **GitHub Enterprise Cloud**. That happens on GitHub's side, and Muninn and the relay need no changes: the sign-in page that users approve simply goes through your company login.

## What the relay does, exactly

| Route | Forwards to | Notes |
|---|---|---|
| `POST /login/device/code` | `https://github.com/login/device/code` | Starts sign-in, returns the user code |
| `POST /login/oauth/access_token` | `https://github.com/login/oauth/access_token` | Polled until the user approves |
| `GET /` | – | Health check |

Anything else returns `404`. No logs, storage or secrets are kept by this code. Cloudflare's own request logs follow your Cloudflare account settings.
