const path= require('path');

const pathProductDetail = path.resolve("src", "views", "productDetail.ejs") 

const controllers = {
    productoDetail: (req,res) => res.render(pathProductDetail)
}

module.exports = controllers;