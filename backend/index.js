//packages
import path from 'path';
import express from 'express'; // import express
import dotenv from 'dotenv'; // import dotenv
import cookieParser from 'cookie-parser'; // import cookieParser
import cors from 'cors'

// Imports files
import connectDB from './config/db.js'; // import connectDB
import userRoutes from './routes/userRoutes.js' // import userRoutes
import authRoutes from './routes/authRoutes.js'; // import authRoutes
import categoryRoutes from './routes/categoryRoutes.js'; // import categoryRoutes
import productRoutes from './routes/productRoutes.js'; // import productRoutes
import uploadRoutes from './routes/uploadRoutes.js'; // import uploadRoutes
import orderRoutes from './routes/orderRoutes.js'; // import orderRoutes

dotenv.config() // allow index.js to read variables in .env file

connectDB() // connection to database 

const app = express(); // using express
app.use(cors())

app.use(express.json()); // send JSON request
app.use(express.urlencoded({extended: true})); // receive data from frontend 
app.use(cookieParser()); // use cookie parser

// Define routes
app.use('/api/users', userRoutes, authRoutes); // connect to routes and write default url
app.use('/api/category', categoryRoutes); // connect to routes and write default
app.use('/api/products', productRoutes); // connect to routes and write default
app.use('/api/upload', uploadRoutes); // connect to routes and write
app.use('/api/orders', orderRoutes); // connect to routes and write

app.use('/api/config/paypal', (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
}); // connect to routes

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname + '/uploads'))); // connect to routes and write')

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}


// Running the server
const port = process.env.PORT || 5000; // default port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})