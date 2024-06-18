const jwt = require('jsonwebtoken')
const User = require('../models/user')
const user = async (req, res, next) => {
    const authToken = req.header('Authorization')
    if (!authToken) return res.send('no token')
    const token = authToken.replace('Bearer ', '')
    try {
        const verifayToken = jwt.verify(token, process.env.jwt_Key)
        const user = await User.findById(verifayToken.id)
        req.user = user
        next()
    } catch (e) {
        res.send(e.message)
    }
}
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};



module.exports = { user }