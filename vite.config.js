import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as packageJson from "./package.json";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      name: "ForgeForms",
      fileName: "forgeforms",
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)], // Specify external dependencies
      output: {
        globals: {
          react: "React", // Map react to global variable React
          "react-dom": "ReactDOM", // Map react-dom to global variable ReactDOM
        },
      },
    },
  },
});
