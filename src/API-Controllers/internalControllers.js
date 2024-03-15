const path = require("path");

const pathDkm = path.resolve("src", "DOM-Controllers", "dkm-general-controller.js") 
const pathDkmProductDetail = path.resolve("src", "DOM-Controllers", "dkm-product-detail-controller.js") 
const pathProductDisplayDkMode = path.resolve("src", "DOM-Controllers", "dkm-productDisplay.js") 
const pathSubMenues = path.resolve("src", "DOM-Controllers", "sub-menu-controller.js") 
const pathForms = path.resolve("src", "DOM-Controllers", "register-form-controller.js") 
const pathHeader = path.resolve("src", "DOM-Controllers", "header-controller.js")
const pathSideCart = path.resolve("src", "DOM-Controllers", "sideCart-controller.js") 
const pathMainControllers = path.resolve("src", "DOM-Controllers", "mainControllers.js") 
const pathProductDisplay = path.resolve("src", "DOM-Controllers", "productDisplay.js") 

const controllers = {
    darkMode: (req,res) => res.sendFile(pathDkm),
    ProductDetailDkMode: (req,res) => res.sendFile(pathDkmProductDetail),
    ProductDisplayDkMode: (req,res) => res.sendFile(pathProductDisplayDkMode),
    subMenues:  (req,res) => res.sendFile(pathSubMenues),
    forms: (req,res) => res.sendFile(pathForms),
    header: (req,res) => res.sendFile(pathHeader),
    sideCart: (req,res) => res.sendFile(pathSideCart),
    mainControllers: (req,res) => res.sendFile(pathMainControllers),
    productDisplay: (req,res) => res.sendFile(pathProductDisplay)
}

module.exports = controllers;