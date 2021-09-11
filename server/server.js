const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const secureApi = require('helmet')
const boardRoute = require('./routes/board')
const deckRoute = require('./routes/deck')
const taskRoute = require('./routes/task')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const cors = require('cors')
const { MONGODB_URL } = require('./configs')
//config env
require('dotenv').config()

const app = express()
// Connect DB
const mongooseClient = require('mongoose')
mongooseClient.connect(MONGODB_URL).then(() => {
  console.log('Connected Success !');
})
  .catch((error) => {
    console.log(error + "Loi connect");
  })
//Middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(secureApi())
app.use(cors())
//Routes
app.use('/boards', boardRoute)
app.use('/decks', deckRoute)
app.use('/tasks', taskRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK !"
  })
})

// Catch Errors
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})


//Handle Errors
app.use(() => {
  const error = app.get('env') === 'dev' ? err : {}
  const status = err.status || 500 // 500 loi chua bat duoc
  // response to client
  return res.status(status).json({
    error: {
      message: error.message
    }
  })
})
//Start Server
const port = app.get('port') || 8080
app.listen(port, () => console.log(`Server listioning port ${port} `))
