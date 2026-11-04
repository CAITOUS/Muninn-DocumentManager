# Security & data handling

## What Muninn talks to

| Destination | When | What is sent |
|---|---|---|
| Your folder | Local mode | Document and image files, via the browser's File System Access permission |
| `api.github.com` | Repo mode | Your GitHub token; reads and writes in the connected repository |
| Your sign-in relay | GitHub sign-in | The GitHub App Client ID and a one-time device code (no secrets) |
| Your AI provider | Only when you click AI assist | The document content and your notes, to the provider **you** configured |
| `muninn.json` URL | On open, if configured | A plain request; no credentials or cookies |

There is no Muninn server, telemetry or analytics.

## What stays in the browser

- Last connection, recent repositories, branding and settings
- The GitHub token, until **Sign out & disconnect**
- AI provider settings and keys (never written to folders, repositories or backups)
- Drafts **only** in "This browser" mode

Documents in local and repo mode are read live and not cached. Uncommitted repo edits live only in the open page; Muninn warns before the page is closed.

## Readable configuration

A preconfigured copy contains the repository name, branch, docs folder, relay URL and GitHub App Client ID. None of these are secrets: a Client ID is public by design, and a private repository stays private.

## Recommendations

1. GitHub App: minimum permissions (Contents, Pull requests, Metadata), installed on the docs repository only, user-token expiration on.
2. Protect the publish branch with required reviews, so a stolen token can't publish alone.
3. Require 2FA (and SSO where available) for the organisation.
4. Train staff to approve only device codes they started themselves.
5. Sign out on shared computers.
6. Optional: add a Cloudflare rate-limiting rule to the relay.

## Reporting

Please report security issues privately to the repository owner rather than in a public issue.
