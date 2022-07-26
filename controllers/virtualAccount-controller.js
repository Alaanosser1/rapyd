const makeRequest = require('../config/utilities').makeRequest;

exports.issueVirtualBankAccount = async (req, res) => {
    const body = {

        currency: req.body.currency,
        country: req.body.country,
        description: req.body.description,
        ewallet: req.body.ewallet,
        merchant_reference_id: req.body.merchant_reference_id,
        metadata: req.body.metadata
    }


    await makeRequest('POST', `/v1/issuing/bankaccounts`, body)
        .then(data => {
            res.status(200).json({
                data: data
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}
exports.listCapabilitiesOfVirtualAccountsperCountry = async (req, res) => {
    const country = req.param('country')
    const currency = req.param('currency')

    await makeRequest('GET', `/v1/issuing/bankaccounts/capabilities/country=us&currency=sgd`)
        .then(data => {
            res.status(200).json({
                data: data
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}
exports.listVirtualAccountsByWallet = async (req, res) => {
    const ewallet = req.param('ewallet')

    await makeRequest('GET', `/v1/issuing/bankaccounts/list?ewallet=${ewallet}`)
        .then(data => {
            res.status(200).json({
                data: data
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}