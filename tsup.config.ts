import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  minify: true,
  external: ['src/components'],
  clean: true,
  // outDir: 'dist',
  // publicDir: 'src',
  loader: {
    '.css': 'copy',
  },
  // Ensure directory structure is preserved
  async onSuccess() {
    const { cp, mkdir } = await import('fs/promises')
    await mkdir('dist/styles', { recursive: true })
    await mkdir('dist/components', { recursive: true })
    await mkdir('dist/utils', { recursive: true })

    await cp('src/styles/global.css', 'dist/styles/global.css')
    await cp('src/component', 'dist/components', { recursive: true })
    await cp('src/utils/cn.tsx', 'dist/utils/cn.tsx')
  }
});
