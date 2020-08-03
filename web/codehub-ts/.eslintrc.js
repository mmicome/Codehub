module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends:  ['plugin:vue/recommended',"eslint:recommended","plugin:vue/essential", "@vue/prettier"],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debug': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    _: "true", 
    $: "true",
    api: "true" //
  },
  parserOptions: {
    ecmaVersion: 6,
    parser: "babel-eslint"
  }
}