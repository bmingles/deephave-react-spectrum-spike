import { dh } from "@deephaven/jsapi-types";

declare global {
  interface Window {
    // This is set via public/dh-core.js
    dh: dh;
  }
}
export {};
