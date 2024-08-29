const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    message: { type: String },
},
    {
        timestamps: true,
    }
)


let Message = mongoose.model('Message', messageSchema)

module.exports = Message;
