import generateToken from "../utils/createToken.js"; // import generateToken
import bcrypt from "bcryptjs"; // import bcrypt
import User from "../models/User.js"; // import User model

const createUser = async (req, res) => {
    const { username, email, password } = req.body; // get username,email,password from request.body
    
     if (!username && !email && !password) {
        return res.status(401).send("Please fill all the inputs.") // validation of inputs
    }
    else if (!username) {
        return res.status(401).send("Username is required.") // validation of inputs
    }
    else if (!email) {
        return res.status(401).send("Email is required.") // validation of inputs
    }
    else if (!password) {
        return res.status(401).send("Password is required.") // validation of inputs
    }
    else if (password.length < 8) {
        return res.status(401).send("Password must be at least 8 characters long."); // validation of inputs
    }

    try {
        const userExists = await User.findOne({ email }); // get user exists by email
    
    if (userExists) { // if user exists
       res.status(400).send("User already exists");// User already exists
    }
    const salt = await bcrypt.genSalt(10); // generate salt of 10 characters
    const hashedPassword = await bcrypt.hash(password, salt); // hash password

        const user = await User.create({ username, email, password: hashedPassword });// create new user
        generateToken(res, user._id); // create new token (send response, send user._id)
        res.status(201).json({ 
            _id: user._id, // send the user id in client
            username: user.username, // send the username in client
            email: user.email, // send the email in client
            isAdmin: user.isAdmin, //
         }); // send response json object user in client
    } catch (error) {
        return res.send('Server Error') // if error occurs while creating user, send error to client
    }

}


const loginUser = async (req, res) => {
    const { email, password } = req.body;// get email,password from request.body
    try {
        const existingUser = await User.findOne({email}); // get user exists by email
    
    if (existingUser) { // if user already exists
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); // check password
        if (isPasswordValid) { // if password is valid
            generateToken(res, existingUser._id);// create new token (send response, send user._id)
            return res.json({ 
                _id: existingUser._id, // send the user id in client
                username: existingUser.username, // send the username in client
                email: existingUser.email, // send the email in client
                isAdmin: existingUser.isAdmin, //
             }); // send response json object user in client
        }else{
            return res.status(401).send("Email or Password are Invalid"); // if password is invalid
        }
        
    }else{
        return res.status(401).send("Email or Password are Invalid"); // if user does not exist or password is invalid
    }
    } catch (error) {
        return res.send('Server Error') // if error occurs while logging in user, send error to client
    }
}

const logout = async (req, res) => {
   try {
    res.clearCookie("jwt"); // clear the session id cookie
    res.status(200).json({message: 'logout successful'}); // logout successful
   } catch (error) {
    return res.send('Server Error')
   }
}

export { createUser, loginUser, logout }; // export all functions