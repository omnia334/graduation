const doctorModel = require('../models/doctor')
const tasksModel = require('../models/tasks')
const cloudinary = require('../utils/cloudinary')

const errorHandler = require('../middelware/errorHandler')
const appError = require('../utils/appError')

// add doctor
const addDoctor = errorHandler(
    async (req, res, next) => {
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }

        const add = await doctorModel.create({
            patientId, ...req.body
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
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }
        const doctors = await doctorModel.find({
            patientId
        })
        if (!doctors) {
            const error = appError.Error('doctors not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: doctors })
    }
)
// get doctor for patient
const getDoctor = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const doctor = await doctorModel.findById(_id)
        if (!doctor) {
            const error = appError.Error('doctor not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: doctor })
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
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }
        const add = await tasksModel.create({
            patientId, ...req.body
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

const getTasks = errorHandler(
    async (req, res, next) => {
        const patientId = req.params.id
        if (!patientId) {
            const error = appError.Error('patient not exist', 400, 'fail')
            return next(error)
        }
        const tasks = await tasksModel.find({
            patientId
        })
        if (!tasks) {
            const error = appError.Error('tasks not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: tasks })
    }
)
// get task for patient
const getTask = errorHandler(
    async (req, res, next) => {
        const _id = req.params.id

        if (!_id) {
            const error = appError.Error('no id ', 400, 'fail')
            return next(error)
        }
        const task = await tasksModel.findById(_id)
        if (!task) {
            const error = appError.Error('task not fonded', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: task })
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
module.exports = {
    addDoctor,
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
    updateTask
}