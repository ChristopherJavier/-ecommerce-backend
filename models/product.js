const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    description: {
        type: String,
        maxlength: 240,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    image: String,
})

productSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Product", productSchema)