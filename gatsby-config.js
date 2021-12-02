module.exports = {
  siteMetadata: {
    title: `Arrium`,
    description: `An Amazon Flex Automation App`,
    author: `Ayush Bendwal`,
    siteUrl: `https://arrium.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-web-font-loader`,
    `gatsby-plugin-polished`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
}
