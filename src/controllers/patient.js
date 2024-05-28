const patientModel = require('../models/patient')
const assistantModel = require('../models/assistant')

const errorHandler = require('../middelware/errorHandler')
const appError = require('../utils/appError')

// add assistant
const addAssistant = errorHandler(
    async (req, res, next) => {
        const assistantId = req.params.id
        const _id = req.user._id
        let findPatientModel = await patientModel.findOne({ patientId: _id })
        let findassistantModel = await assistantModel.findOne({ assistantId })

        if (!findPatientModel) {
            findPatientModel = await patientModel.create({ patientId: _id })
        }
        if (!findassistantModel) {
            findassistantModel = await assistantModel.create({ assistantId: assistantId })

        }
        const findAssistant = await patientModel.findOne({ patientId: _id, assistans: { $in: [assistantId] } })
        const findPatient = await assistantModel.findOne({ assistantId, patients: { $in: [_id] } })

        if (findAssistant && findPatient) {
            const error = appError.Error('assistant already esist', 400, 'fail')
            return next(error)
        }
        const numOfAss = findPatientModel?.assistans.length
        if (+numOfAss >= 3) {
            const error = appError.Error('you have 3 assistant only', 400, 'fail')
            return next(error)
        }
        const addAss = await patientModel.findByIdAndUpdate(findPatientModel._id, { $push: { assistans: assistantId } }, { new: true })
        const addpath = await assistantModel.findByIdAndUpdate(findassistantModel._id, { $push: { patients: req.user._id } }, { new: true })

        if (!addAss && !addpath) {
            const error = appError.Error('assistant not added', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: addAss })
    }
)
// delete assistant in patieny model
const deleteAssistant = errorHandler(
    async (req, res, next) => {
        const assistantId = req.params.id
        const _id = req.user._id // patient
        const deleteAss = await patientModel.findOneAndUpdate({ patientId: _id }, { $pull: { assistans: assistantId } }, { new: true })
        const deletePath = await assistantModel.findOneAndUpdate({ assistantId }, { $pull: { patients: _id } }, { new: true })

        if (!deleteAss && !deletePath) {
            const error = appError.Error('assistant not delete', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: deleteAss })
    }
)
module.exports = { addAssistant, deleteAssistant }