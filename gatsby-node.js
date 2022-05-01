const path = require("path")

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /gatsby-plugin-material-ui/,
            use: loaders.null(),
          },
        ],
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          "@public": path.resolve(__dirname, "public"),
        },
      },
    })
  } else {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          "@public": path.resolve(__dirname, "public"),
        },
      },
    })
  }
}
