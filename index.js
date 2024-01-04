'use strict'; 

//dependencies
const serverless = require('serverless-http');
const {app} = require('./src/app.js');

//instantiation
exports.handler = serverless(app);