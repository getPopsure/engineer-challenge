import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";

  return {
    plugins: [react(), tsconfigPaths()],
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  };
});
