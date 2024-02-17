import { fileURLToPath, URL } from "node:url";
import mdx from "@mdx-js/rollup";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// import AutoImport from 'unplugin-auto-import/vite'
// import { unheadVueComposablesImports } from '@unhead/vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        mdx({
            jsxImportSource: "vue",
            remarkPlugins: [
                // See: https://github.github.com/gfm
                remarkGfm,
                // See: https://github.com/remarkjs/remark-frontmatter
                remarkFrontmatter,
                // See: https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
                remarkMath,
            ],
            rehypePlugins: [
                rehypeKatex,
            ],
        }),
        // AutoImport({
        //     imports: [
        //         unheadVueComposablesImports,
        //     ]
        // })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            output: {
                // manualChunks: {
                // }
            },
        },
    },
});
