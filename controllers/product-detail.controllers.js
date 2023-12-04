const path= require('path');

const pathProductDetail = path.resolve("views", "productDetail.ejs") 

const controllers = {
    productoDetail: (req,res) => res.render(pathProductDetail)
}

module.exports = controllers;