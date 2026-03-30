const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB_URI.replace("<db_name>", "whitelistdb")
const whitelistdb = mongoose.createConnection(mongoURI)

let whitelistSchema = new mongoose.Schema({
    acc_no: {
        type: String,
        required: true,
        unique: true
    }
})

let Whitelist = whitelistdb.model("Whitelist", whitelistSchema)

module.exports = Whitelist;