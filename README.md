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

## Viewing this element locally

Any web server than can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js
4.  Install Python 3 or later
5.  Open command window to folder where you cloned this repo.
6.  > npm install
7.  > npm run serve
8.  Open http://localhost:8000/demo/ in a modern browser.

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
