const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: String,
        required: true,
    },
    productQty: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("Products", productSchema);