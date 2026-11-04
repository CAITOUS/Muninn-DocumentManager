# Releasing & update checks

Every copy of Muninn has a version number (footer and **Help → About**). It can check a small public file, `muninn.json`, each time it opens, and show a banner when a newer version exists. No login or credentials are involved.

## One-time setup

1. Publish this repository. The update file must be publicly readable.
2. In `muninn.json`, set `download` to your releases page, e.g. `https://github.com/OWNER/REPO/releases/latest`.
3. In `Muninn.html`, near the top of the script, set:

   ```js
   manifestUrl:'https://raw.githubusercontent.com/OWNER/REPO/main/muninn.json'
   ```

   Leave it as `''` to turn update checks off.

## Publishing a new version

1. In `Muninn.html`, update `version` and `released` in the `MUNINN` settings block.
2. Add an entry to `CHANGELOG.md`.
3. Update `muninn.json`:

   ```json
   { "latest": "1.1.0", "released": "2026-12-01", "download": "https://github.com/OWNER/REPO/releases/latest", "notes": "One-line summary shown in the banner." }
   ```

4. Commit, tag (`v1.1.0`) and create a GitHub release with `Muninn.html` attached.

Copies with an older version show: *"Muninn 1.1.0 is available — Get the update / Later"*.

## Moving the repository

Keep the old `muninn.json` in place and replace its contents with:

```json
{ "moved_to": "https://raw.githubusercontent.com/NEWOWNER/NEWREPO/main/muninn.json" }
```

Existing copies follow the pointer (up to three hops). New releases should use the new `manifestUrl`.

## Update checks in preconfigured copies

Preconfigured copies (`Muninn-<company>.html`) use the `manifestUrl` built into the version they were made from. When an organisation gets an update, an admin opens the new `Muninn.html`, connects, and clicks **Preconfigured app** again to produce a fresh copy for staff.
