/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")
const CopyFilesPlugin = require("webpack-copyfiles-plugin")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      // From webpack docs: https://webpack.js.org/guides/progressive-web-application/
      // These options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CopyFilesPlugin({
      sourceRoot: "./public",
      targetRoot: "./dist",
      files: ["manifest.json", "web.config", "images/*"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
}
