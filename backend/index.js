const express = require("express")
const app = express()
const Account = require('./models/accounts')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const origin = process.env.ORIGIN

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: origin,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}))

app.post("/check-address", async (req, res) => {
    const { address } = req.body

    try {
        if (!address || typeof address !== "string") {
            return res.status(400).json({ result: null })
        }

        const user = await Account.findOne({ acc_no: address }).lean()

        if (user) {
            return res.json({ result: true })
        }

        return res.json({ result: false })

    } catch (error) {
        console.error("Error checking address:", error)
        return res.status(500).json({ result: null })
    }
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))