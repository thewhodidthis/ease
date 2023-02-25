## about

Yet another take on [Robert Penner's](https://github.com/robertpenner) easing functions.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `ease` -->
<script src="https://thewhodidthis.github.io/ease/ease.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/ease": "https://thewhodidthis.github.io/ease/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install @thewhodidthis/ease
```

## usage

To get a print out of all exports:

```js
import * as ease from "@thewhodidthis/ease"

Object.keys(ease).forEach((k) => {
  console.log(k)
})
```
