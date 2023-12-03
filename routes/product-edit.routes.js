const express = require("express");

const routes = express.Router();

const controllers = require("../controllers/product-edit.controllers.js");

routes.get("/product-edit", controllers.productEdit)

module.exports = routes;