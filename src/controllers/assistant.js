const doctorModel = require('../models/doctor')
const tasksModel = require('../models/tasks')
const RaysModel = require('../models/Rays')
const cloudinary = require('../utils/cloudinary')

const errorHandler = require('../middelware/errorHandler')
const appError = require('../utils/appError')

// add doctor
const addDoctor = errorHandler(
    async (req, res, next) => {
        const add = await doctorModel.create({ ...req.body
        })
        if (req.file) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path,
                { folder: `graduation/user/id_${patientId}/doctor/profileImg` })
            add.image = { public_id, secure_url }
        }
        if (!add) {
            const error = appError.Error('doctor not added', 400, 'fail')
            return next(error)
        }
        await add.save()
        res.status(200).send({ status: true, data: add })
    }
)
// all doctors for patient
const getDoctors = errorHandler(
    async (req, res, next) => {
        const doctors = await doctorModel.find()

        if (!doctors) {
            const error = appError.Error('no doctor founded', 400, 'fail')
            return next(error)
        }

        res.status(200).send({ status: true, data: doctors })

    }
)

// delete doctor for patient
const deleteDoctor = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const doctor = await doctorModel.findByIdAndDelete(_id)
        if (!doctor) {
            const error = appError.Error('doctor not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: doctor })
    }
)
// update doctor
const updateDoctor = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const doctor = await doctorModel.findByIdAndUpdate(_id, req.body, { new: true })
        if (!doctor) {
            const error = appError.Error('doctor not updated', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: doctor })
    }
)
// delete all doctors for patient
const deleteDoctors = errorHandler(
    async (req, res, next) => {
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }
        const doctors = await doctorModel.find({
            patientId
        }).deleteMany()
        if (!doctors) {
            const error = appError.Error('doctors not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: doctors })
    }
)
// add tasks
const addTasks = errorHandler(
    async (req, res, next) => {
        const add = await tasksModel.create({ ...req.body
        })
        if (req.file) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path,
                { folder: `graduation/user/id_${patientId}/doctor/profileImg` })
            add.image = { public_id, secure_url }
        }
        if (!add) {
            const error = appError.Error('task not added', 400, 'fail')
            return next(error)
        }
        await add.save()
        res.status(200).send({ status: true, data: add })
    }
)
// all tasks for patient
const getTask = errorHandler (
    async (req, res, next) => {
        const tasks = await tasksModel.find()
            if (!tasks) {
                const error = appError.Error('no Tasks founded', 400, 'fail')
                return next(error)
            }
    
        res.status(200).send({ status: true, data: tasks })
    
    }
)
// delete task for patient
const deleteTask = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const task = await tasksModel.findByIdAndDelete(_id)
        if (!task) {
            const error = appError.Error('task not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: task })
    }
)
// update task
const updateTask = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const task = await tasksModel.findByIdAndUpdate(_id, req.body, { new: true })
        if (!task) {
            const error = appError.Error('task not updated', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: task })
    }
)
// delete all doctors for patient
const deleteTasks = errorHandler(
    async (req, res, next) => {
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }
        const tasks = await tasksModel.find({
            patientId
        }).deleteMany()
        if (!tasks) {
            const error = appError.Error('tasks not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: tasks })
    }
)
/////////////////////////////////////////
const addRays = errorHandler(
    async (req, res, next) => {
        const add = await RaysModel.create({ ...req.body
        })
        if (req.file) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path,
                { folder: `graduation/user/id_${patientId}/doctor/profileImg` })
            add.image = { public_id, secure_url }
        }
        if (!add) {
            const error = appError.Error('Ray not added', 400, 'fail')
            return next(error)
        }
        await add.save()
        res.status(200).send({ status: true, data: add })
    }
)
// all Rays for patient
const getRays = errorHandler (
    async (req, res, next) => {
        const Rays = await RaysModel.find()
            if (!Rays) {
                const error = appError.Error('no Ray founded', 400, 'fail')
                return next(error)
            }
    
        res.status(200).send({ status: true, data: Rays })
    
    }
)

// get Ray for patient
const getRay = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const Ray = await RaysModel.findById(_id)
        if (!Ray) {
            const error = appError.Error('Ray not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: Ray })
    }
)
// delete Rays for patient
const deleteRay = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const Ray = await RaysModel.findByIdAndDelete(_id)
        if (!Ray) {
            const error = appError.Error('Ray not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: Ray })
    }
)
// delete all doctors for patient
const deleteRays = errorHandler(
    async (req, res, next) => {
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }
        const Rays = await RaysModel.find({
            patientId
        }).deleteMany()
        if (!Rays) {
            const error = appError.Error('Rays not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: Rays })
    }
)

module.exports = {
    addDoctor,
    deleteDoctor,
    deleteDoctors,
    updateDoctor,
    getDoctors,
    addTasks,
    deleteTask,
    deleteTasks,
    getTask,
    updateTask,
    addRays,
    getRays,
    getRay,
    deleteRay,
    deleteRays
}