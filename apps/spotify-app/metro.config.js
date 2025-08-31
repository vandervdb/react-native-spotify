const path = require('path');
const { withNxMetro } = require('@nx/react-native');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  cacheVersion: '@react-native-spotify/spotify-app',
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'crypto') {
        return context.resolveRequest(
          context,
          'react-native-quick-crypto',
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
    extraNodeModules: {
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-native': path.resolve(
        __dirname,
        '../../node_modules/react-native',
      ),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
    },
    watchFolders: [
      path.resolve(__dirname, '../../libs'),
      path.resolve(__dirname, '../../node_modules'),
    ],
  },
};

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  // Change this to true to see debugging info.
  // Useful if you have issues resolving modules
  debug: false,
  // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx', 'json'
  extensions: [],
  // Specify folders to watch, in addition to Nx defaults (workspace libraries and node_modules)
  watchFolders: [],
});
