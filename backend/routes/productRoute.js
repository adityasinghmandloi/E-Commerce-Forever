import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js'; // Make sure this is where your upload middleware is defined

const productRouter = express.Router();

// Configure file uploads
productRouter.post('/add', 
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ])
    , 
    addProduct
);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/list', listProduct);

export default productRouter;
