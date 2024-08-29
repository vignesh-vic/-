const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");


exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id.toString();
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants:
                    [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //run parallel
        await Promise.all([conversation.save(), newMessage.save()])

        return res.status(201).json(newMessage)

    } catch (error) {

        return res.send(500).json({ error: 'Internal server error' })
    }
}

exports.getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        const senderId = req.user._id.toString()
        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChat]
            }
        }).populate('messages')

        if (!conversation) {
            return res.status(200).json([])

        }
        const messages = conversation.messages
        res.status(200).json(messages)

    } catch (error) {
        return res.send(500).json({ error: 'Internal server error' })

    }
}