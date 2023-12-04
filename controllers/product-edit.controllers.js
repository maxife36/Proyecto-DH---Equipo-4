const path = require("path")

const pathProductEdit = path.resolve("views", "productEdit.ejs")

const controllers = {
    productEdit :  (req, res) => { res.render(pathProductEdit) },
}

module.exports = controllers;