const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        // id:{ type:id, required: true},
        name: { type: String, required: true }
    }
);


const ProductSchema = new Schema(
    {
        // id:{type: id, required: true},
        name: { type: String, required: true },
        adjective: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        category: { type: String, required: true },
    }
)

module.exports = mongoose.model('Product', ProductSchema);