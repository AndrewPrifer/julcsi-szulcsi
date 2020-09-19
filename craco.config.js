// https://github.com/emotion-js/emotion/issues/1123#issuecomment-455767886
const emotionPresetOptions = {};

const emotionBabelPreset = require("@emotion/babel-preset-css-prop").default(
  undefined,
  emotionPresetOptions
);
const reactHotReloadPlugin = require("craco-plugin-react-hot-reload");

module.exports = {
  plugins: [
    {
      plugin: reactHotReloadPlugin
    }
  ],
  babel: {
    plugins: [...emotionBabelPreset.plugins]
  }
};
