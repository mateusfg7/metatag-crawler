import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // Unit tests live next to the source; e2e tests live under tests/e2e.
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
  },
})
