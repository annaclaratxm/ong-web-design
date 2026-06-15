import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html"],
      include: [
        "components/**/*.{ts,tsx}",
        "contexts/**/*.{ts,tsx}",
        "hooks/**/*.{ts,tsx}",
        "services/**/*.{ts,tsx}",
        "utils/**/*.{ts,tsx}",
      ],
      exclude: [
        "components/ui/**",
        "hooks/use-mobile.ts",
        "hooks/use-toast.ts",
        "types/**",
        "**/*.d.ts",
        "**/*.{test,spec}.{ts,tsx}",
      ],
    },
  },
})
