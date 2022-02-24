const express = require(`express`)

const path = require(`path`)
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, `../public`)))
// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '105f51ff01f54af4af9ca0171e6665c1',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: `Sei`, type: `manual`})


    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/index.html`)
)})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Listening on port ${port}`))