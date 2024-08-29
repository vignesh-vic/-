const express = require('express')
const { protectRoute } = require('../middleware/protectRoute')
const { getUsersForSideBar } = require('../controller/user.controller')
const router = express.Router()



router.get('/', protectRoute, getUsersForSideBar)

module.exports = router
