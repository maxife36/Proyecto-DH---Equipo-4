const path = require('path');

const pathLogin = path.resolve("views", "login.ejs") 


const controllers = {
    login: (req,res) => res.render(pathLogin)
}

module.exports = controllers;