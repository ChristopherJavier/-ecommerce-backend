const cartRouter = require("express").Router()
const Cart = require("../models/cart")
const Product = require("../models/product")


cartRouter.post("/check", async (request, response) => {
    const body = request.body

    await Product.updateMany({ _id: { $in: body.items } }, { $inc: { stock: -1 } })

    const items = await Product.find({ _id: { $in: body.items } })
    
    const cart = await new Cart({
        date: new Date(),
        items: items.map(i => i._id)
    })

    const savedCart = await cart.save()

   response.status(201).json(savedCart._id)
})

module.exports = cartRouter