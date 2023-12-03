const express = require('express');


const controllers = require('../controllers/index.controllers.js');
const routes = express.Router();



routes.get("/", controllers.index)


module.exports = routes;