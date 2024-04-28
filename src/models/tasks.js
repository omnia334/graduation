const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'patientModel' },

    name: {
        type: String,
        required: true,
        trim: true,
    },
    uses: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        public_id: String, secure_url: String
    },
    docWhoWrite: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true })
module.exports = mongoose.model('taskModel', taskSchema)
