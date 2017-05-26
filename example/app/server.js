import http from 'http'
let app = require('./controllers').default
const PORT = 3000

let server = http.createServer()
server.on('request', app)
server.listen(PORT)
console.log('http://localhost:' + PORT)

if (module.hot) {
  module.hot.accept('./controllers', function() {
    server.removeListener('request', app)
    app = require('./controllers').default
    server.on('request', app)
  })
}
