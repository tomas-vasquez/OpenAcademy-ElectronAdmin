const path = require("path");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  // APP ENTRY POINT
  entry: path.join(__dirname, "src", "index.js"),

  // OUTPUT DIRECTORY
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.bundle.js",
  },

  // EVIROMENT MODE
  mode: process.env.NODE_ENV || "development",

  // LOADERS
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  // PATH RESOLVE
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./src/assets/img/icon.png", // svg works too!
      mode: "webapp", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      devMode: "webapp", // optional can be 'webapp' or 'light' - 'light' by default
      favicons: {
        appName: "my-app",
        appDescription: "App Adminer For YourAcademy.com",
        developerName: "Tomas Vasquez",
        developerURL: "https://tomas-vasquez.vercel.app", // prevent retrieving from the nearest package.json
        background: "#ddd",
        theme_color: "#333",
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
  ],

  // DEV SERVER ENTRY POINT
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    port: 3500,
    hot: true,
    watchContentBase: true,
    open: true,
  },
};
