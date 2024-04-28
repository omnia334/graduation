const express = require('express')
const app = express()
const port = process.env.port || 3000
const env = require('dotenv').config()
require('./db/mongoose')
app.use(express.json())

const userRouter = require('./routers/user')
const patientRouter = require('./routers/patient')
const assistantRouter = require('./routers/assistant')


app.use(userRouter)
app.use(patientRouter)
app.use(assistantRouter)
app.use((error, req, res, next) => {
    return res.send({ status: error.status, message: error.message, code: error.code, stack: error.stack })
})

app.listen(port, () => {
    console.log('Server is running')
})





