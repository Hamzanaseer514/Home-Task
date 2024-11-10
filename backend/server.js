const express = require("express")
const app = express()
const cors = require("cors")
const {connectToDb} = require("./db")
const userRoutes = require("./Routes/User")
const productRoutes = require("./Routes/Product")

const PORT = 5000





app.use(express.json());
app.use(cors());
app.use("/auth",userRoutes)
app.use("/user",productRoutes)
connectToDb().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Database not connected")
})
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});