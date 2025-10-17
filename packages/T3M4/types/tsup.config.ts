import { defineConfig } from "tsup";

export default defineConfig(() => {
  return [
    {
      entry: ["src/index.ts"],
      sourcemap: false,
      minify: true,
      dts: true,
      clean: true,
      format: ["esm"],
      splitting: false,
      bundle: true
    },
  ];
});
