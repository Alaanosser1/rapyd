const authRouter = require("express").Router()
const authController = require('../controllers/auth-controller')
const passport = require("passport")


authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/protected', passport.authenticate('jwt', {
    session: false
}), authController.protected)


module.exports = authRouter