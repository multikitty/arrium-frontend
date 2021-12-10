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
    })
  }
}
