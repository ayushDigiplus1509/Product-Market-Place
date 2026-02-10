import express from 'express'
import dotenv from "dotenv"
import { connectionDB } from './config/db.js'
import productRoutes from "./routes/product.route.js"


const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

app.use(express.json()) // this is middleware
/*
➡️ Reads the incoming request body
➡️ Parses JSON data
➡️ Converts it into a JavaScript object
➡️ Attaches it to req.body
*/

app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
    res.send("This is home page hello")
})

app.listen(PORT, () => {
    connectionDB()
    console.log(`Server started at port ${PORT}`)
})


