import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
export default defineConfig({
  plugins: [
    react(),
    babel({
      jsx: "react"
    })
  ],
  server: {
    open: true,
    port: 3000
  }
});
