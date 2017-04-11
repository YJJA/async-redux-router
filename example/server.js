import express from 'express'
import serverRender from './serverRender'

const app = express()
const PORT = 3000

app.get('*', serverRender)

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/`)
})
