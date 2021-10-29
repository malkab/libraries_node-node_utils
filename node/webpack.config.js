/**
 *
 * Webpack 5
 *
 * Builds the library at src/index.ts.
 *
 */
// Configure this
const libraryName = "node_utils";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

  /**
   *
   * This will create two compiled JS, one for each application.
   *
   */
  entry: {
    library: "./src/index.ts"
  },
  mode: "production",
  target: "node",

  plugins: [

    new CleanWebpackPlugin()

  ],

  // By uncommenting this line the library bundle is produced without external
  // dependencies. That means a smaller size but leaves the library prone to
  // external dependencies and thus to "dependency hell". As a rule of thumb, it
  // is not recommended to compile the production bundle without externals.
  // externals: [ nodeExternals() ],

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: libraryName
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: [

        path.join(__dirname, "/node_modules/"),
        path.join(__dirname, "/test/")

      ]
    }]
  },

  optimization: {

    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      terserOptions: {
        mangle: {
          toplevel: true
        },
        output: {
          comments: false
        }
      }
    })]

  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }

}
