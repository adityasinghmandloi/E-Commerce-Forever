import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },           // Name is a required string
    description: { type: String, required: true },    // Description is a required string
    price: { type: Number, required: true },          // Price is a required number
    image: { type: Array, required: true },          // Image is a string (URL of the image)
    category: { type: String, required: true },       // Category is a required string
    subCategory: { type: String, required: true},                    // Subcategory is an optional string
    sizes: { type: [String], required: true },                        // Sizes are an array of strings (like ["S", "M", "L"])
    bestSeller: { type: Boolean },    // Bestseller is a boolean with a default value of false
    date: { type: Date, default: Date.now },          // Date is a Date object with a default value of the current date
});

const productModel =  mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
