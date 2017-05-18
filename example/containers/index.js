import React from 'react'
import {Link, NavLink} from 'async-redux-router'

const Index = props => {
  return (
    <div>关于页面
      <div>
        <NavLink to="/" exact>返回首页</NavLink>
        <NavLink to="/index" exact>关于页面</NavLink>
        {props.children}
      </div>
    </div>
  )
}

// getInitialProps
/**
 * get getInitialProps
 * @param  {Function} dispatch store.dispatch
 * @param  {Object} location history.location
 */
Index.getInitialProps = async ({store, location, query}) => {
  console.log('getInitialProps()')
  await Promise.resolve()
}
