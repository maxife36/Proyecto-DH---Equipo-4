const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt")
const session = require("express-session")

const {DbProduct} = require("../database/controllers")


const controllers = {
    index: async (req, res) => {
        const products = await DbProduct.getProductPagination(15, 0)
        
        res.render("index.ejs", { products })
    },
}


module.exports = controllers;