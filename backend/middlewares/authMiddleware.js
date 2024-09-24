import jwt from "jsonwebtoken"; // import jwt
import User from "../models/User.js"; // import User model

const authenticate = async (req, res, next) => { // function of only users
    // Read JWT from the 'jwt' cookie
    const token = req.cookies.jwt; // get the token from cookies.jwt
    
    if (token) { // if the token is valid
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);// decode the token get the userId
            req.user = await User.findById(decoded.userId).select("-password");// get the user by userId and don't get a password
            next(); // complete the request
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed.")// The token is invalid
        }
    }else{
        res.status(401)
        throw new Error("Not authorized, no token found.")// No token found
    }

}

const authorizeAdmin = (req, res, next) => { // function of only admins
    if(req.user && req.user.isAdmin){ // if there are user and user is admin
        next(); // complete the request
    }else{
        res.status(401).send("You are not authorized as an admin") // You are not admin
    }
}

export { authenticate, authorizeAdmin }; // export authenticate and authorizeAdmin