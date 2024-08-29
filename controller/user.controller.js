const User = require("../models/user.model")

exports.getUsersForSideBar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
        res.status(200).json(filteredUsers)
    } catch (error) {
        return res.send(500).json({ error: 'Internal server error' })

    }
}