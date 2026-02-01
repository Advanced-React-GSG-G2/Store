import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/admin/",
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "../../packages"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 4000,
    cors: true,
    origin: "http://localhost:3000",
  },
});
