const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: 'patient',
        enum: ['assistant', 'patient', 'admin']
    },
    image: {
        public_id: String, secure_url: String
    },
})
userSchema.pre('save', async function () {
    // this --> document 
    //  console .log(this)
    if (this.isModified('password'))
        this.password = await bcryptjs.hash(this.password, 8)

})
userSchema.methods.createToken = function () {
    const token = jwt.sign({ id: this._id.toString() }, process.env.jwt_Key)
    return token
}
// findByCredentials --> login
userSchema.statics.findByCredentials = async (email, password) => {
    const patient = await User.findOne({ email })

    if (!patient) {
        throw new Error('Email error')
    }
    const isMatch = await bcryptjs.compare(password, patient.password)
    if (!isMatch) {
        throw new Error('Password error')
    }
    return patient
}
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}
const User = mongoose.model('User', userSchema)
module.exports = User