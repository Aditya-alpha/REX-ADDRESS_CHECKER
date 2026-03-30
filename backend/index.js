const express = require("express")
const app = express()
const Whitelist = require('./models/whitelist')
const OG = require('./models/og')
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}))

app.post("/check-address", async (req, res) => {
    const { address } = req.body

    try {
        if (!address || typeof address !== "string") {
            return res.status(400).json({ result: null, source: null })
        }

        const [whitelistUser, ogUser] = await Promise.all([
            Whitelist.findOne({ acc_no: address }).lean(),
            OG.findOne({ acc_no: address }).lean()
        ])

        if (whitelistUser) {
            return res.json({ result: true, source: "whitelist" })
        }

        if (ogUser) {
            return res.json({ result: true, source: "og" })
        }

        return res.json({ result: false, source: null })

    } catch (error) {
        console.error("Error checking address:", error)
        return res.status(500).json({ result: null, source: null })
    }
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))