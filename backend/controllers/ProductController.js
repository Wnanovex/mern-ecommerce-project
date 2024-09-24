import Product from "../models/Product.js";// import Product model

const addProduct = async (req, res) => {
    const { name, description, price, category, quantity, brand, image } = req.fields; // get name, description, price, image from request.body
    switch (true) {
        case !name && !description && !price && !category && !quantity && !brand && !image:
            return res.json({ message: "Inputs are Fields" });
        case !name:
            return res.json({ message: "Name is required" });
        case !description:
            return res.json({ message: "Description is required" });
        case !price:
            return res.json({ message: "Price is required" });
        case !category:
            return res.json({ message: "Category is required" });
        case !quantity:
            return res.json({ message: "Quantity is required" });
        case !brand:
            return res.json({ message: "Brand is required" });
        case !image:
            return res.json({ message: "Image is required" });
    }

    try {
        const product = await Product.create({ ...req.fields });
        res.status(201).json(product); // send product to client
    } catch (error) {
        return res.send('Server Error')
    }
    
}

const getSomeProducts = async (req, res) => {
    const pageSize = 6
    const keyword = req.params.keyword ? {name: {$regex: req.query.keyword, $options: "i"}} : {}
    try {
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize); // get all products
        res.json({
          products, 
          page: 1, 
          pages: Math.ceil(count / pageSize), 
          hasMore: false
        }); // send all products to client
    } catch (error) {
        return res.send('Server Error')
    }
};

const updateProductDetails = async (req, res) => {
    const { name, description, price, category, quantity, brand, image } = req.fields; // get name, description, price, image from request.body
    switch (true) {
        case !name:
            return res.json({ message: "Name is required" });
        case !description:
            return res.json({ message: "Description is required" });
        case !price:
            return res.json({ message: "Price is required" });
        case !category:
            return res.json({ message: "Category is required" });
        case !quantity:
            return res.json({ message: "Quantity is required" });
        case !brand:
            return res.json({ message: "Brand is required" });
        case !image:
            return res.json({ message: "Image is required" });
        case !name && !description && !price && !category && !quantity && !brand && !image:
            return res.json({ message: "Inputs are Fields" });
    }
    
   try {
    const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true}); // update product by id and send updated product to client
    await product.save();
    res.status(201).json(product); // send product to client
   } catch (error) {
        return res.send('Server Error')
   }
};


const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id); // delete product by id
        res.json({ message: "Product deleted successfully" }); // send success message  
    } catch (error) {
        return res.send('Server Error')
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // get product by id
        if (product) { // if product is existed
            res.json(product); // send product to client
        }else{
             res.status(404).json({ message: "Product not found" }); // send 404 error message if product not found
             return;
        }
    } catch (error) {
        res.status(500).json({ message: "Product not found" }); // send 500 error message if server error
    }
    
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({
            createdAt: -1 // sort by createdAt in descending order
        }); // get all products
        res.json(products); // send all products to client
    } catch (error) {
        return res.send('Server Error')
    }
};

const addProductReview = async (req, res) => {
    const { rating, comment } = req.body; // get rating, comment from request.body
    try {

        const product = await Product.findById(req.params.id); // add new review to product by id and send updated product to client
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }
        const review = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({message: 'Review added successfully'}); // send product to client
    }else {
        res.status(404).json({ message: "Product not found" }); // send 404 error message if product not found
    }

    } catch (error) {
        return res.send('Server Error')
    }

};

const getTopProducts = async (req, res) => {
   try {
       const products = await Product.find({}).sort({ rating: -1 }).limit(4); // get top 4 products by rating
       res.json(products); // send top 4 products to client
   } catch (error) {
       return res.send('Server Error')
   }
};

const getNewProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ _id: -1 }).limit(5); // get new 5 products by createdAt
        res.json(products); // send new 4 products to client
    } catch (error) {
        return res.send('Server Error')
    }
};

const filterProducts = async (req, res) => {
    const { checked, radio } = req.body; // get checked, radio from request.body
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
    
    try {
        const products = await Product.find(args) // filter products by category and price range
        res.json(products); // send filtered products to client
    } catch (error) {
        return res.send('Server Error')
    }
};


export { addProduct, getSomeProducts, updateProductDetails, deleteProduct, getProductById, getAllProducts, addProductReview, getTopProducts, getNewProducts, filterProducts}
