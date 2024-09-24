import User from "../models/User.js"; // import User model
import bcrypt from "bcryptjs"; // import bcrypt


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // get all users
        res.json(users); // get all users by json and send to client
    } catch (error) {
        return res.send('Server Error')
    }
}

const getCurrentUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // get current user
        if (user) { // if user is the current user
          res.json(user); // get current user and send to client
        }
        res.status(404); // 404 status
        throw new Error("User not found"); // error User not found
    } catch (error) {
        return res.send('Server Error')
    }
}

const updateCurrentUserProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id); // get current user by id 
    if (user) { // if user is the current user
        user.username = req.body.username || user.username; // get username from request body or user.username and update profile
        user.email = req.body.email || user.email; // get email from request body or user.email and update profile
        if (req.body.password) { // if req.body.password is true
            const salt = await bcrypt.genSalt(10); // generate salt of 10 characters
            user.password = await bcrypt.hash(req.body.password, salt);// update password with hashing the password 
        }
       const updateUser = await user.save(); // save update user
        res.json({ 
            _id: updateUser._id, // send the update id in client
            username: updateUser.username, // send the update username in client
            email: updateUser.email,// send the update email in client
         });
    }else{
        res.status(404);// status code 404
        throw new Error("User not found"); // error User not found
    }

    } catch (error) {
        return res.send('Server Error')
    }
}

const deleteUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id); // find user by id parameter by admin
    if (user) { // user is existed
        if(user.isAdmin) { // if user is admin
            res.status(400); // status code 400
           throw new Error("Cannot delete admin user."); // Cannot admin delete admin user
        }
        await User.deleteOne({_id: user._id}); // delete user by id by admin
        res.json({ message: 'User deleted successfully.' }); // send message to admin user
    } else {
        res.status(404);// status code 404
        throw new Error("User not found."); // error User not found
    }
    } catch (error) {
        return res.send('Server Error')
    }
 
}

const updateUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id);// get user by id parameter
    if (user) {// if user is existed
        user.username = req.body.username || user.username;// get username from request body or user.username and update profile
        user.email = req.body.email || user.email;// get email from request body or user.email and update profile
        user.isAdmin = Boolean(req.body.isAdmin);// make user an admin by admin

        const updateUser = await user.save();// save update user
        res.json({
            _id: updateUser._id,// send the update user._id by admin in client
            username: updateUser.username,// send the update username by admin in client
            email: updateUser.email,// send the update email by admin in client
            isAdmin: updateUser.isAdmin,// send the is admin by admin in client
        });
    } else {
        res.status(404);// 404 status
        throw new Error("User not found.");// error User not found
    }
    } catch (error) {
        return res.send('Server Error')
    }
 
}

// export the functions to userRoutes.js
export { getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUser, updateUser};