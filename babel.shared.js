// babel.shared.js
module.exports = {
  presets: [['module:@react-native/babel-preset', { useTransformReactJSX: true }]],
  plugins: [
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
      },
    ],
  ],
};
