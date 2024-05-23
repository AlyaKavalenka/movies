module.exports = {
  extends: ['mantine', "next", "next/core-web-vitals", 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ["prettier"],
  rules: {
    'react/react-in-jsx-scope': 'off',
    "prettier/prettier": "error",
    'import/extensions': 'off',
  },
};