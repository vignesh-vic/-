const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    confirmPassword: { type: String },
},
    {
        timestamps: true,
    }
)


let User = mongoose.model('User', userSchema)

module.exports = User;
