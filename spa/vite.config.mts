import { createLogger, defineConfig, Plugin } from "vite";
import { fileURLToPath, URL } from "node:url";

import vueRouter from "unplugin-vue-router/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
// import { unheadVueComposablesImports } from '@unhead/vue'

import svgLoader from 'vite-svg-loader'

// export const disableAttributeInheritance = (disable = true): Plugin => ({
//   name: 'DisableInheritAttributesPlugin',
//   transform: (src, id) => ({
//     code: (()=>{
//         if (id.endsWith(".vue") && disable) {
//             return src + `\n\n\n<script lang="ts">\nexport default { inheritAttrs: false };\n</script>\n`;
//         } else {
//             return src;
//         }
//     })(),
//     map: null
//   })
// });

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // See: https://github.com/posva/unplugin-vue-router
        vueRouter({
            routesFolder: [
                "src/pages",
                {
                    src: "src/features/landing-page/pages",
                    path: "",
                },
            ],
        }),
        // disableAttributeInheritance(true),
        vue(),
        vueJsx({}),
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
        AutoImport({
            imports: [
                VueRouterAutoImports,
                {
                    "@/framework_features/seo": [
                        ["default", "seo"],
                    ],
                },
                // unheadVueComposablesImports,
            ],
        }),
        svgLoader()
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "framework": fileURLToPath(new URL("./src/framework_features", import.meta.url)),
            "shared": fileURLToPath(new URL("./src/_shared_", import.meta.url)),
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
