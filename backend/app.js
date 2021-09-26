"use strict";

//cargar módulos de NODE para crear el servidor
var express = require("express");

var bodyParser = require("body-parser");

//ejecutar express para http
var app = express();

// cargar archivos de rutas
var article_routes = require("./routes/article");

// cargar middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Activar Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  res.header("Allow", "GET,POST,OPTIONS,PUT,DELETE");
  next();
});

//añadir prefijos a las rutas
app.use("/api", article_routes);

//exportar el modulo
module.exports = app;
