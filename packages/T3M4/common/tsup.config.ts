import { defineConfig } from "tsup";

export default defineConfig(() => {
  return [
    {
      entry: ["src/index.ts", "src/types/index.ts"],
      sourcemap: false,
      minify: true,
      dts: true,
      clean: true,
      format: ["esm", "cjs"],
      splitting: false,
      bundle: true
    },
  ];
});
