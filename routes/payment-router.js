const paymentRouter = require("express").Router()
const paymentController = require('../controllers/payment-controller')


paymentRouter.get('/getPaymentmethods', paymentController.getPaymentmethodsByCountry)
paymentRouter.get('/getPaymentmethodRequiredFields', paymentController.getPaymentmethodRequiredFields)
paymentRouter.get('/retrievePaymentDetails', paymentController.retrievePaymentDetails)
paymentRouter.get('/listPayments', paymentController.listPayments)
paymentRouter.post('/createPayment', paymentController.createPayment)

module.exports = paymentRouter