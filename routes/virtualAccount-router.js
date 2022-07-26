const virtualAccountRouter = require("express").Router()
const virtualAccountController = require('../controllers/virtualAccount-controller')

virtualAccountRouter.get('/listVirtualAccountsByWallet', virtualAccountController.listVirtualAccountsByWallet)
virtualAccountRouter.get('/listCapabilitiesOfVirtualAccountsperCountry', virtualAccountController.listCapabilitiesOfVirtualAccountsperCountry)
virtualAccountRouter.post('/issueVirtualBankAccount', virtualAccountController.issueVirtualBankAccount)


module.exports = virtualAccountRouter