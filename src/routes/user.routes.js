const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controllers.js");
// require middleware first
const auth = require("../middleware/auth")
// Retrieve all users
userRouter.post("/", userController.create);
// Retrieve user profile
userRouter.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
// Login user
userRouter.post("/login", userController.login);
// Logout user from current device
userRouter.post('/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})// Logout user from all devices
userRouter.post('/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = userRouter;