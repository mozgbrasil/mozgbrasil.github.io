/** @type {import('prettier').Options} */
module.exports = {
  //   endOfLine: 'lf',
  arrowParens: "always",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxBracketSameLine: false,
  //   jsxSingleQuote: true,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  //   singleQuote: true,
  tabWidth: 2,
  trailingComma: "all", // all, es5
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: "*.{md}",
      options: {
        proseWrap: "never",
        singleQuote: false,
        trailingComma: "none",
      },
    },
    {
      files: "*.{yml,yaml}",
      options: {
        singleQuote: false,
        trailingComma: "none",
      },
    },
  ],
};
