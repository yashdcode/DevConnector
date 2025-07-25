// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dev-connector-backend-bbpc.vercel.app/", // your backend API
        changeOrigin: true,
        secure: false, // if you're using https locally and have self-signed cert
      },
    },
  },
});
