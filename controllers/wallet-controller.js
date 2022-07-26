const makeRequest = require('../config/utilities').makeRequest;
const UserModel = require('../models/user')

exports.createWallet = async (req, res) => {

    const userId = req.param('user')
    let rapydEwalletId
    let response
    let ewalletAlreadyExists = false
    let isError = false

    await UserModel.findOne({
        _id: userId
    }).then(user => {
        console.log(user.username)
        if (user.rapydEwalletId) {
            ewalletAlreadyExists = true
        }
    })

    if (!ewalletAlreadyExists) {

        const body = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            ewallet_reference_id: req.body.ewallet_reference_id,
            metadata: req.body.metadata,
            type: req.body.type,
            contact: req.body.contact,
            identification_type: req.body.identification_type,
            identification_number: req.body.identification_number,
            date_of_birth: req.body.date_of_birth,
            country: req.body.country,
            nationality: req.body.nationality,
        }

        await makeRequest('POST', `/v1/user`, body)
            .then(data => {
                response = data
                console.log(data.body.data.id, '$$$$$$$$$$$$')
                rapydEwalletId = data.body.data.id
                console.log(rapydEwalletId, "then")
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
                rapydEwalletId: rapydEwalletId
            }
        })

        if (!isError) {
            res.status(200).json({
                msg: "ewallet created",
                data: response
            })
        }
    } else {
        return res.status(400).json({
            status: "error",
            msg: "400 bad request"
        })
    }


}

exports.transfereFundsBetweenWallets = async (req, res) => {

    const body = req.body
    console.log(body)

    await makeRequest('POST', `/v1/account/transfer`, body)
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

exports.listWallet = async (req, res) => {
    const ewallet_reference_id = req.param('ewallet_reference_id')
    const type = req.param('type')

    await makeRequest('GET', `/v1/user/wallets?type=${type}&ewallet_reference_id=${ewallet_reference_id}`)
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