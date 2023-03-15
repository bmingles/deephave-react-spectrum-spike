## dh-core.js

- dh-core.js is proxied to `http://localhost:10000/jsapi/dh-core.js`
- public/dh-core.js then makes it available via `window.dh`
- src/dh.ts re-exports this as a module
