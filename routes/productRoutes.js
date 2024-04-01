import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

// Routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// Get Products

router.get('/get-product', getProductController)

// Single Product

router.get('/get-product/:slug', getSingleProductController)

// Get Photo

router.get('/product-photo/:pid', productPhotoController)

// Delete Product

router.delete('/delete-product/:pid', deleteProductController)


// Update Product

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// Filter Product

router.post('/product-filters', productFiltersController)

// Product Count
router.get('/product-count', productCountController)


router.get('/product-list/:page', productListController)

// Search Product

router.get('/search/:keyword', searchProductController);

// Similar Products

router.get('/related-product/:pid/:cid', relatedProductController)


export default router