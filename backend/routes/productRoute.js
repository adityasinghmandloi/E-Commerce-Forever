import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct, adminLogin } from '../controllers/productController.js';
import upload from '../middleware/multer.js'; // Make sure this is where your upload middleware is defined
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Configure file uploads
productRouter.post('/add', adminAuth,  
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ])
    , 
    addProduct
);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/list', listProduct);
productRouter.post('/admin', adminLogin)

export default productRouter;
