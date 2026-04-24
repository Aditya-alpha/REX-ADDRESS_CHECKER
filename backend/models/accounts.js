const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB_URI.replace("<db_name>", "accountsdb")
const accdb = mongoose.createConnection(mongoURI)

let accSchema = new mongoose.Schema({
    acc_no: {
        type: String,
        required: true,
        unique: true
    }
})

let Account = accdb.model("Account", accSchema)

module.exports = Account;