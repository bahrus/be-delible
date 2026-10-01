# be-delible (⌫)

Make a DOM element delible.

[![Playwright Tests](https://github.com/bahrus/be-delible/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-delible/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-delible.png)](http://badge.fury.io/js/be-delible)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-delible?style=for-the-badge)](https://bundlephobia.com/result?p=be-delible)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-delible?compression=gzip">

## Markup:

```html
<label be-delible>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

or 

```html
<label ⌫>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

Clicking the button removes the element, and the button too, if it was placed outside the element.  The button's position and content can be adjusted:

```html
<label be-delible be-delible-trigger-insert-position=afterend be-delible-button-content=Delete>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

To save the browser from creating the button, it can also be included in the markup.  A `button.be-delible-trigger` at the trigger insert position is reused:

```html
<label be-delible>
    <input type="checkbox" name="">
    <span>Check me out</span>
    <button class="be-delible-trigger">⌫</button>
</label>
```

## Programmatic attachment (no attribute)

The attribute syntax shines for server-rendered HTML and progressive enhancement, where the markup alone says what the enhancement does.  But most web development today renders on the client, with a framework (Lit, React, Vue, Svelte, etc.) that already has a JavaScript reference to each element it creates.  There, attaching be-delible programmatically is the better fit:

1. **A less clunky API.**  Frameworks are awkward about setting arbitrary attributes, let alone an emoji one like `⌫`, or a family of them like `be-delible-trigger-insert-position=afterend`.  Programmatically, that is just `{triggerInsertPosition: 'afterend'}`.
2. **Less stringifying and parsing.**  Settings go straight onto the enhancement as property values, rather than being written to attributes and read back.
3. **Less overhead monitoring attributes.**  The attribute approach relies on be-hive / mount-observer watching the DOM for elements that carry (or gain) the attribute.  `def.js` just registers the config.  The enhancement is attached exactly when, and to exactly the elements, your code says, and mount-observer is never loaded.

Either way it is the **same enhancement**, with the same defaults, so the two approaches can be mixed in one app: attributes for server-rendered islands, programmatic attachment inside client-rendered components.

### Registration

```JavaScript
import { defBeDelible } from 'be-delible/def.js';
const emc = await defBeDelible(document.body); // or a shadow root's host, for a scoped registry
```

### Attribute → property mapping

| Attribute                             | Property                | Default        |
|---------------------------------------|-------------------------|----------------|
| `be-delible` (`⌫`)                    | *(attachment itself)*   |                |
| `be-delible-trigger-insert-position`  | `triggerInsertPosition` | `'beforeend'`  |
| `be-delible-button-content`           | `buttonContent`         | `'⌫'`          |

`triggerInsertPosition` takes any [`InsertPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#position) value.  As with the attribute path, a `button.be-delible-trigger` already in place is reused rather than a new one created.

### Declarative -- via `enh.set`

```JavaScript
// equivalent to <label be-delible be-delible-button-content=✕>
oLabel.enh.set.beDelible.buttonContent = '✕';
oLabel.enh.beDelible.triggerInsertPosition = 'afterend';
```

Only the first property needs to go through `.set` -- that is what attaches the enhancement.  This works before or after `defBeDelible` is called.  If it is called after, the enhancement is attached once the config is registered.

### Imperative -- via `enh.get()`

```JavaScript
Object.assign(oLabel.enh.get(emc), {
    buttonContent: 'Delete',
    triggerInsertPosition: 'afterend',
});
```

### Differences from the attribute path

- **Enhancement key.**  Programmatically, the instance is always at `el.enh.beDelible`.  With the emoji attribute it is at `el.enh['⌫']`.

See [demo/Programmatic](demo/Programmatic/) for runnable examples.

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser

## Running Tests

```
> npm run test
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-delible';
</script>
```

## Referencing via ESM Modules:

```JavaScript
import 'be-delible/be-delible.js';
```
