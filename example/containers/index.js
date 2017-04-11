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

// 初始化 Props, 可异步，或同步
// 只方法只会在服务端渲染时调用
Index.getInitialProps = (dispatch, location) => {
  console.log('getInitialProps()')
}
