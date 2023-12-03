const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/submenu.controllers');


routes.get('/submenu-controller', controllers.subMenu);


module.exports = routes;