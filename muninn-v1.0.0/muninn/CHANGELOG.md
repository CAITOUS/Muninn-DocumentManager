# Changelog

## 1.0.0 — 2026-11-03

First public release.

- SOP (Why/Who/What/How) and KBA (troubleshooting, how-to) templates with live branded preview
- Company branding: logo, eight colour themes, configurable document IDs, document-control defaults
- Storage modes: this browser, local folders (File System Access), GitHub repositories
- Markdown + YAML front matter format; passthrough properties (add, edit, remove)
- Repo mode: GitHub token or device-flow sign-in via relay, roles from GitHub, branch + pull request per change, comments, approve / request changes, merge, git history
- Hybrid revision history: in-document table plus `Approved-by` / `Merged-by` on merge commits
- Step cautions and screenshots (paste, drag, upload) saved as files
- References explorer across the library and other repositories, with a selection list
- Import & migrate: Word, Markdown (properties kept), HTML, text; heading-based auto-mapping with review; legacy `.sopkba.json` conversion
- AI assist (bring your own): copy/paste, Claude, OpenAI, Anthropic, Gemini, Azure OpenAI, OpenAI-compatible local models, webhooks
- Exports: Word (.docx), HTML, Markdown; blank branded templates
- In-app help guide with screenshots, workflow diagrams and demo mode
- Version check against a public `muninn.json`, with repository-move support
- Optional Cloudflare Worker sign-in relay
