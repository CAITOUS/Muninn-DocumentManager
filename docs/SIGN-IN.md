# Signing in to GitHub (repo mode)

Repo mode needs a GitHub account that can see the repository holding your documents. What you can do in Muninn always follows your GitHub role:

| GitHub role | In Muninn |
|---|---|
| Read | View documents, comment on pull requests |
| Triage / Write | Create and edit drafts, commit, open pull requests, review others' work |
| Maintain / Admin | Also merge (publish), subject to branch rules |

There are two ways to sign in. Your admin will tell you which one your organisation uses.

---

## Option A — GitHub sign-in (if your organisation set up a relay)

1. Open the copy of Muninn your admin shared, usually `Muninn-<company>.html`. It already knows the repository and sign-in settings.
2. Click **Sign in**.
3. Muninn shows a short code, e.g. `ABCD-1234`, and a link to `github.com/login/device`.
4. Open the link, enter the code, and click **Authorize**. If your company uses single sign-on, you'll sign in with your work account here.
5. Muninn connects within a few seconds.

> Only approve codes **you** started in Muninn. Never enter a code someone sends you.

Sessions may expire (often after 8 hours). Just sign in again.

---

## Option B — Personal access token (works without a relay)

1. In GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**. Direct link: <https://github.com/settings/personal-access-tokens/new>
2. Fill in:
   - **Token name:** `Muninn`
   - **Expiration:** 90 days (or your organisation's policy)
   - **Resource owner:** the organisation that owns the documents repository. Some organisations must approve tokens first.
   - **Repository access:** *Only select repositories* → the documents repository
   - **Repository permissions:**

     | Permission | Access |
     |---|---|
     | Contents | Read and write (read-only if you'll only view) |
     | Pull requests | Read and write |
     | Metadata | Read-only (set automatically) |

3. Click **Generate token** and copy it. It starts with `github_pat_`.
4. In Muninn: **Connect → Connect to a GitHub repo** → enter the repository (`owner/repo`) → **Personal token** → paste → **Sign in**.
5. Pick the **publish branch** and **docs folder**, then click **Connect**.

The token is stored only in this browser. **Sign out & disconnect** removes it. On a shared computer, always sign out.

---

## First connection to a new repository

If the folder you pick isn't a Muninn library yet, Muninn offers **Set up docs here** (Write access needed). This adds a small `.switchboard-docs.json` file that marks the folder and holds the shared branding. If branch rules block direct changes, Muninn opens a pull request for it instead.

## Problems?

See **? Help → Troubleshooting** in Muninn, or [ADMIN-SETUP.md](ADMIN-SETUP.md#troubleshooting).
