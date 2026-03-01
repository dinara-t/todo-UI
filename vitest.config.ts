import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/config/setup-tests.js"],
    globals: true,
    css: true,
  },
});
