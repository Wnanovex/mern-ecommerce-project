import express from "express"; // import express
import { getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUser, updateUser } from "../controllers/UserController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js" // import AuthMiddleware
const router = express.Router(); // using router

router.get('/', authenticate, authorizeAdmin, getAllUsers); // Only admin can get all users


// USER ROUTES --------------------------------
router.route('/profile')
      .get(authenticate, getCurrentUserProfile)// Only current user can get his profile
      .put(authenticate, updateCurrentUserProfile);// Only current user can update his profile

// ADMIN ROUTES --------------------------------
router.route('/:id')
     .delete(authenticate, authorizeAdmin, deleteUser)// Only admin can delete users
     .put(authenticate, authorizeAdmin, updateUser);// Only admin can update users

export default router; // export router