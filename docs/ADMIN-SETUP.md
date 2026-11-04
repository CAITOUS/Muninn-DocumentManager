# Admin setup (repo mode)

This sets Muninn up for an organisation that keeps its documents in GitHub. Each organisation uses its **own** GitHub App, relay and repository; nothing depends on the author.

```
1. Documents repository ──► 2. GitHub App ──► 3. Sign-in relay (optional) ──► 4. Connect & set up ──► 5. Share preconfigured copy
```

---

## 1. Documents repository

- Create a **private** repository (or pick an existing one) and decide the docs folder, e.g. `docs`.
- **Protect the publish branch** (Settings → Branches / Rulesets):
  - Require a pull request before merging
  - Require at least **1 approving review**
  - Optional: require review from Code Owners (use a `CODEOWNERS` file to make department leads approve their folders)
- Give staff the right roles, ideally through teams (Read, Write, Maintain).

## 2. GitHub App (needed for "GitHub sign-in"; skip if staff use personal tokens)

1. **Organisation → Settings → Developer settings → GitHub Apps → New GitHub App**
2. Name: e.g. `Muninn – <Org>`. Homepage: any URL. **Webhook: untick Active.**
3. Tick **Enable Device Flow**.
4. Repository permissions: **Contents: Read & write**, **Pull requests: Read & write**, Metadata: Read.
5. Install only on **this account**. Create the app, then copy the **Client ID**.
6. **Install App** → your organisation → **only the documents repository**.

The app should be owned by the organisation, not a personal account, so it survives staff changes. A user's access through the app is always limited to what **both** the app and their own GitHub role allow.

## 3. Sign-in relay (optional)

Browsers can't call GitHub's sign-in endpoints directly, so "GitHub sign-in" needs a tiny relay. It holds no secret and stores nothing. Deploy it from [`relay/`](../relay/README.md) (Cloudflare Worker, about 15 minutes).

Without a relay, staff sign in with personal access tokens ([SIGN-IN.md](SIGN-IN.md#option-b--personal-access-token-works-without-a-relay)).

## 4. Connect and set up the library

1. Open `Muninn.html` → **Connect → Connect to a GitHub repo**.
2. Sign in, choose the publish branch and docs folder → **Connect**.
3. When asked, click **Set up docs here**. This creates `.switchboard-docs.json` in the docs folder.
4. On **Company & Brand**, set name, logo, theme, departments and naming → **Propose change (PR)** → merge it. Everyone now gets the same branding.

## 5. Share a preconfigured copy

In the Library (or on Connect), click **Preconfigured app**. This downloads `Muninn-<company>.html` with the repository, branch, docs folder and sign-in settings already filled in and locked. Share it through your intranet, Teams/SharePoint, or the repository itself.

To have that copy check for Muninn updates, see [RELEASING.md](RELEASING.md#update-checks-in-preconfigured-copies).

---

## Day-to-day flow

```
Edit ─► Commit ("What changed?") ─► Pull request ─► Review & comments ─► Approved? ─► Merge & publish
                                                          └── changes requested ──► back to Edit
```

- Editing a published document creates a branch and pull request automatically. The version is bumped if the author didn't.
- The revision table inside the document gets a row per version. The merge commit records `Approved-by` and `Merged-by`, shown in Muninn's **Git history** panel.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Could not reach the sign-in relay" | Open the relay URL in a browser; it should return `{"ok":true,...}` |
| `client_id_not_allowed` | The Client ID in Muninn must match the relay's `CLIENT_ID` exactly (it starts with a capital **I**) |
| "Repo not found" after sign-in | The GitHub App isn't installed on that repository, or the user can't see it |
| Merge "Blocked by branch rules" | The pull request still needs an approval or passing checks |
| Users can't approve their own PR | That's GitHub's rule. A different reviewer must approve |
| Folder mode unavailable in Brave | Enable `brave://flags/#file-system-access-api` and relaunch |
