const express = require('express');

const routes = express.Router();

const controllers = require('../controllers/product-cart.controllers');


routes.get("/product-cart", controllers.productCart);


module.exports = routes;