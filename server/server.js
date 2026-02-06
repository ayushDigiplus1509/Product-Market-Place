import express from 'express'
import dotenv from "dotenv"
import { connectionDB } from './config/db.js'
import Product from './models/product.model.js'
const app = express()
dotenv.config()


app.use(express.json()) // this is middleware
/*
➡️ Reads the incoming request body
➡️ Parses JSON data
➡️ Converts it into a JavaScript object
➡️ Attaches it to req.body
*/

app.listen(5000, () => {
    connectionDB()
    console.log("Server started at port 5000")
})


app.get("/", (req, res) => {
    res.send("This is home page hello")
})

app.post("/api/products", async (req, res) => {

    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" })
        // if we don't send any response then client will just keep waiting for response stoping the application execution
    }

    const newProduct = new Product(product)
    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    }
    catch (error) {
        console.error("Error in create product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

app.delete("/api/products/:id", async (req, res) => {

    const {id} = req.params
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json()
    }
    catch(error){
        console.error("Error in deleting product",error.message)
        res.status(500).json({success: false, message:error.message})
    }
    console.log(id)

})