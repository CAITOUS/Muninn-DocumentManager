# Changelog

## 1.1.0 — 2026-11-04

Nordic theme, light and dark modes, accessibility.

- New look shared across the CAITO tool suite: an airy Nordic palette with its own accent and icon (also the browser tab icon)
- **Light / dark toggle** in the header. It follows your device until you choose, then remembers your choice across all the tools
- Inter font (SIL Open Font License) is now built into the file, so the app makes no font requests and looks the same everywhere
- Accessibility: every control has a label, all text meets WCAG AA contrast in both modes, and keyboard focus is clearly visible
- The app interface moves to the shared theme with a dark mode; your document brand themes are unchanged in previews and exports.

## 1.0.1 — 2026-11-03

- Footer on every screen with authorship, LinkedIn and Portfolio Toolbox links
- Copyright notice uses the author's full name

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
