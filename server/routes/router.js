const route = require("express").Router();
route.use('/licenseplates', require('./plateRoute'));
route.use('/ml', require('./mlRoute'));
route.use('/person', require('./personRoute'));
route.use('/fetch_nd_load',require('./fetch_A_load_B_route'));
module.exports = route