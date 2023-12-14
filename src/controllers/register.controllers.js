const path = require('path');

const pathRegister = path.resolve("src", "views", "register.ejs") 

const controllers = {
    register: (req,res) => res.render(pathRegister)
}

module.exports = controllers;