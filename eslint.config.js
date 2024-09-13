import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    ignores: [
      'node_modules',
      'public',
      'packages',
      'dist*',
      'README.md',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
      '@typescript-eslint/no-var-requires': 'off', // 允许使用 require() 函数导入模块
      '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
      '@typescript-eslint/no-unused-expressions': 'off', // 禁止出现未使用的表达式
      'eslint-comments/no-unlimited-disable': 'off',
      'regexp/no-unused-capturing-group': 'off', // 禁止在正则表达式中使用未使用的捕获组
      'no-unused-vars': 'off',
      'array-callback-return': 'off',
      'curly': ['error', 'all'],
      'antfu/consistent-list-newline': 'off',
      'no-irregular-whitespace': 'off', // 禁止不规则的空白
      'no-console': 'off', // 是否允许在代码中使用 console
      'eqeqeq': 'off', // 严格相等（=== 和 !==）而不是相等（== 和 !=）运算符。
      'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
      'vue/require-component-is': 'off', // 想使用动态组件而不想使用 v-bind:is 属性
      'no-unused-expressions': 'off',
      'vue/no-unused-refs': 'off',
      'vue/block-order': ['error', {
        order: ['route', 'template', 'script', 'style'],
      }],
    },
  },
  {
    files: [
      'src/**/*.vue',
      'src/**/**/*.vue',
    ],
  },
)
