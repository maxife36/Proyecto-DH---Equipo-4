const path = require('path');

const pathSubmenuController = path.resolve("src", "js", "sub-menu-controller.js") 

const controllers = {
    subMenu:  (req,res) => res.sendFile(pathSubmenuController)
}


module.exports = controllers;