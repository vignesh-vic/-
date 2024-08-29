const User = require("../models/user.model");
const generateToken = require("../utils/jwt");
const bcrypt = require('bcrypt');
const saltRounds = 10

exports.createUser = async (req, res) => {

    try {
        const { email, password, confirmPassword } = req.body;

        const hashPassword = await bcrypt.hash(password, saltRounds)
        const HashconfirmPassword = await bcrypt.hash(confirmPassword, saltRounds)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: true, existing: true, userDetails: existingUser });
        } else {
            const userDetails = await User.create({
                email,
                password: hashPassword,
                confirmPassword: HashconfirmPassword

            });

            return res.status(201).json({
                status: "success",
                message: "User registered successfully",
                data: {
                    userId: userDetails._id,
                    email: userDetails.email,
                },
            });

        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Failed to register user" });
    }

}


exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        if (user) {
            const userData = {
                _id: user._id,
                email: user.email
            };

            generateToken(userData, res);
        } else {
            res.status(404).json({ message: 'User not found' });
        }


        return res.status(200).json({
            status: "success",
            message: "User login successfully",
            data: {
                email: user.email,

            },
        });

    } catch (error) {
        console.error("Error login user:", error);
        res.status(500).json({ success: false, message: "Failed to login" });
    }
}