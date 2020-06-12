const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// FUNCTION TO GET PRODUCTID //
exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Unable to find the product in database"
            });
        }
        req.Product = product;
        next();
    })
}

// FUNCTION TO CREATE PRODUCT //
exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "problem with the image"
            });
        }

        // FIELD RESTRICTIONS //
        const {name, description, price, category, stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please include all field"
            });
        }
        let product = new Product(fields);

        // FILE RESTRICTIONS //
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too Big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // SAVEING TO THE DATABASE //
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "saving in DB failed"
                })
            }
            res.json(product)
        })
    });
}

// FUNCTION TO GET PRODUCT INFO //
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// FUNCTION  TO GET PHOTO //
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("content-Type", req.product.photo.contentType);
        return res.send(req.Product.photo.data);
    }
    next();
}

// FUNCTIO TO UPDATE PRODUCT //
exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with the image"
            });
        }

    
        let product = req.product;
        product = _.extend(fields);

        // FILE RESTRICTIONS //
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too Big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // SAVEING TO THE DATABASE //
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to update in database"
                })
            }
            res.json(product)
        })
    });
}

// FUNCTION TO REMOVE PRODUCT //
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedproduct) => {
        if(err){
            return res.status(400).json({
                error: "Unable to remove the product"
            });
        }
        res.json({
            message: `Product successfully removed from database => ${deletedproduct}`
        })
    })
}

// FUNCTION TO GET ALL PRODUCTS //
exports.getAllProducts = (req, res) => {
    Product.find().limit(8).exec((err, products) => {
        if(err){
            res.status(400).json({
                error: "Unable to find the product"
            });
        }
        res.json(products);
    });
}