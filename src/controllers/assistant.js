const express = require("express")
const router = express.Router()
const auth = require("../middelware/auth")
const { fileValidation } = require('../validations/validations')

const { addDoctor,
    deleteDoctor,
    deleteDoctors,
    updateDoctor,
    getDoctor,
    getDoctors,
    addTasks,
    deleteTask,
    deleteTasks,
    getTask,
    getTasks,
    updateTask,addRays,getRay,getRays,deleteRay,deleteRays} = require("../controllers/assistant")
const fileUpload = require('../utils/multer')
// routes of doctor 

router.route('/doctor/:id')
    .post(auth.user, fileUpload(fileValidation.image).single('avatar'), addDoctor)
    .delete(auth.user, deleteDoctor)
    .get(auth.user, getDoctor)
    .patch(auth.user, updateDoctor)

router.route('/doctors/:id')
    .delete(auth.user, deleteDoctors)
    .get(auth.user, getDoctors)

// routes of tasks

router.route('/tasks/:id')
    .post(auth.user, fileUpload(fileValidation.image).single('avatar'), addTasks)
    .delete(auth.user, deleteTask)
    .get(auth.user, getTask)
    .patch(auth.user, updateTask)

router.route('/tasks/:id')
    .delete(auth.user, deleteTasks)
    .get(auth.user, getTasks)

// routes of rays
router.route('/rays/:id')
    .post(auth.user, fileUpload(fileValidation.image).single('avatar'), addRays)
    .delete(auth.user, deleteRay)
    .get(auth.user, getRay)

router.route('/rays/:id')
    .delete(auth.user, deleteRays)
    .get(auth.user, getRays)

module.exports = router