const express = require('express')
const route = express.Router()
const auth = require('../middelware/auth')
const { addAssistant, deleteAssistant } = require('../controllers/patient')
route.patch('/addAssistant/:id', auth.user, addAssistant)
route.delete('/deleteAssistant/:id', auth.user, deleteAssistant)
module.exports = route