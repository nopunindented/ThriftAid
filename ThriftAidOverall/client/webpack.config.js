const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  // ... other webpack configuration options ...

  experiments: {
    topLevelAwait: true,
  },

  // ... other webpack configuration options ...

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Your Babel configuration
          },
        },
      },
      // ... other rules ...
    ],
  },

  // ... other webpack configuration options ...

  plugins: [
    new ReactRefreshWebpackPlugin(),

    // ... other plugins ...
  ],
};
