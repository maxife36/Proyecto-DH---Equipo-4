const path = require('path');

const pathProductCart = path.resolve("views", "productCart.ejs") 

const controllers = {
    productCart: (req,res) => res.render(pathProductCart)
}

module.exports = controllers;