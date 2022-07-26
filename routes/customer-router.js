const customerRouter = require("express").Router()
const customerController = require('../controllers/customer-controller')


customerRouter.post('/createCustomer', customerController.createCustomer)
customerRouter.post('/addPaymentMethodToCustomer', customerController.addPaymentMethodToCustomer)


module.exports = customerRouter