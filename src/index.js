const express = require('express')
const app = express()
const port = process.env.port || 3000
const env = require('dotenv').config()
const cors = require("cors")
require('./db/mongoose')
app.use(express.json())
app.use(cors())
const userRouter = require('./routers/user')
const patientRouter = require('./routers/patient')
const assistantRouter = require('./routers/assistant')


app.use(userRouter)
app.use(patientRouter)
app.use(assistantRouter)
app.all('*', (req, res, next) => {
    res.status(500).send({ status: "fail", message: "this route not defined" })
})
app.use((error, req, res, next) => {
    res.status(500).send({ status: error.status, message: error.message, code: error.code, stack: error.stack })
})

app.listen(port, () => {
    console.log('Server is running')
})





