import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";
  const useWorkerd = process.env.USE_WORKERD === "true";

  return {
    plugins: [
      (isBuild || useWorkerd) &&
        cloudflare({
          viteEnvironment: {
            name: "ssr",
          },
        }),
      tailwindcss(),
      reactRouter(),
    ].filter(Boolean),
  };
});
