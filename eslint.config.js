import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': ['warn', { args: 'none' }],
      // v-text/v-html on Vuetify components render text into the default slot
      // as intended here; treat as advisory rather than error.
      'vue/no-v-text-v-html-on-component': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/no-v-for-template-key-on-child': 'warn',
    },
  },
]
