const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ProductRoute = require("./routes/productRoute");
const OrderRoute = require("./routes/orderRoute");
const cors = require('cors')


////////DB CONNECTION START

let url = "mongodb://localhost/reactPos";

//let url = "mongodb+srv://ocama:zamir@cluster0.k2vij.mongodb.net/pos?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
let db = mongoose.connection;
db.on('open', (res) => console.log("CONNECTED"));
db.on('error', (e) => console.log(e));
////////DB CONNECTION END




//// MIDDLEWARES START
app.use(cors());
app.use(bodyParser.json());
app.use("/product", ProductRoute);
app.use("/order", OrderRoute);
app.use("/", (req, res) => {
    res.send("HEY ITS WORKING")
})
////////MIDDLEWARES END




///////LOCAL PORT
let port = 8000;
app.listen(process.env.PORT || port, () => {
    console.log(`Listening to ${port}`);
});
