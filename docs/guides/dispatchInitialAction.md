# dispatchInitialAction
  initial dispatch action

  ```
    import React from 'react'
    import { connect } from 'async-redux-router'

    // one
    const Home = (props) => <div>this is Home page</div>

    // store ---> redux store
    // location ---> history.location
    // query
    Home.dispatchInitialAction = async ({store, location, query}) => {
      await homeActions.fechHome()
    }

    // an other one
    const Index = (props) => <div>this is Index page</div>

    Index.dispatchInitialAction = async ({index, indexAction, location, query}) {
      await indexAction.fechIndex()
    }

    function mapStateToProps({index}) {
      return {index}
    }
    function mapDispatchToProps(dispatch) {
      return {
        indexActions: ....
      }
    }
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Index)
  ```
