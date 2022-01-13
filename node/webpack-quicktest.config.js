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

  target: "node",
  mode: "development",

  // Comment to check warnings
  stats: "errors-only",

  watch: true,

  watchOptions: {
    poll: 200,
    aggregateTimeout: 200,
    ignored: /node_modules/
  },

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
        (warning.message).indexOf("the request of a dependency") > -1,

    (warning, compilation) =>
      (warning.message).indexOf("the request of a dependency") > -1,

    (warning, compilation) =>
      (warning.message).indexOf("Critical dependency: require function is used in a way in which dependencies cannot be statically extracted") > -1

  ],

  output: {
    path: path.resolve(__dirname),
    filename: "./build/[name].js",
    clean: true
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
