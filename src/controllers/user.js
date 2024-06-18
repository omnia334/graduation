const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { fileValidation } = require('../validations/validations')
const auth = require('../middelware/auth')
const { singUpFunc,
    getUserFunc,
    getUserByIdFunc,
    updateUserFunc,
    deleteUserFunc,
    loginFunc,
    userProfile,
    profileImg,
    logout,
    logoutAll
} = require('../controllers/user')
const fileUpload = require('../utils/multer')
// create user
router.post('/signup', singUpFunc)
// add profile image
router.post('/profileImg', auth.user, fileUpload(fileValidation.image).single('avatar'), profileImg)

//get all
router.get('/users', getUserFunc)
// user profile
router.get('/user/profile', auth.user, userProfile)
//auth.user
router.get('/user/:id', getUserByIdFunc)

// // update
router.patch('/user', auth.user, updateUserFunc)  //error
//delete
router.delete('/user', auth.user, deleteUserFunc)
router.post('/login', loginFunc)   //error

router.post("/logout", auth.user, logout);
router.post("/logoutall", auth.user, logoutAll);


module.exports = router