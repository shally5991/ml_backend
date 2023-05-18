var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var guard = require("express-jwt-permissions")();

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-gxdiahl2.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://giroux/api',
    issuer: 'https://dev-gxdiahl2.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', guard.check(['read:license_plates']) , function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);