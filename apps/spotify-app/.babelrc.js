// apps/spotify-app/babelrc.js
module.exports = function (api) {
  api.cache(true);

  const isWeb =
    process.env.NX_TASK_TARGET_TARGET === 'build' ||
    process.env.NX_TASK_TARGET_TARGET?.includes('storybook');

  if (isWeb) {
    return {
      presets: [['@nx/react/babel', { runtime: 'automatic' }]],
    };
  }

  return require('../../babel.shared');
};
