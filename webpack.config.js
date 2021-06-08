const path = require('path')
module.exports = {
  entry: './src/engine.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    publicPath: 'public',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}
