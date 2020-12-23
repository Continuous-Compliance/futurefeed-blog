import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import { CssBaseline, Container, Box } from '@material-ui/core'

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            site_heading
            homepage_hero {
              local {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const homePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid
      let header

      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }
      return (
        <>
          <CssBaseline />
          <Box bgcolor="black" p={5}>
            <Container>
              <h1
                style={{
                  margin: 0,
                  color: 'white',
                }}
              >
                <Link
                  style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  to={'/'}
                >
                  {siteTitle}
                </Link>
              </h1>
            </Container>
          </Box>
          <Container>
            <div
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                minHeight: 'calc(100vh - 42px)',
              }}
            >
              {children}
            </div>
            <footer
              style={{
                textAlign: 'center',
                padding: `0 20px 80px 0`,
              }}
            ></footer>
          </Container>
        </>
      )
    }}
  />
)
