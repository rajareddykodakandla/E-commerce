const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const productincartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "product"
    },
    name: String,
    count: Number,
    price: Number
},
{timestamps: true});

const productincart = mongoose.model("productincart",productincartSchema);

const orderSchema = new mongoose.Schema({
   products: [productincartSchema],
   transaction_id: {},
   amount: {
       type: Number
   },
   address: {
       type: String,
       required: true
   },
   updated: Date,
   user: {
       type: ObjectId,
       ref: "user"
   }
},
{timestamps: true});

const order = mongoose.model("order",orderSchema);

module.exports = {order , productincart}