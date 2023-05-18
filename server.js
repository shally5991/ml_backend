const serverless = require('serverless-http');
const express = require("express");
require('dotenv').config();
const morgan = require("morgan");
const app = express()

//log requests
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('cors')());
// app.use(express.static('uploads'));

// app.use(express.static('uploads')); 
app.use('/images', express.static('uploads'));

app.use('/api', require('./server/routes/router'))

// module.exports.handler = serverless(app);
console.log(`${__dirname}/uploads`)
console.log('Server is listening on port 1234');
app.listen(1234)