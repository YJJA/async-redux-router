import express from 'express'
import serverRender from './serverRender'

const app = express()
// server
app.get('*', serverRender)

export default app
