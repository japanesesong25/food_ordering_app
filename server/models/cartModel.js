const { type } = require("@testing-library/user-event/dist/type");
const { ref } = require("firebase/database");
const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
    {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        amount:  {
            type: Number,
            required: true,
          }}
);

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        items: [cartItemSchema], 
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);