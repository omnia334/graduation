const mongoose = require('mongoose')
const assistantSchema = new mongoose.Schema({
    assistantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patients: []
}, { timestamps: true })
module.exports = mongoose.model('assistantModel', assistantSchema)