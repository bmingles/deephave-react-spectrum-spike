import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const proxyTarget = "http://localhost:10000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/jsapi": {
        target: proxyTarget,
        changeOrigin: true,
      },
      "^/arrow\\.*": {
        target: proxyTarget,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
