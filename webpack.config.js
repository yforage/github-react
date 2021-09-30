const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.resolve(__dirname, "build");
const srcPath = path.resolve(__dirname, "src");
const publicPath = path.resolve(__dirname, "public");

const isProd = process.env.NODE_ENV === "production";

const getStylesParams = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    withModules
      ? {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: isProd
                ? "[hash:base64]"
                : "[path][name]__[local]",
            },
          },
        }
      : "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: isProd ? "browserslist" : "web",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(publicPath, "index.html"),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getStylesParams(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getStylesParams(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      src: srcPath,
      components: path.join(srcPath, "components"),
      store: path.join(srcPath, "store"),
      config: path.join(srcPath, "config"),
      utils: path.join(srcPath, "utils"),
      styles: path.join(srcPath, "styles"),
    },
  },
  devServer: {
    host: "localhost",
    port: 3000,
    static: "./public",
    hot: true,
    historyApiFallback: true,
  },
};
