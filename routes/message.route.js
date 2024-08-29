const express = require('express')
const { sendMessage, getMessages } = require('../controller/message.controller')
const { protectRoute } = require('../middleware/protectRoute')
const router = express.Router()


router.post('/send/:id', protectRoute, sendMessage)
router.get('/:id', protectRoute, getMessages)

module.exports = router
