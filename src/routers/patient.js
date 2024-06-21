const express = require('express')
const router = express.Router()
const auth = require('../middelware/auth')
const { fileValidation } = require('../validations/validations')
const { addAssistant, deleteAssistant,getAssistant,signUpAss,loginAss } = require('../controllers/patient')
const fileUpload = require('../utils/multer')
router.post('/addAssistant', auth.user,fileUpload(fileValidation.image).single('avatar'), addAssistant)
router.delete('/deleteAssistant/:id', auth.user, deleteAssistant)
router.get('/getAssistant',auth.user,getAssistant) 
router.post('/signupAss', signUpAss)
router.post('/loginAss', loginAss)


module.exports = router