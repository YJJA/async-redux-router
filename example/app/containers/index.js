import React from 'react'
import {Link} from '../../../src'

const Index = props => {
  return (
    <div>This is Home Page
      <div>
        <Link to="/about">About Page</Link>
        {props.children}
      </div>
    </div>
  )
}

export default Index
