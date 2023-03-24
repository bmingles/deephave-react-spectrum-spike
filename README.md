# React Spectrum in Deephaven

Experimenting with React Spectrum components with Deephaven core table subscriptions.

## Run the App

1. Clone the repo
2. npm i
3. Deephaven core needs to be running locally at `http://localhost:10000/`, or you'll need to adjust the vite proxy configuration
4. npm run dev

## dh-core.js

- dh-core.js is proxied to `http://localhost:10000/jsapi/dh-core.js`
- public/dh-core.js then makes it available via `window.dh`
- src/dh.ts re-exports this as a module

## Eslint Setup

https://gist.github.com/pixelmattersdev/e31c8283b57e99106cf6b4f6dd80de50

## react-spectrum local development

To make changes to `react-spectrum` source code, you can use to `relative-deps`
package to point npm dependencies to local copies. You'll have to map `"relativeDependencies"`
for packages under development to relative local paths.

e.g.

package.json

```json
"relativeDependencies": {
  "@adobe/react-spectrum": "../../thirdparty/react-spectrum-bmingles/packages/@adobe/react-spectrum",
  "@react-aria/virtualizer": "../../thirdparty/react-spectrum-bmingles/packages/@react-aria/virtualizer",
  "@react-spectrum/listbox": "../../thirdparty/react-spectrum-bmingles/packages/@react-spectrum/listbox",
  "@react-stately/collections": "../../thirdparty/react-spectrum-bmingles/packages/@react-stately/collections",
  "@react-stately/layout": "../../thirdparty/react-spectrum-bmingles/packages/@react-stately/layout",
  "@react-stately/list": "../../thirdparty/react-spectrum-bmingles/packages/@react-stately/list"
}
```

Vite is also pretty aggressive in caching node_modules, so you'll have to force
cache invalidation.

vite.config.ts

```ts
optimizeDeps: {
  force: true,
}
```

Then after any local change + build of react-spectrum code,
you'll need to re-run `npm run dev`.
