const path = require("path");
const Dotenv = require("dotenv-webpack");
const { DefinePlugin } = require('webpack');


const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const buildInfo = require('./build-info.json');

module.exports = {
  entry: {
    index: "./src/index.js",
  },

  plugins: [

    new DefinePlugin({
      'process.env.BUILD_NUMBER': JSON.stringify(buildInfo.buildNumber),
    }),

    new Dotenv(),

    new CleanWebpackPlugin(),
    
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "styles.css"
    }),

    new HtmlWebpackPlugin({
      title: "Production",
      favicon: "./assets/resource/favicon.ico",
      template: "./src/index.html",
      filename: path.resolve(__dirname, "dist", "index.html"),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './assets',
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),


  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: path.resolve(__dirname, "dist")
    //publicPath: "/"
  },

  optimization: {
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: "assets/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "assets/resource",
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader', // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
    ],
  },
};
