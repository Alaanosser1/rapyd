const makeRequest = require('../config/utilities').makeRequest;
const UserModel = require('../models/user')

exports.createCustomer = async (req, res) => {
    const userId = req.param('user')
    let rapydUserId
    let isError = false
    let returnedObject
    let userAlreadyExists = false
    const body = req.body

    await UserModel.findOne({
        _id: userId
    }).then(user => {
        if (user.rapydCustomerId) {
            console.log(user.rapydCustomerId)
            userAlreadyExists = true
        }
    })

    if (!userAlreadyExists) {
        await makeRequest('POST', `/v1/customers`, body)
            .then(data => {
                rapydUserId = data.body.data.id
                returnedObject = data
            }).catch(error => {
                isError = true
                console.log(error)
                res.status(500).json({
                    status: "error",
                    msg: "500 Internal Server Error"
                })
            })
        await UserModel.update({
            _id: userId
        }, {
            $set: {
                rapydCustomerId: rapydUserId
            }
        })

        if (!isError) {
            res.status(200).json({
                data: returnedObject
            })
        }
    } else {
        res.status(400).json({
            status: "User already has a rapyd account",
            msg: "400 Internal Server Error"
        })
    }

}

exports.addPaymentMethodToCustomer = async (req, res) => {
    const body = req.body
    const customer = req.param('customer')
    console.log(customer)

    await makeRequest('POST', `/v1/customers/${customer}/payment_methods`, body)
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