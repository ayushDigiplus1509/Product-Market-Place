import express from 'express'
import dotenv from "dotenv"
import { connectionDB } from './config/db.js'
const app =express()
dotenv.config()


app.listen(5000, ()=>{
    connectionDB()
console.log("Server started at port 5000")
})


app.get("/", (req, res)=>{
    res.send("This is home page hello")
})

app.get("/products", (req, res)=>{
    res.send("Server is ready, here are the products..")
})

// mongodb+srv://ayushg:ayush123@cluster0.kus7wdo.mongodb.net/?appName=Cluster0
// this is connection string for mongo db cluster