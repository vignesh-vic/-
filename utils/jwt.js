const jwt = require('jsonwebtoken');

const generateToken = (user, res) => {
    const { _id, email } = user
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 1000, // 15 days
        httpOnly: true, //prevent xss cross attacks cross-site scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV === 'production' // use secure only in production

    })


}

module.exports = generateToken;