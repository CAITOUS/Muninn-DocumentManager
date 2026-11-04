# Document format

Every Muninn document is one Markdown file: YAML front matter for properties, then headings for the template sections. Any tool can read and edit it. Muninn reads it back without losing anything.

## File layout

```
<docs folder>/
├─ .switchboard-docs.json            ← marks a repo docs folder (repo mode only)
├─ _templater/company.json           ← branding (local mode)
├─ SOP/<DEPT>/<ID> - <Title>.md
├─ SOP/<DEPT>/assets/<doc uid>/…png  ← step screenshots
├─ KBA/<DEPT>/<ID> - <Title>.md
└─ _Archive/                         ← archived and replaced originals (local mode)
```

## Front matter

```yaml
---
uid: k3j9x2ab          # stable internal id; keep it when copying files
type: sop              # sop | kbats (troubleshooting) | kbahow (how-to)
id: NWD-SOP-IT-004
title: Verify Nightly Backups
department: IT
number: "4"
version: "1.1"
status: Approved       # Draft | In Review | Approved | Retired
owner: Jordan Lee
owner_role: IT Coordinator
approver: Practice Director
effective: 2026-10-01
review: 2027-10-01
classification: Internal Use
site:                  # any extra properties are kept exactly as written
  - Main St
  - Riverside
---
```

- Files without a recognised `type` are ignored (they can be imported via **Import / migrate**).
- Unknown properties, comments and formatting in the front matter are preserved byte for byte unless edited in Muninn.

## Body

```markdown
# Verify Nightly Backups

## 1. WHY — Purpose & Scope
### Purpose
...
## 4. HOW — Procedure
### Steps
1. **Check last night's jobs**
   Every job should show Success.
   ![Backup console](assets/k3j9x2ab/step2-demo.png)
   > ⚠ Caution: A Warning still means some files may be missing.

## 5. REF — References
- [[NWD-SOP-IT-002 - Offsite Backup Rotation]]
- [Backup Policy.pdf](../../Policies/Backup%20Policy.pdf)

## Revision History
| Version | Date | Author | Change Summary |
| --- | --- | --- | --- |
| 1.1 | 2026-10-01 | Jordan Lee | Added warning handling |
```

- Section and field headings are matched by name, so numbering and the `WHY —` prefixes are optional.
- Headings that don't match the template are kept under **Other sections** and written back at the end.
- `[[wiki-links]]` resolve in Obsidian. Relative links work on GitHub and in Obsidian.
