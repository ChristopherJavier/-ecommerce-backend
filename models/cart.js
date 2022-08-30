const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    date: Date,
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
})

cartSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart