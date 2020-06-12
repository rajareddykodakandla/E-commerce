const User = require("../models/user");
const Order = require("../models/order");

// FUNCTION TO GET USERID //
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "user not found in database"
            });
        }
        req.profile = user;
        next();
    });
};

// FUNCTION TO GET USER //
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.secure_password = undefined;
    return res.json(req.profile);
};

// FUNCTION TO UPDATE USER //
exports.userupdate = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You can not update this"
                });
            }else{
            user.salt = undefined;
            user.secure_password = undefined;
            res.json(user);
            }
        }
    );
};

// FUNCTION TO GET PURCHASELIST //
exports.userPurchaselist = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "You don't have any orders"
            })
        }
        res.json(order);
    })
};

// FUNCTION USED TO PUSH ITEMS INTO PURCHASELIST //
exports.pushOrdersInPurchaselist = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    // TO STORE THIS IN DATABASE //
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: {purchases: purchases}},
        { new: true },
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save the list"
                })
            }
            next();
        }
    )
}