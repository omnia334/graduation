const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const assistantSchema = new mongoose.Schema({
    assistantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
        public_id: String, secure_url: String
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    tokens: [{
        token: { type: String, required: true }
    }],
    patients: []
}, { timestamps: true })
assistantSchema.pre('save', async function (next) {
    const assistant = this;
    if (assistant.isModified('password')) {
        assistant.password = await bcrypt.hash(assistant.password, 8);
    }
    next();
});

assistantSchema.methods.generateAuthToken = async function () {
    const assistant = this;
    const token = jwt.sign({ _id: assistant._id.toString() }, 'secretkey');
    assistant.tokens = assistant.tokens.concat({ token });
    await assistant.save();
    return token;
};
module.exports = mongoose.model('assistantModel', assistantSchema)