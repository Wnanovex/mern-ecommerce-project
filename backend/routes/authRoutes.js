import express from 'express';// import express
const router = express.Router(); // using router
import { createUser, loginUser, logout } from '../controllers/AuthController.js';// import AuthController

router.post('/', createUser)// create a new user

router.post('/auth', loginUser) // login user with a post method

router.post('/logout', logout) // log out user with a post method

export default router; // export the router