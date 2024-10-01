import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import jwt from 'jsonwebtoken';


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );
        console.log(imagesUrl);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            images: imagesUrl
        };

        const product = new productModel(productData);
        await product.save();

        // Send response only after saving the product
        res.json({
            success: true,
            message: 'Product Added',
            data: productData
        });
        console.log(productData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};




const listProduct = async (req, res) =>{
    try{
        const products=await productModel.find({})
        res.json({success:true, products})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
   
    
}


const removeProduct = async (req, res) =>{

    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:'product removed'})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
    
}


const singleProduct = async (req, res) => {
    try {
        // Extract the product ID from the request parameters
        const { id } = req.body;

        // Find the product by ID
        const product = await productModel.findById(id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Respond with the product data
        res.json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        // Return a server error response with status 500
        res.status(500).json({ success: false, message: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the credentials match the admin credentials stored in environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Sign a JWT token using the admin email (or any other payload)
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Return success with the token
            return res.json({
                success: true,
                message: "Login successful",
                token
            });
        }

        // If credentials don't match, return an invalid credentials message
        res.json({ success: false, message: "Invalid Credentials" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {addProduct, listProduct, removeProduct, singleProduct, adminLogin}