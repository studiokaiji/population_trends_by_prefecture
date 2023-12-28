/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "#": path.resolve(__dirname, "functions/"),
    },
  },
});
