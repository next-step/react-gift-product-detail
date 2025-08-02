import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import path from "path"

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "lottie-web",
        replacement: "lottie-web",
      },
    ],
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts", "./src/vitest.setup.ts"],
  },
})
