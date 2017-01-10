var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./src/app/App.js",
  devtool: 'source-map',
  output: {
  	path: "./static",
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  watch: true,
  module: {
   loaders: [
     {
       test: [/\.js$/, /\.es6$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015'] 
       }
     },
     {
       test: /\.css/,
       loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 },
 plugins: [
   new ExtractTextPlugin("styles.css")
 ]
}