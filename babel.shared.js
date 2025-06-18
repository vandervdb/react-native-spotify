// babel.shared.js
module.exports = {
  presets: [['module:@react-native/babel-preset', { useTransformReactJSX: true }]],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
      },
    ],
  ],
};
