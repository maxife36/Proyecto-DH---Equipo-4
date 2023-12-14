const path = require('path');

const pathLogin = path.resolve("src", "views", "login.ejs") 


const controllers = {
    login: (req,res) => res.render(pathLogin)
}

module.exports = controllers;