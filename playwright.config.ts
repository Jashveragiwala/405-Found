import { defineConfig } from '@playwright/test'

// playwright.config.ts
export default defineConfig({
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Base URL to use in actions like `await page.goto('/')`. */
      baseURL: "http://localhost:5173",
    },
  });