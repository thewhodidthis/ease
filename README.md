## about

Yet another take on [Robert Penner's](https://github.com/robertpenner) easing functions.

## setup

Download from the _npm_ registry:

```sh
# Add to package.json
npm install @thewhodidthis/ease
```

Source from an import map to use with Deno or in-browser directly:

```json
{
  "imports": {
    "@thewhodidthis/ease": "https://cdn.jsdelivr.net/npm/@thewhodidthis/ease@latest/main.js"
  }
}
```

## usage

To get a print out of all exports:

```js
import * as ease from "@thewhodidthis/ease"

Object.keys(ease).forEach((k) => {
  console.log(k)
})
```
