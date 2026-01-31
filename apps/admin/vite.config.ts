import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/admin/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 4000,
    cors: true,
    origin: "http://localhost:3000",
  },
});
