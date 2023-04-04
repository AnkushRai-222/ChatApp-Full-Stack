const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const middleware = require('../middleware/auth')
router.post("/register",userController.createUser)
router.post("/user/login",userController.loginUser)
router.get("/user/:userId",middleware.authentication,userController.getUser)
router.get("/weather/:city",userController.weather)

module.exports = router