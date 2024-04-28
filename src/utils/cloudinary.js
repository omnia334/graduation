const cloudinary = require('cloudinary').v2
const env = require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: process.env.secure
    // api_key: "733133325483356",
    // api_secret: "kLP6G1v80u7Vs1HzvSQ9iVtOchc",
    // secure: true,
    // cloud_name: "dlkfommvi",
});
module.exports = cloudinary