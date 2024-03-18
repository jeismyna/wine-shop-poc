const User = require('../models/user-model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user details',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

getUserByUsernameAndPassword = async (req, res) => {
    await User.findOne({ username: req.params.username, password: req.params.password }, { username: 0, password: 0, createdAt: 0, updatedAt: 0 })
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }
            return res.status(200).json({ success: true, data: user })
        })
        .catch(err => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            console.log(err)
        })
}

module.exports = {
    createUser,
    getUserByUsernameAndPassword
}