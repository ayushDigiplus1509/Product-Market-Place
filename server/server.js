import express from 'express'
import dotenv from "dotenv"
import { connectionDB } from './config/db.js'
import productRoutes from "./routes/product.route.js"
import rateLimiter from './middleware/rateLimiter.js'


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
app.use(rateLimiter) // this adds rate limiting to all routes, making sure that users can't make too many requests in a short period of time, 
// which helps to protect the server from being overwhelmed by too many requests and can prevent abuse or attacks.
app.use("/api/products", productRoutes) // this is custom middleware which will be used to handle all the routes related to products

// rate limiting is a way to control how often someone can do something on a website or app like how many times they can refresh a page, 
// make a request to an api or try to login, it can implemented by middleware 429 is the status code for too many requests.

app.get("/", (req, res) => {
    res.send("This is home page hello")
})

connectionDB().then(() => {
    console.log("Connected to database")
    app.listen(PORT, () => {
        connectionDB()
        console.log(` Server started at port ${PORT}`)
    })

}).catch((error) => {
    console.error("Error connecting to database:", error)
})


