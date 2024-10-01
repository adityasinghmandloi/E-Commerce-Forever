import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },            // User's name, required
    email: { type: String, required: true, unique: true },  // User's email, required and unique
    password: { type: String, required: true },        // User's hashed password, required
    cartData: { 
        type: Object,                                   // Cart data as an array of objects (for products)
        default: {}                                    // Default is an empty array
    }
}, { minimize: false });                               // To prevent MongoDB from removing empty objects

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
