const path = require("path");

const pathDkm = path.resolve("src", "DOM-Controllers", "dkm-general-controller.js") 
const pathDkmProductDetail = path.resolve("src", "DOM-Controllers", "dkm-product-detail-controller.js") 
const pathSubMenues = path.resolve("src", "DOM-Controllers", "sub-menu-controller.js") 
const pathForms = path.resolve("src", "DOM-Controllers", "register-form-controller.js") 
const pathHeader = path.resolve("src", "DOM-Controllers", "header-controller.js")

const controllers = {
    darkMode: (req,res) => res.sendFile(pathDkm),
    ProductDetailDkMode: (req,res) => res.sendFile(pathDkmProductDetail),
    subMenues:  (req,res) => res.sendFile(pathSubMenues),
    forms: (req,res) => res.sendFile(pathForms),
    header: (req,res) => res.sendFile(pathHeader)
}

module.exports = controllers;