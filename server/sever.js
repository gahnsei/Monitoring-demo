const express = require(`express`)

const path = require(`path`)
const app = express()

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '105f51ff01f54af4af9ca0171e6665c1',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/index.html`)
)})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Listening on port ${port}`))