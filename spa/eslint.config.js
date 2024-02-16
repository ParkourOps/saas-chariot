/* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution");
const { FlatCompat } = require("@eslint/eslintrc");
const eslintrc = new FlatCompat({
    baseDirectory: __dirname,
});

/** @type { import("eslint").Linter.FlatConfig[] } */
module.exports = [
    ...eslintrc.plugins("vue", "promise", "import"),
    ...eslintrc.extends(
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-typescript",
        // '@vue/eslint-config-prettier/skip-formatting'
    ),
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
            },
        },
        files: [
            // vue
            "**/*.vue",
            // js
            "**/*.js",
            "**/*.jsx",
            "**/*.cjs",
            "**/*.mjs",
            // ts
            "**/*.ts",
            "**/*.tsx",
            "**/*.cts",
            "**/*.mts",
        ],
        ignores: [
            "dist/**/*",
        ],
        rules: {
            "indent": ["error", 4],
            "quotes": ["error","double"],
            "semi": "error",
            "comma-dangle": ["error", "always-multiline"],
            "no-trailing-spaces": "error",
        },
    },
];
