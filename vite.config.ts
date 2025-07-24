import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.NODE_ENV === "production" ? "/survey-app/" : "/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
