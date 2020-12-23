import React from 'react'
import { Box } from '@material-ui/core'
import { rhythm } from '../utils/typography'

export default ({ settings }) => (
  <div
    style={{
      display: 'flex',
      marginBottom: rhythm(2.5),
    }}
  >
    <img
      src={settings.author_avatar.imgix_url}
      alt={settings.author_name}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        width: rhythm(2),
        height: rhythm(2),
      }}
    />
    <Box display="flex" alignItems="center">
      {settings.author_name}
      <div dangerouslySetInnerHTML={{ __html: settings.author_bio }} />
    </Box>
  </div>
)
