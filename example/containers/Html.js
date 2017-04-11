import React from 'react'
import PropTypes from 'prop-types'
// html
const Html = props => {
  const {title, state, context, keywords, description, assets} = props
  return (
    <html lang="zh-cn">

    <head>
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      {
        assets.css.map(item => {
          return <link href={item}/>
        })
      }
      <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`}} />
    </head>
    <body>
      <div id="app" className="app" dangerouslySetInnerHTML={{__html: context}} />
      {
        assets.js.map(item => {
          return <script src={item} />
        })
      }
    </body>
    </html>
  )
}

Html.propTypes = {
  title: PropTypes.string,
  context: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string,
  state: PropTypes.object,
  assets: PropTypes.object
}

Html.defaultProps = {
  title: 'react-express',
  keywords: '',
  description: '',
  context: '',
  state: null,
  assets: {}
}

export default Html
