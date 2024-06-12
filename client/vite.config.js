import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000",
  //       secure: false, // Needs to be changed in the future!!!!!!
  //     },
  //   },
  // },
  plugins: [react()],
});
