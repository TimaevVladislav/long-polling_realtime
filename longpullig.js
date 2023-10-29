const express = require("express")
const cors = require("cors")
const routes = require("./routes/index.api")

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1", routes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))