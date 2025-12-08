const js = require('@eslint/js')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const path = require('path')

module.exports = tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      import: require('eslint-plugin-import')
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020
      }
    }
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  }
)
