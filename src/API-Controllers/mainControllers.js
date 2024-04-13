require('dotenv').config()

const { DbProduct } = require("../database/controllers")

module.exports = {
    hostName: (req, res) => {
        const APP_HOST = process.env.APP_HOST
        res.send(APP_HOST)
    },
    index: async (req, res) => {
        const products = await DbProduct.getProductPagination(15, 0)
        res.render("index.ejs", { products })
    },
    forward: async (req, res) => {
        const limit = req.query.limit
        const offset = req.query.offset
// TERMIANR DE COMPLETAR 

        const products = await DbProduct.getProductPagination(limit, offset)
        res.render("index.ejs", { products })
    },
}

