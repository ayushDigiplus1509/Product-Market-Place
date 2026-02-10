import Product from '../models/product.model.js'
import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

export const getProducts = async (req, res) => {
    // this will return all the products present in the database
    try {
        const products = await Product.find()
        res.status(200).json({ success: true, message: products })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const createProduct = async (req, res) => {
    // this will add product to the database
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
}

export const deleteProduct= async (req, res) => {
    // this will find and delete a particular product by id
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json()
    }
    catch (error) {
        console.error("Error in deleting product", error.message)
        res.status(404).json({ success: false, message: "Product not found" })
    }
    console.log(id)

}

export const updateProduct=async (req, res) => {
    // this will update the product in database
    const { id } = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such product exist" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
    }
}