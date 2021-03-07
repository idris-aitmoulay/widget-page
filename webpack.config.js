const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/styles/main.less'), 'utf8'));

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "src");

const WEBPACK_MODE = {
  development: 'development',
  production: 'production'
};

module.exports = (_, { mode }) => {
  let devtool;

  if (mode === WEBPACK_MODE.development) {
    devtool = 'source-map';
  }

  return ({
    devtool,
    entry: `${APP_DIR}/index.js`,
    output: {
      filename: "js/bundle.js",
      path: BUILD_DIR,
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            plugins: [
              ['import', { libraryName: "antd", style: true }]
            ]
          },
        },
        {
          test: /\.less$/,
          use: [
            {loader: "style-loader"},
            {loader: "css-loader"},
            {loader: "less-loader",
              options: {
                modifyVars: themeVariables,
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader?name=images/[name].[ext]'
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      watchContentBase: true,
      contentBase: "./public"
    },
    resolve: {
      extensions: [".js"],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/bundle.css"
      })
    ]
  });
};
