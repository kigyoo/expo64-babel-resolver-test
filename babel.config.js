const packageJSON = require('./package.json');
const shopName = packageJSON.name;
const shopPath = `./shops/${shopName}`;

module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      ["module-resolver", {
        root: [shopPath, "./"],
        extensions: ['.js', '.json', '.png', '.plist'],
        alias: {
          'assets': [`${shopPath}/assets`, './assets'],
          'components': [`${shopPath}/components`, './components',],
          'constants': './constants',
          'config': shopPath
        },
        cwd: "packagejson"
      }],
      'react-native-reanimated/plugin'
    ]
  };
};
