const User = require('../models/user')
const errorHandler = require('../middelware/errorHandler')
const appError = require('../utils/appError')
const cloudinary = require('../utils/cloudinary')
// signup function
const singUpFunc = errorHandler(
    async (req, res, next) => {

        const user = new User(req.body)
        const token = user.createToken()
        if (!user) {
            const error = appError.Error('not added user', 400, 'fail')
            return next(error)
        }
        await user.save()
        
        res.status(200).send({ status: true, data: { user, token } })

    }
)
const loginFunc = errorHandler(
    async (req, res, next) => {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = user.createToken()
        if (!user) {
            const error = appError.Error('email or password is wrong ', 400, 'fail')
            return next(error)
        }
        
        res.status(200).send({ status: true, data:  user, token  })
    }
)
const profileImg = errorHandler(
    async (req, res, next) => {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path,
            { folder: `graduation/user/id_${req.user._id}/profileImg` })
        req.user.image = { public_id, secure_url }
        await req.user.save()
        res.status(200).send({ status: true, data: req.user })
    })
// profile
const userProfile = errorHandler(
    async (req, res, next) => {
        res.status(200).send({ status: true, data: req.user })
    }
)
const getUserFunc = errorHandler(
    async (req, res, next) => {
        const user = await User.find()

        if (!user) {
            const error = appError.Error('no users founded', 400, 'fail')
            return next(error)
        }

        res.status(200).send({ status: true, data: user })

    }
)
const getUserByIdFunc = errorHandler(
    async (req, res, next) => {

        const _id = req.params.id
        const user = await User.findById(_id)

        if (!user) {
            const error = appError.Error('user not found', 400, 'fail')
            return next(error)
        }
        res.status(200).send({ status: true, data: user })

    }
)
const updateUserFunc = errorHandler(
    async (req, res, next) => {
        const updates = Object.keys(req.body)

        const _id = req.user._id
        const user = await User.findById(_id)

        updates.forEach(el => user[el] = req.body[el])

        if (!user) {
            const error = appError.Error('not update user', 400, 'fail')
            return next(error)

        }
        await user.save()
        res.status(200).send({ status:true, data: user })

    }
)
const deleteUserFunc = errorHandler(
    async (req, res, next) => {
        const _id = req.user._id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            const error = appError.Error('user not deleted', 400, 'fail')
            return next(error)

        }

        user.save()
        res.status(200).send({ status: true, data: user })

    }
)
    let tokens = []; 
    const logout = async (req, res) => {
        try {
            const user = req.user;
            console.log('User:', user);
    
            if (!user || !Array.isArray(user.tokens)) {
                console.error('User or tokens not found');
                return res.status(400).send({ error: 'User or tokens not found' });
            }
    
            const userId = user._id;
            console.log('User ID:', userId);
            console.log('Tokens before filter:', user.tokens);
    
            user.tokens = user.tokens.filter(token => token.token !== userId);
            console.log('Tokens after filter:', user.tokens);
    
            await user.save();
            res.status(200).send({ message: 'Logged out from the current session' });
        } catch (error) {
            console.error('Logout Error:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    };
    
const logoutAll = (req, res) => {
    try {
        if (!Array.isArray(tokens)) {
            tokens = []; 
        }
    
        const userId = req.user._id; 
        tokens = tokens.filter(token => token.userId !== userId);
            res.status(200).send({ message: 'Logged out from all sessions' });
        } catch (error) {
            console.error('Error during logoutAll:', error); 
            res.status(500).send({ error: 'Internal Server Error' });
        }
};
module.exports = { singUpFunc, getUserFunc, getUserByIdFunc, updateUserFunc, deleteUserFunc, loginFunc, userProfile, profileImg ,logoutAll,logout}