const User = require("../models/user")
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// SIGNUP MIDDLEWARE //
exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "unable to save the user"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            password: user.password
        });
    })
};

// SIGNIN MIDDLEWARE //
exports.signin= (req, res) => {
   const {email, password} = req.body;
   const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    
    User.findOne({email}, (err, user)=>{
        if(err || !user){
           return res.status(400).json({
                error: "email does not exist"
            })
        }

        if (!user.authenticate(password)){
            return res.status(401).json({
                error: "email and password does not match"
            })
        }

        //TOKEN CREATED
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //PLACING TOKEN IN TO COOKIE
        res.cookie("token", token , {expire: new Date()+99999});

        //RESPONSE TO FRONTEND
        const {_id, name, email, role} = user;
        res.json({token, user:{_id, name, email, role}});
    });
};

// SIGNOUT MIDDLEWARE //
exports.signout = (req, res) => {
    res.clearcookie("token");
    res.json({
        message: "user signout successful"
    })
};

// USING EXPRESS-JWT TO CHECK ISSIGNEDIN OR NOT //
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// CUSTOME MIDDLEWARE FOR AUTHENTICATION CHECK //
exports.isAuthenticate = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

// CUSTOME MIDDLEWARE FOR ISADMIN OR NOT // 
exports.isadmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.json({
            error: "YOU ARE NOT THE ADMIN, UNAUTHORIZED"
        })
    }
    next();
};