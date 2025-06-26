const path = require('path');

module.exports = {
  presets: [
    ['module:@react-native/babel-preset', { useTransformReactJSX: true }],
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          crypto: 'react-native-quick-crypto',
          stream: 'readable-stream',
          buffer: '@craftzdog/react-native-buffer',

          // ✅ Alias avec chemins absolus
          '@react-native-spotify/auth-client': path.resolve(
            __dirname,
            'auth-client/src',
          ),
          '@react-native-spotify/core-config': path.resolve(
            __dirname,
            'core-config/src',
          ),
          '@react-native-spotify/core-constants': path.resolve(
            __dirname,
            'core-constants/src',
          ),
          '@react-native-spotify/core-domain': path.resolve(
            __dirname,
            'core-domain/src',
          ),
          '@react-native-spotify/core-dto': path.resolve(
            __dirname,
            'core-dto/src',
          ),
          '@react-native-spotify/core-logger': path.resolve(
            __dirname,
            'core-logger/src',
          ),
          '@react-native-spotify/http-client': path.resolve(
            __dirname,
            'http-client/src',
          ),
          '@react-native-spotify/keychain-service': path.resolve(
            __dirname,
            'keychain-service/src',
          ),
          '@react-native-spotify/player-state': path.resolve(
            __dirname,
            'player-state/src',
          ),
          '@react-native-spotify/spotify-client': path.resolve(
            __dirname,
            'spotify-client/src',
          ),
        },
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
