const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const {signout, signup, signin, isSignedIn, isadmin, isAuthenticate} = require("../controllers/auth.js");

// SIGNUP ROUTER //
router.post("/signup", [
    check("name","name should be atleast 3 characters").isLength({min: 3}),
    check("email","email is required").isEmail(),
    check("password","password must be atleast 3 characters").isLength({min: 3})
], signup);

// SIGNIN ROUTER //
router.post("/signin", [
    check("email","email is required").isEmail(),
    check("password","password must be filled").isLength({min: 1})
], signin);

// SIGNOUT ROUTER //
router.get("/signout", signout);

// testing purpore //
router.get("/testauth", isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;