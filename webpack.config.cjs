const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

let mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  entry: {
    index: "./src/main.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  mode,
  devServer: {
    port: 3000,
    hot: true,
    compress: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  devtool: mode === "production" ? false : "eval",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/index.html"),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.DEBUG": false,
    }),
    new Dotenv({
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
        },
      ],
    }),
  ],
  optimization:
    mode === "development"
      ? {
          splitChunks: {
            chunks: "all",
          },
        }
      : {
          minimize: true,
          usedExports: true,
          sideEffects: true,
          concatenateModules: true,
          minimizer: [
            new TerserPlugin({
              minify: TerserPlugin.swcMinify,
            }),
          ],
          runtimeChunk: "single",
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        },
  performance: {
    hints: false,
  },
  stats: "errors-warnings",
};
