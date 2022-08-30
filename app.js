const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const middleware = require("./utils/middleware")
const productsRouter = require("./controllers/products")
const cartRouter = require("./controllers/cart")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

logger.info("connecting to mongodb", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB: ", error.message)
    })

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app