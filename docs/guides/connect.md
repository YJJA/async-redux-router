# connect
  use like React-redux connect function

  ```
    import React from 'react'
    import { connect } from 'async-redux-router'

    const Home = (props) => <div>this is Home page</div>

    Home.dispatchInitialAction = async ({home, homeActions}) => {
      const home = await homeActions.fechHome()
      return {home}
    }

    function mapStateToProps({home}) {
      return {home}
    }
    function mapDispatchToProps(dispatch) {
      return {
        homeActions: ....
      }
    }

    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  ```
