var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var contactsRouter = require('./routes/contacts');

var app = express(); //inicializa express

//carga librerias
app.use(logger('dev')); //para loguear
app.use(express.json()); //para procesar Json
app.use(express.urlencoded({ extended: false }));  //parsear cuerpos codificados como url
app.use(cookieParser()); //cookies
app.use(express.static(path.join(__dirname, 'public'))); //servir contenido statico de la carpeta "public"


//enrutadores
app.use('/', indexRouter);
app.use('/api/v1/contacts', contactsRouter);

//setup connnection
const mongoose = require('mongoose');
const DB_URL = (process.env.DB_URL || 'mongodb://localhost')
//const DB_URL = "mongodb+srv://mjcastroperez:US2023mjcastro@contacts-service.pqnqw4u.mongodb.net/?retryWrites=true&w=majority" 
console.log("connecting to database: %s", DB_URL);


mongoose.connect(DB_URL);
const db = mongoose.connection;
//recover from error
db.on('error', console.error.bind(console, 'db connection error'));

module.exports = app;
