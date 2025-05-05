import * as path from "path";
import type  Webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import { VueLoaderPlugin } from "vue-loader/dist/index";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import eslintWebpackPluin from "eslint-webpack-plugin";
import webpack from "webpack";

const config: Webpack.Configuration = {
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
    new NodePolyfillPlugin(),
    new eslintWebpackPluin({ extensions: ["js", "ts", "vue"] }),
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__':true,
      '__VUE_PROD_DEVTOOLS__':false,
            process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "dirname/[contenthash].[ext]",
            },
          },
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader", "markup-inline-loader"],
      },

      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },

      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },

      {
        test: /\.s(a|c)ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              symbolId: (filePath: string) => path.basename(filePath),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"],
    fallback: {
      Event: false,
       "module": false,
      "process": require.resolve("process/browser"),
      "buffer": require.resolve("buffer/"),
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
      crypto: false,
    },
  },
};

export default config;
