/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.test.{js,ts,jsx,tsx}"],
    coverage: {
      include: ["src/**/*.{js,ts}"],
      exclude: ["src/**/__mocks__/**"],
      all: true,
      reporter: ["html", "clover", "text"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "#": path.resolve(__dirname, "functions/"),
      "~": path.resolve(__dirname, "tests/"),
    },
  },
});
