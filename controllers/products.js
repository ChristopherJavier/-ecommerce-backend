const productsRouter = require("express").Router()
const Product = require("../models/product")

productsRouter.get("/", async (request, response) => {
    const products = await Product.find({})

    const availableProducts = products.filter(i => i.stock > 0)
    
    response.json(availableProducts)
})

productsRouter.get("/:id", async (request, response) => {
    const id = request.params.id
    const product = await Product.findById(id)

    if (!product || product.length === 0) {
        response.status(404).end
    }

    if (product.stock < 0) {
        response.status(409).json("This product is not available now")
    }

    response.json(product)
})

productsRouter.post("/new", async (request, response) => {
    const body = request.body

    const product = new Product({
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock || 0,
        image: body.image || "",
    })

    if (!body.name || !body.price) {
        return response.status(400).json({
            error: "name and price is required"
        })
    }

    const savedProduct = await product.save()

    response.status(201).json(savedProduct)
})

module.exports = productsRouter