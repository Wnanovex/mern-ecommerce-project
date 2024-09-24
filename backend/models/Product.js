import mongoose from "mongoose"; // import mongoose
const {ObjectId} = mongoose.Schema

const reviewSchema = mongoose.Schema({ // build the columns in table users
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the user collection
        required: true, // required field
    }
    
} ,
    { timestamps: true } // add timestamps to the documents in the collection
)

const productSchema = mongoose.Schema({ // build the columns in table users
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type:  Number,
        required: true, // required field
    },
    category: {
        type: ObjectId,
        ref: "Category", // reference to the category collection
        required: true, // required field
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [reviewSchema], // array of reviews for each product
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
    
} ,
    { timestamps: true } // add timestamps to the documents in the collection
)


const Product = mongoose.model("Product", productSchema); // create a users table

export default Product; // export the User models