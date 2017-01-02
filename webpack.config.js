module.exports = {
  entry: "./src/App.js",
  output: {
  	path: "./static",
    filename: "bundle.js"
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