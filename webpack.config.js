const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  entry: ['babel-polyfill', 'whatwg-fetch', './app/app.jsx'],
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  watch: isProduction ? false : true,
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: [/node_modules/, /\/app\/lib\/FileSaver\.js/]
      }
    ],
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        include: [/\/app/],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader', // loaders order apply from right to left
      }, {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png&limit=100000',
      }, {
        test: /\.jpg$/,
        loader: 'file-loader',
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      }, {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: isProduction
    ? [
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
    : []
  ,
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
}
