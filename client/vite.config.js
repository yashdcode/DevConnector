// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dev-connector-backend-bbpc.vercel.app/",
        // target: "http://localhost:5000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
