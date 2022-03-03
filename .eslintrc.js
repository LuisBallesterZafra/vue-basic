module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended', 'eslint-config-prettier'],
	plugins: ['eslint-plugin-prettier'],
	rules: {
		'no-control-regex': 0
	}
}
