const express = require("express");
const router = express.Router();

const {getProductById, createProduct, getAllProducts, getProduct, photo, updateProduct, removeProduct} = require("../controllers/product");
const {isSignedIn, isAuthenticate, isadmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

// TO GET THE PARAMETERS FROM URL //
router.param("userId", getUserById);
router.param("productId", getProductById);

// TO CREATE PRODUCT IN DATABASE //
router.post("/product/create/:userId", isSignedIn, isAuthenticate, isadmin, createProduct)

// GET PRODUCT FROM DATABASE //
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// UPDATE PRODUCT IN DATABASE //
router.put("/product/:productId/:userId", isSignedIn, isAuthenticate, isadmin, updateProduct);

// REMOVE PRODUCT FROM DATABASE //
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticate, isadmin, removeProduct);

// LISTING THE PRODUCTS //
router.get("/products", getAllProducts);


module.exports = router;