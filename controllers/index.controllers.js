const path = require('path');


const pathIndex = path.resolve("views", "index.ejs");


const controllers = {
    index: (req,res) => res.render(pathIndex)
}

module.exports = controllers;