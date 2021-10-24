module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'indent': 'off',
        'semi': 'off',
        'space-before-function-paren': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
