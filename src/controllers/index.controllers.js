const path = require('path');
const fs = require("fs");
const { parse } = require('querystring');


const productsDbJSON = fs.readFileSync(path.join(__dirname, "..", "temporary-DB", "products-DB.json"), "utf-8")
const productsDb = JSON.parse(productsDbJSON)


const pathIndex = path.resolve("src", "views", "index.ejs");


const controllers = {
    index: (req,res) => res.render(pathIndex, {productsDb})
}


module.exports = controllers;