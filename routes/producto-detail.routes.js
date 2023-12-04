const express = require('express');

const routes = express.Router();

const controllers = require('../controllers/product-detail.controllers')

routes.get('/product-detail', controllers.productoDetail)

module.exports = routes;