import express from 'express';// import express
import formidable from 'express-formidable';
const router = express.Router(); // using router
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js" // import AuthMiddleware
import checkId from '../middlewares/checkId.js';
import { addProduct, updateProductDetails, deleteProduct, getSomeProducts, getProductById, getAllProducts, addProductReview , getTopProducts, getNewProducts, filterProducts} from '../controllers/ProductController.js';

router.route('/')
      .post(authenticate, authorizeAdmin, formidable(), addProduct)
      .get(getSomeProducts)

router.get('/allProducts', getAllProducts)

router.post('/:id/reviews' ,authenticate, checkId, addProductReview)

router.get('/top', getTopProducts)

router.get('/new', getNewProducts)

router.route('/:id')
      .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
      .delete(authenticate, authorizeAdmin, deleteProduct)
      .get(getProductById);

router.route('/filtered-products').post(filterProducts);


export default router;