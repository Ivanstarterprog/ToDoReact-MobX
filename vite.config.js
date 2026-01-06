import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@styles": path.resolve(__dirname, "src/shared/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
    },
  },
});
