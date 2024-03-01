const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt")
const session = require("express-session")

const { DbProduct } = require("../database/controllers")


const controllers = {
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


module.exports = controllers;