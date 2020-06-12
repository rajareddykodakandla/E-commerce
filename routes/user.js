const express =  require("express");
const router = express.Router();


const {getUserById, getUser, userupdate, userPurchaselist} = require("../controllers/user")
const {isSignedIn, isAuthenticate, isadmin} = require("../controllers/auth");

// TO GET THE USER PARAMETER FROM THE URL //
router.param("userId", getUserById);

// TO GET THE USER PROFILE //
router.get("/user/:userId", isSignedIn, isAuthenticate, getUser);

// TO UPDATE THE USER IN DATEBASE //
router.put("/user/:userId", isSignedIn, isAuthenticate, userupdate);

// TO GET THE USER PURCHASELIST FROM THE DATABASE(from array) //
router.get("/user/orders/:userId", isSignedIn, isAuthenticate, userPurchaselist);


module.exports = router;