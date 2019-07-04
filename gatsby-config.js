const PageWrapper = require.resolve('./src/layouts/page-wrapper.tsx');

if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config();
}

const contentfulConfig = {
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
};

module.exports = {
  siteMetadata: {
    title: 'Simon Tang',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Simon Tang',
        short_name: 'Simon Tang',
        start_url: '/',
        background_color: '#403f4c',
        theme_color: '#403f4c',
        display: 'minimal-ui',
        icon: 'src/assets/images/icon-192.png',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Titillium Web:400,600', 'Schoolbell'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-133742271-1',
        pageTransitionDelay: 500,
      },
    },
    `gatsby-plugin-typescript`,
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: PageWrapper,
      },
    },
  ],
};
