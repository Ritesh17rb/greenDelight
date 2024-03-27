// Change file extension to .mjs if necessary
// Example: app.mjs

import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// Routes

// create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// Get All category

router.get('/get-category', categoryController)

// Single Category

router.get('/single-category/:slug', singleCategoryController)

// Delete Category

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;
