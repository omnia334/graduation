const express = require("express")
const router = express.Router()
const auth = require("../middelware/auth")
const { fileValidation } = require('../validations/validations')

const { addDoctor,
    deleteDoctor,
    deleteDoctors,
    updateDoctor,
    getDoctors,
    addTasks,
    deleteTask,
    deleteTasks,
    getTask,
    updateTask,addRays,getRays,deleteRay,deleteRays} = require("../controllers/assistant")
const fileUpload = require('../utils/multer')
// routes of doctor 

router.route('/doctor/:id')
    .delete(auth.user, deleteDoctor)
    .patch(auth.user, updateDoctor)

router.route('/doctors/:id')
    .delete(auth.user, deleteDoctors)

router.get('/doctor', getDoctors)
router.post('/doctors',auth.user, fileUpload(fileValidation.image).single('avatar'), addDoctor)



// routes of tasks

router.route('/tasks/:id')
    .delete(auth.user, deleteTask)
    .patch(auth.user, updateTask)

router.route('/tasks/:id')
    .delete(auth.user, deleteTasks)

router.get('/tasks', getTask)
router.post('/tasks',auth.user, fileUpload(fileValidation.image).single('avatar'), addTasks)


// routes of rays
router.route('/rays/:id')
    .delete(auth.user, deleteRay)

router.route('/rays/:id')
    .delete(auth.user, deleteRays)

router.get('/rays', getRays)
router.post('/rays',auth.user, fileUpload(fileValidation.image).single('avatar'), addRays)


module.exports = router