const jwt = require('jsonwebtoken');
const User = require("../models/user.model");


exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invaild Token' })
        }

        const user = await User.findById(decoded._id).select("-password -confirmPassword")
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        req.user = user

        next()

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}