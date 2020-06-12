const Category = require("../models/category");

// FUNCTION TO GET CATEGORYID //
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, Cate) => {
        if(err){
            return res.status(400).json({
                error: "Category is not found in database"
            });
          }
            req.category = Cate;
            next();
    });
}

// FUNCTION TO CREATE CATEGORY //
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "unable to create category"
            });
        }
        res.json({category});
    });
}

// FUNCTION TO GET CATEGORY //
exports.getCategory = (req, res) => {
    return res.json(req.category);
}

// FUNCTION TO GET ALLCATEGORIES //
exports.getAllCategories = (req, res) => {
    category.find().exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "No categories are found"
            });
        }
        res.json(category);
    });
}

// FUNCTION TO UPDATE CATEGORY //
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Unable to update the category"
            });
        }
        res.json(updatedCategory);
    });
}

// FUNCTION TO REMOVE CATEGORY //
exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, removedcategory) => {
        if(err){
            return res.status(400).json({
                error: "Unable to remove the user"
            });
        }
        res.json({
            message: `Successfully removed category ${removedcategory}`
        })
    })
}