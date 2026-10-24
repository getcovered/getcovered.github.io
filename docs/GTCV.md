# The .gtcv file

A `.gtcv` file is a saved GetCovered cover. It is plain JSON, so you can read it, diff it and keep it in Git.

```json
{
  "format": "gtcv",
  "version": 1,
  "app": "GetCovered",
  "appVersion": "2.0.0",
  "savedAt": "2026-10-24T16:00:00.000Z",
  "data": {
    "template": "classic",
    "university": { "id": "nsu", "customName": "" },
    "logo": { "custom": "", "size": 100, "position": "center" },
    "assignment": { "type": "Report", "title": "…" },
    "course": { "code": "ECO101", "section": "7", "title": "…" },
    "faculty": { "name": "…", "designation": "…", "department": "…" },
    "submission": { "mode": "individual", "date": "2026-10-24", "semester": "Fall 2026" },
    "individual": { "name": "…", "id": "…", "department": "…", "extra": "" },
    "group": { "number": "", "members": [{ "name": "", "id": "" }] },
    "page": { "linked": true, "margin": 1, "marginX": 1, "marginY": 1, "align": "center" }
  }
}
```

`data` holds every stored field from `assets/js/core/schema.js`. [FIELDS.md](FIELDS.md) lists them.

## Opening a file is safe

`parse()` in `assets/js/core/gtcv.js` never trusts a file. It checks `format` and `version`, then passes `data`
through `sanitize()`, which keeps only fields that exist in the schema, clamps numbers to their range, cuts text
to its maximum length, and accepts a logo only if it is a real PNG, JPEG, WebP or GIF data URL. Anything invalid
is dropped (and reported) and the default is used instead. A file can never add keys or inject markup.

## Old BYCP files

A `.json` file saved by the original BYCP is recognised by its fields and converted. The old left margin becomes
the left and right margin, with separate top and bottom margins turned on; for group covers the old "section"
value becomes the group number.

## Changing the format

1. Bump `GTCV.version` in `gtcv.js`.
2. Add `MIGRATIONS[oldVersion] = (data) => newData` that upgrades one step.
3. Add a test that opens a file saved with the previous version.

Older files then keep opening. A file from a *newer* version is refused with a message asking the person to
reload the app.

Adding a field does **not** need a version bump: a missing field simply takes its default.
