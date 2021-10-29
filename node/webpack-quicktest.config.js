/**
 *
 * Webpack 5
 *
 * Build the test/00_quick_test.ts for quick testing under watch.
 *
 */
const path = require("path");

module.exports = {

  entry: {
    quicktest: "./test/00_quick_test.ts"
  },

  mode: "development",

  watch: true,

  watchOptions: {
    poll: 200,
    aggregateTimeout: 200,
    ignored: /node_modules/
  },

  target: "node",
  devtool: "inline-source-map",

  devServer: {
    contentBase: "./build"
  },

  // These are functions that filters warnings based on the source module and
  // the warning's message
  ignoreWarnings: [

    (warning, compilation) =>
      (warning.module.resource).indexOf("chokidar") > -1,

    (warning, compilation) =>
      (warning.module.resource).indexOf("mocha") > -1 &&
        (warning.message).indexOf("the request of a dependency") > -1

  ],

  output: {
    path: path.resolve(__dirname),
    filename: "./build/[name].js"
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  }

}
