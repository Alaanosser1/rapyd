const makeRequest = require('../config/utilities').makeRequest;

exports.getPaymentmethodsByCountry = async (req, res) => {
    const country = req.param('country')
    const currency = req.param('currency')

    console.log(country, currency)

    await makeRequest('GET', `/v1/payment_methods/country?country=${country}&currency=${currency}`)
        .then(data => {
            res.status(200).json({
                paymentOptions: data
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.getPaymentmethodRequiredFields = async (req, res) => {
    const paymentMethod = req.param('method')

    await makeRequest('GET', `/v1/payment_methods/required_fields/${paymentMethod}`)
        .then(data => {
            res.status(200).json({
                requiredFields: data
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.createPayment = async (req, res) => {

    const body = req.body
    console.log(body)

    await makeRequest('POST', `/v1/payments`, body)
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

exports.listPayments = async (req, res) => {
    const customer = req.param('customer')

    await makeRequest('GET', `/v1/payments?customer=${customer}`)
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

exports.retrievePaymentDetails = async (req, res) => {
    const payment = req.param('payment')

    await makeRequest('GET', `/v1/payments/${payment}`)
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