import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  platform: "node",
  target: "es2022",
  bundle: true,
  dts: false,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
