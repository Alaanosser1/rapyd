const express = require("express")
const bodyPareser = require("body-parser")
const cors = require('cors')
const passport = require('passport')
const app = express()
const authRouter = require('./routes/auth-router')
const paymentRouter = require("./routes/payment-router")
const customerRouter = require("./routes/customer-router")
const virtualAccountRouter = require("./routes/virtualAccount-router")
const walletRouter = require("./routes/wallet-router")

app.use(bodyPareser.json())
app.use(bodyPareser.urlencoded({
    extended: true
}))
app.use(passport.initialize())
require("./config/passport")

app.use('/user', authRouter)
app.use('/payment', paymentRouter)
app.use('/customer', customerRouter)
app.use('/virtualAccount', virtualAccountRouter)
app.use('/wallet', walletRouter)

app.use((req, res, next) => {
    const error = new Error("Page not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        res.status(404).json({
            status: "error",
            msg: "Page not Found"
        })
    } else {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    }
})

module.exports = app;