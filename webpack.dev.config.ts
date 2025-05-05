import common from "./webpack.common.config";
import type  webpack from "webpack";
import * as path from "path";
const { merge } = require("webpack-merge");
const Dotenv = require('dotenv-webpack');

const config: webpack.Configuration = merge(common, {
  mode: "development",
  devtool: 'eval-source-map',
  optimization:{
    emitOnErrors: true,
    innerGraph: false,
    minimize:false
  },
  plugins: [
    new Dotenv({
      path: "./.env.development",
    })
  ],
  module:{
    rules:[
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
        ],
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
      serveIndex: true,
    },
    watchFiles: "./index.html",
    port: 80,
    open: true,
    hot: true,
  },
});

export default config;