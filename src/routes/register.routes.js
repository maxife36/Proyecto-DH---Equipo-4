const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/register.controllers')

routes.get('/register', controllers.register);

module.exports = routes;