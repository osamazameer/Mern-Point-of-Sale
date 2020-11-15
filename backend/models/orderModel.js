const mongoose = require("mongoose");


const stockSchema = new mongoose.Schema({
    products: [{
        _id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
        productName: {
            type: String,
            required: true,
            default: 0,
        },
        Qty: {
            type: Number,
            required: true,
            default: 0,
        },
        unitPrice: {
            type: Number,
            required: false,
            default: 0,
        },
        QtyPrice: {
            type: Number,
            required: false,
            default: 0,
        },

    }],
    bill: {
        type: Number,
        default: 0,
    }

})

module.exports = mongoose.model("Order", stockSchema);