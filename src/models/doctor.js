const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'patientModel' },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    specialty: {
        type: String,
        required: true,
        trim: true,
    },
    appiontment: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        public_id: String, secure_url: String
    },
}, { timestamps: true })
module.exports = mongoose.model('doctorModel', doctorSchema)
