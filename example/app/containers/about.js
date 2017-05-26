import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Link, connect} from '../../../src'
import * as aboutActions from '../actions/aboutActions'

class About extends Component {
  componentDidMount() {
    // this.props.aboutActions.fetchAbout()
  }
  render() {
    return (
      <div>This is About Page
        <div>
          <Link to="/">Home Page</Link>
        </div>
        <ul>
          {
            this.props.about.list.map((item, index) => {
              return <li key={index}>{item.title}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

// getInitialProps
/**
 * get getInitialProps
 * @param  {Function} dispatch store.dispatch
 * @param  {Object} location history.location
 */
About.getInitialProps = async ({about, aboutActions, location, query}) => {
  await aboutActions.fetchAbout()
}

function mapStateToProps({about}) {
  return {about}
}

function mapDispatchToProps(dispatch) {
  return {
    aboutActions: bindActionCreators(aboutActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
