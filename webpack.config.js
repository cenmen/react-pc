const path = require('path')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: 'js/[name].bundle.[contenthash:6].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new DefinePlugin({
      ENV: '"production"'
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      template: 'template.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['styled-jsx/babel']
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
