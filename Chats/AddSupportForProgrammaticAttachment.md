# Add Support For Programmatic Attachment

## Bruce's Ask

Can you please follow the example of [be-persistent](https://github.com/bahrus/be-persistent) and [the addendum](../types/ImportantEnhancementAddendum.md) to add demos and adjust be-delible.js as needed and add def.js to support programmatic attachment of this enhancement?

Please add your implementation notes below.

## Implementation Notes

be-delible can now be attached with no attribute and no be-hive, via
`el.enh.set.beDelible` or `el.enh.get(emc)`. It follows be-persistent and
addendum steps 1–6. Step 7 (accept elements wherever an id is accepted)
doesn't apply: be-delible takes no ids. This mirrors the be-clonable change
made just before this one; see
[be-clonable's notes](../../be-clonable/Chats/AddSupportForProgrammaticAttachment.md).

### What changed

| File | Change |
|------|--------|
| `def.js` (new) | `defBeDelible(ref)`, the formulaic copy of be-persistent's. |
| `be-delible.js` | `init` reads `ctx.emc \|\| ctx.config`, `await`s roundabout, then sets `initialized` (steps 1–2). |
| `emc.mjs` → `emc.json`, `⌫.json` | `enhKey` changed from `BeDelible` to `beDelible`. The `resolved` dispatch compact is replaced by `propagate: ['resolved']`. |
| `package.json` | Adds `assign-gingerly` to `dependencies`. `exports` fixed and extended. `files` now includes the two JSON files. |
| `types/be-delible/types.d.ts` | Adds `initialized?: boolean`. |
| `README.md` | New "Programmatic attachment (no attribute)" section (step 6). Also attribute examples for the two settings attributes and for a pre-rendered button. |
| `demo/Programmatic/` | `DeclarativeInSequence.html`, `DeclarativeOutOfSequence.html`, `Imperative.html`. |
| `tests/Programmatic*.{html,spec.mjs}` | One per pattern (step 5). |

### Things that were wrong before

1. **`package.json`:**
   - `exports["."]` pointed at `./delible.js`, which doesn't exist, so
     `import 'be-delible'` would fail. It now points at `./be-delible.js`.
   - `./emc.js` and `./⌫.js` also don't exist. They're replaced by
     `./def.js`, `./emc.json` and `./⌫.json`.
   - `files` (`*.js`) left out `emc.json`, which `def.js` imports.
   - `be-delible.js` imports assign-gingerly directly, but it wasn't a
     dependency. It only resolved through be-hive's dependency tree, at
     0.0.87, which is older than the 0.0.97 be-clonable and be-persistent
     use. I added `"assign-gingerly": "0.0.97"`.

2. **`enhKey` casing.** With `BeDelible`, the programmatic API would have
   been `el.enh.set.BeDelible`. It's now `beDelible`, like `bePersistent`.

3. **Existing console error on the attribute path.** The same roundabout
   bug as be-clonable: the `dispatch` compact checks `vm.propagator`, then
   calls `vm.dispatchEvent`, which BeDelible doesn't have. So each instance
   logged `vmAny.dispatchEvent is not a function` twice. I replaced it with
   `propagate: ['resolved']`.
   **Possible roundabout fix:** `processors/compacts.js` should probably
   call `vmAny.propagator.dispatchEvent(...)`. That would fix both packages
   without needing this workaround.

Unlike be-clonable, there was nothing to fix for addendum step 4. Both
settings (`triggerInsertPosition`, `buttonContent`) are referenced by
actions, so they are monitored. Setting them right after `enh.get(emc)`
works, and the imperative test confirms it. There's also no "clone" issue:
deleting creates nothing that needs enhancing.

### Tests

The three new specs follow be-persistent's fixtures. They load only
`def.js`: no attribute, no be-hive. Each one:
- checks the button was added, with the custom content and in the expected
  position;
- checks `resolved`;
- clicks the button, and checks that the element **and the button** were
  removed. The imperative test puts the button `afterend`, outside the
  element, so this checks `trigger?.remove()` too;
- asserts no console errors;
- asserts mount-observer was never requested. This backs the README's "less
  overhead" claim.

`test1.spec.mjs` (the attribute path) now also asserts no console errors.

Negative controls. Each fix was temporarily reverted, and its test failed
for the expected reason:

| Reverted | Result |
|----------|--------|
| `ctx.config` fallback removed | All 3 programmatic tests fail: "no trigger button added" |
| old dispatch compact restored | test1 fails on `vmAny.dispatchEvent is not a function` |

Final run: **4 passed**. The three demo pages, and both new README
attribute examples (custom position and content, and a pre-rendered button),
were also checked in the browser. In each, the element and its button are
removed, with no console errors.

### Other things to know

- `npm install` updated `package-lock.json`, for the new assign-gingerly
  dependency.
- `git status` shows the `legacy/` files as deleted. That was already the
  case before this change; I didn't touch them.
- The `types.d.ts` change is in this clone of the `types` submodule. It
  needs committing / pushing from there.

