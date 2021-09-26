"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

mongoose.set("useFindAndModify", false);
mongoose.promise = global.promise;

mongoose
  .connect("mongodb://localhost:27017/api_rest_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("La conexión O.K. !!!");
    //crear servidor y escuchar las peticiones HTTP
    app.listen(port, () => {
      console.log("servidor corriendo en http://localhost:" + port);
    });
  });
