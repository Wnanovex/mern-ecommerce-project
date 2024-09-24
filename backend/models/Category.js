import mongoose from "mongoose"; // import mongoose

const categorySchema = mongoose.Schema({ // build the columns in table users
    name: {
        type: String,
        required: true,
        trim: true, // remove the spaces from end && start string
        maxlength: 40,
        unique: true, // unique category name
    },
    
} 
)

const Category = mongoose.model("Category", categorySchema); // create a users table

export default Category; // export the User models