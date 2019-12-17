module.exports = {
    root: true,
    parser:  '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    env: {
        node: true,
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'no-constant-condition': 'off',
        'no-unused-vars': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        //强制使用单引号
        quotes: ['warn', 'single'],
        //强制不使用分号结尾
        semi: ['warn', 'never'],
        'prettier/prettier': [
            'error',
            {
                bracketSpacing: true,
                semi: false,
                singleQuote: true,
                useTabs: false,
                tabWidth: 4,
                trailingComma: 'all',
                insertPragma: false, // 文件顶部不插入 @format
                printWidth: 120,
            },
        ],
    },          
}
