const path = require('path');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  entry: './public-mock/main.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['main.js','admin-screen.js'],
      rules: [{
        search: /`(.*?)`/gms,
        replace: function (match) {
          let htmlString = match.replace(/^\s+/gm, '');
          htmlString = htmlString.replace(/\s\s*$/gm, '');
          htmlString = htmlString.replace(/\r?\n|\r/g, '');
          return htmlString;
        }
      }]
    }])
  ]
};