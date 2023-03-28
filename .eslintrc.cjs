module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        'plugin:@intlify/vue-i18n/recommended'
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        '@intlify/vue-i18n/no-dynamic-keys': 'error',
        '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
            extensions: ['.js', '.vue']
        }
        ],
        "@intlify/vue-i18n/no-missing-keys-in-other-locales": [
            "error",
            {
              "ignoreLocales": ['en', 'pt-BR']
            }
          ],
    },
    "settings": {
        'vue-i18n': {
            localeDir: './src/locales/*.{json,json5,yaml,yml}', 
        }
    }
}
