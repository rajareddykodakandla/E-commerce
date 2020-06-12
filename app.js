require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// IMPORTING ROUTES //
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const categoryRoute = require("./routes/category.js");
const productRoute = require("./routes/product.js");
//const orderRoute = require("./routes/order.js");

// CREATING THE EXPRESS APP //
const app = express();

// DB CONNECTION //
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DATABASE CONNECTED");
});

// MIDDLEWARES //
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTES //
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
//app.use("/api", orderRoute);

// PORT //
const port = process.env.PORT;

// SERVER //
app.listen(port, () =>{
    console.log(`server is running at ${port}`);
})