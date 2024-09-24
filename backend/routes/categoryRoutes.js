import express from 'express';// import express
const router = express.Router(); // using router
import { createCategory, updateCategory, deleteCategory, listCategory } from '../controllers/CategoryController.js'; // import categoryController
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js" // import AuthMiddleware

router.post('/', authenticate, authorizeAdmin, createCategory)

router.route('/:categoryId')
      .put(authenticate, authorizeAdmin, updateCategory)
      .delete(authenticate, authorizeAdmin, deleteCategory)

router.get('/categories', listCategory)

export default router;