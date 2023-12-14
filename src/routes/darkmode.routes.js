const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/darkmodecontroller');


routes.get('/darkmode-controller', controllers.darkMode);


routes.get("/darkmode-ptodcut-detail-controller",controllers.darkmodeProdDetail)


module.exports = routes;