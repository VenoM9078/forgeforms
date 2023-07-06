import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.jsx",
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
