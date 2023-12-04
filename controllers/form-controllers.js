const path = require('path');

const pathFormsController = path.resolve("js", "register-form-controller.js") 

const controllers = {
    form: (req,res) => res.sendFile(pathFormsController)
}


module.exports = controllers;