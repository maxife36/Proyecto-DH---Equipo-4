const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/form-controllers');


routes.get('/forms-controller', controllers.form);


module.exports = routes;