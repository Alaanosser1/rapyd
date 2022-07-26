const walletRouter = require("express").Router()
const walletController = require('../controllers/wallet-controller')

walletRouter.get('/listWallet', walletController.listWallet)
walletRouter.post('/createWallet', walletController.createWallet)
walletRouter.post('/transfereFundsBetweenWallets', walletController.transfereFundsBetweenWallets)

module.exports = walletRouter