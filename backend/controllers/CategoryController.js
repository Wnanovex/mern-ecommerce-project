import Category from "../models/Category.js";

const createCategory = async (req, res) => {
    try {
        const {name} = req.body; 
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = await Category.create({name});
        res.status(201).json(category); // create a new category and send to client
        
    } catch (error) {
        return res.send('Server Error')
    }

}

const updateCategory = async (req, res) => {
    const { name } = req.body; // get name from body
    const {categoryId} = req.params; // get id from params
    
    try {
    const category = await Category.findOne({_id: categoryId}); // find category by id and update it.
    
    if (!category) { // if category is not found
        return res.status(404).json({ message: "Category not found" });
    }

    category.name = name; // update name of category
    const updatedCategory = await category.save(); // save updated category
    res.json(updatedCategory); // send updated category to client
    } catch (error) {
        return res.send('Server Error')
    }

};

const deleteCategory = async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId); // find category by id and delete it.
        res.json(removed)
    } catch (error) {
        return res.send('Server Error')
    }
};

const listCategory = async (req, res) => {
   try {
      const categories = await Category.find({}); // find all categories
      res.json(categories); // send all categories to client
   } catch (error) {
      return res.send('Server Error')
   }
};


export { createCategory, updateCategory, deleteCategory, listCategory }