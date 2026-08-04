import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config — runs the smoke tests against a Vite preview server that is
 * started automatically. Chromium only (the spec targets a modern Chromium
 * browser on a Mac). WebGL needs a GPU-ish context; we launch headless Chromium
 * with SwiftShader, which is sufficient for the DOM/state smoke tests.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  // One worker. Every test drives a real WebGL scene through SwiftShader, and two
  // of those on one machine starve each other badly enough that long playthroughs
  // time out at whatever assertion happens to be in flight. Serial is slower and
  // it is honest.
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'off',
    launchOptions: {
      args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    },
  },
  // Use the system Google Chrome (channel: 'chrome') so tests do not require
  // downloading Playwright's bundled Chromium. Falls back cleanly on any machine
  // with Chrome installed. Swiftshader flags let WebGL run headless.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
