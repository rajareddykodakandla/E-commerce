const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory} = require("../controllers/category");
const {isSignedIn, isAuthenticate, isadmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

// PARMS //
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// TO CREATE THE CATEGORY IN DATABASE //
router.post("/category/create/:userId", isSignedIn, isAuthenticate, isadmin, createCategory);

// TO READ ALL THE CATEGORIES FROM THE DATABASE //
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

// TO UPDATE THE CATEGORY IN DATABASE //
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticate, isadmin, updateCategory);

// TO DELETE THE CATEGORY FROM DATABASE //
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticate, isadmin, removeCategory);

module.exports = router;