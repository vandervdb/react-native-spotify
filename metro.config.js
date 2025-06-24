const { getDefaultConfig } = require('metro-config');
const path = require('path');
const workspaceLibs = [
  'auth-client',
  'auth-store',
  'core-config',
  'core-constants',
  'core-domain',
  'core-dto',
  'core-logger',
  'http-client',
  'keychain-service',
  'player-state',
];

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: new Proxy(
        {},
        {
          get: (_, name) => path.join(__dirname, `node_modules/${name}`),
        },
      ),
    }, // 👇 metro doit surveiller ces libs
    watchFolders: workspaceLibs.map((lib) => path.resolve(__dirname, lib)),
  };
})();
