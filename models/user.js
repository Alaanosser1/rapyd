const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://rapydCluster:rapyd2022@rapydcluster.f8sc9dy.mongodb.net/?retryWrites=true&w=majority")

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    rapydCustomerId: String,
    rapydEwalletId: String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel