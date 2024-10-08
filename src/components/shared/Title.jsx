import React from 'react'
import {Helmet} from 'react-helmet-async'

const Title = ({Title="Chat App",description="this is a chat"}) => {
  return (
    <Helmet>
        <title>{Title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title
