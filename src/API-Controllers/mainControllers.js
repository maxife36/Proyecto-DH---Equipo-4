const path = require('path');
const fs = require("fs");


const productsDbJSON = fs.readFileSync(path.join(__dirname, "..", "temporary-DB", "products-DB.json"), "utf-8")
const productsDb = JSON.parse(productsDbJSON)


const controllers = {
    index: (req,res) => res.render("index.ejs", {productsDb}),
    login: (req,res) => res.render("login.ejs"),
    register: (req,res) => res.render("register.ejs")
}


module.exports = controllers;