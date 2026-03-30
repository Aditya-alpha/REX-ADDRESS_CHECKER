const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB_URI.replace("<db_name>", "ogdb")
const ogdb = mongoose.createConnection(mongoURI)

let ogSchema = new mongoose.Schema({
    acc_no: {
        type: String,
        required: true,
        unique: true
    }
})

let OG = ogdb.model("OG", ogSchema)

module.exports = OG;