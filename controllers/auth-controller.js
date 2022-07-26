const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const {
    hashSync,
    compareSync
} = require('bcrypt')


exports.register = (req, res) => {
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, 10),
        rapydCustomerId: ""
    })
    user.save().then(user => {
        res.status(200).json({
            msg: "user saved",
            status: "ok"
        })
    }).catch(error => {
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })
}

exports.login = (req, res) => {
    UserModel.findOne({
        email: req.body.email,
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                msg: "user not found"
            })
        }
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                msg: "incorrect password"
            })
        }
        const payload = {
            username: user.username,
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(payload, "69q107jk57126", {
            expiresIn: "30d",
        })
        return res.header('Authorization', "Bearer" + token).json({
            msg: "logged in successfully",
            token: "Bearer " + token
        })
    })
}

exports.protected = (req, res) => {
    res.status(200).json({
        id: req.user._id,
        username: req.user.username
    })
}