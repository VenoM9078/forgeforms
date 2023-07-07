import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import React from "react";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "ForgeForms",
      fileName: "forgeforms",
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Specify external dependencies
      output: {
        globals: {
          react: "React", // Map react to global variable React
          "react-dom": "ReactDOM", // Map react-dom to global variable ReactDOM
        },
      },
    },
  },
});
