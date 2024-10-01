import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

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
   
    
}


const removeProduct = async (req, res) =>{
    
}


const singleProduct = async (req, res) =>{
    
}

export {addProduct, listProduct, removeProduct, singleProduct}