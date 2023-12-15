const controllers = {
    productoDetail: (req,res) => res.render("productDetail.ejs"),
    productEdit :  (req, res) => res.render("productEdit.ejs"),
    productCart: (req,res) => res.render("productCart.ejs")
}

module.exports = controllers;