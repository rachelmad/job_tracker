module.exports = {
  entry: "./src/App.js",
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
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 }
}