import express from 'express';// import express
const router = express.Router(); // using router
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js" // import AuthMiddleware
import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, getOrderById, markOrderAsPaid, markOrderAsDelivered } from '../controllers/OrderController.js';

router.route('/')
      .post(authenticate, createOrder)
      .get(authenticate, authorizeAdmin, getAllOrders)

router.get('/mine', authenticate, getUserOrders)

router.get('/total-orders', countTotalOrders)

router.get('/total-sales', calculateTotalSales)

router.get('/total-sales-by-date', calculateTotalSalesByDate)

router.get('/:id', authenticate, getOrderById)

router.put('/:id/pay', authenticate, markOrderAsPaid)

router.put('/:id/deliver', authenticate, authorizeAdmin, markOrderAsDelivered)

export default router; // export the router