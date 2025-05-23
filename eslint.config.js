const { defineConfig } = require('eslint-define-config')
const importPlugin = require('eslint-plugin-import')
const prettierConfig = require('eslint-config-prettier')
const prettierPlugin = require('eslint-plugin-prettier')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const perfectionistPlugin = require('eslint-plugin-perfectionist')
const react = require('eslint-plugin-react')
const unusedImportsPlugin = require('eslint-plugin-unused-imports')
const printWidth = 80
module.exports = defineConfig({
	...prettierConfig,
	files: ['**/*.tsx', '**/*.ts', '**/*.js'],
	ignores: [
		'**/*.config.js',
		'.bundle/',
		'.eslintrc.js',
		'dist/',
		'node_modules/',
		'public/',
		'next.config.js',
		'*/**/svg',
		'*/**/svg',
		'**/*.config.ts',
	],
	languageOptions: {
		globals: {
			React: 'readonly',
		},
		parser: tsParser,
		parserOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
		},
	},
	plugins: {
		import: importPlugin,
		perfectionist: perfectionistPlugin,
		prettier: prettierPlugin,
		typescript: tsPlugin,
		react: react,
		'unused-imports': unusedImportsPlugin,
	},
	rules: {
		// 'max-len': ['error', { code: printWidth }],
		'react/react-in-jsx-scope': 0,
		'react/jsx-key': 2,
		'no-var': 2,
		'no-restricted-globals': 0,
		'perfectionist/sort-imports': [
			'error',
			{
				customGroups: {
					type: {
						lodash: 'lodash',
						react: ['react', 'react-*'],
					},
					value: {
						lodash: 'lodash',
						react: ['react', 'react-*'],
					},
				},
				groups: [
					'react',
					['builtin', 'external'],
					'internal',
					['parent-type', 'sibling-type', 'index-type'],
					['parent', 'sibling', 'index'],
					'object',
					'unknown',
				],
				newlinesBetween: 'never',
				order: 'asc',
				type: 'line-length',
			},
		],
		'prettier/prettier': [
			'error',
			{
				bracketSpacing: true,
				printWidth,
				semi: false,
				singleQuote: true,
				useTabs: true,
				trailingComma: 'es5',
			},
		],
		semi: ['error', 'never'],
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
	},
})
