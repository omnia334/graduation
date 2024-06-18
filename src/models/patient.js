const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
        public_id: String, secure_url: String
    },
    assistans: []
}, { timestamps: true })
module.exports = mongoose.model('patientModel', patientSchema)
