import keyMirror from 'key-mirror'

export const type = keyMirror({
  ABOUT_REQUEST: null,
  ABOUT_SUCCESS: null,
  ABOUT_FAILURE: null
})

export function fetchAbout() {
  return dispatch => {
    dispatch({type: type.ABOUT_REQUEST})

    return fetchAboutApi()
      .then(data => dispatch({type: type.ABOUT_SUCCESS, data}))
      .catch(error => dispatch({type: type.ABOUT_FAILURE, error}))
  }
}

function fetchAboutApi() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve({
        list: [
          {
            title: 'AAAAAAAAAAAAAAA'
          },
          {
            title: 'BBBBBBBBBBBBBBBBBB'
          },
          {
            title: 'CCCCCCCCCCCCCCCCCC'
          }
        ]
      })
    }, 100)
  })
}
