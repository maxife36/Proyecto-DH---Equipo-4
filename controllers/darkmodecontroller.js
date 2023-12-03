const path = require('path');

const pathDkmGeneralController = path.resolve("js", "dkm-general-controller.js") 
const pathDkmProductDetailController = path.resolve("js", "dkm-product-detail-controller.js") 

const controllers = {
    darkMode: (req,res) => res.sendFile(pathDkmGeneralController),
    
    //pathDkmProductDetailController
    darkmodeProdDetail: (req,res) => res.sendFile(pathDkmProductDetailController),
}


module.exports = controllers;