/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express')
var bodyParser = require('body-parser')
require ('dotenv').config()
const app = express()
const port = 3000

const userRoutes = require('./routes/v1/userRoutes')
const API_V1 = require('./routes/v1')
const errorHandle = require('./middlewares/errorHandler')
const db = require('./configs/mongodb')

//connect db
db.connect()

app.get('/', (req, res) => {
  res.send('<h1>Hello  xd</h1>')
})

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
// app.use('/users', userRoutes);

app.use('/v1', API_V1)
app.use(errorHandle)

app.use('/uploads', express.static('uploads'))


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})