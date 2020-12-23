import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import { CssBaseline, Box, Typography } from '@material-ui/core'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_title'
    )
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')

    return (
      <>
        <CssBaseline />
        <Layout location={location}>
          <Helmet title={siteTitle}>
            <link
              rel="stylesheet"
              href={`https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap`}
            />
          </Helmet>
          {posts.map(({ node }) => {
            const title = get(node, 'title') || node.slug
            return (
              <Box key={node.slug} mt={10}>
                <Typography variant="h5" component="h3">
                  <Link style={{ boxShadow: 'none' }} to={`posts/${node.slug}`}>
                    {title}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <small>{node.created}</small>
                </Typography>
                <Typography variant="body1">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.metadata.description,
                    }}
                  />
                </Typography>
              </Box>
            )
          })}
        </Layout>
      </>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          metadata {
            description
          }
          slug
          title
          created(formatString: "DD MMMM, YYYY")
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`
