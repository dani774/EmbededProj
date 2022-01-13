
module.exports = function(api) {
  api.cache(true);
  if (process.env.NODE_ENV === 'PRODUCTION') {
    return {
      "presets": ["module:metro-react-native-babel-preset"],
      "plugins": ["module:react-native-dotenv", ["transform-remove-console"]]
    }
  } else {
    return {
      "presets": ["module:metro-react-native-babel-preset"],
      "plugins": ["module:react-native-dotenv"]
    }
  }
}
