module.exports = {
  stories: ['../src/**/stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  webpackFinal: async config => {
    // https://github.com/emotion-js/emotion/issues/1306#issuecomment-571442172
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['react-app', { flow: false, typescript: true }],
          // Emotion preset must run BEFORE reacts preset to properly convert css-prop.
          // Babel preset-ordering runs reversed (from last to first). Emotion has to be after React preset.
          require.resolve('@emotion/babel-preset-css-prop')
        ]
      }
    });
    return config;
  }
};
