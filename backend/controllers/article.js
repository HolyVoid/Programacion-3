"use strict";

var validator = require("validator");
var Article = require("../models/article");
const article = require("../models/article");
var fs = require("fs");
var path = require("path");
const { exists } = require("../models/article");
var controller = {
  datosCurso: (req, res) => {
    var hola = req.body.hola;

    return res.status(200).send({
      curso: "Programación 3",
      autor: "Gaspar Roiger",
      url: "www.nsl.me",
      hola,
    });
  },
  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la acción test de mi controlador de artículos",
    });
  },
  ////////////////////////////////////////////////////////////////
  //ACCIÓN PARA GUARDAR LOS DATOS QUE MANDA EL USUARIO
  save: (req, res) => {
    //1- Tomar los parámetros por POST
    var params = req.body;
    console.log(params);
    //2- Validamos los datos con VALIDATOR
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "Error",
        message: "Faltan datos por enviar",
      });
    }
    if (validate_title && validate_content) {
      //3- Creamos objeto a guardar (articulo)
      var article = new Article();
      //4- Asignaremos los valores al objeto
      article.title = params.title;
      article.content = params.content;
      article.image = null;
      //5- Guardamos en la base de datos
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "Error",
            message: "el articulo no se guardo !!",
          });
        }
        //6- Devolvemos la respuesta
        return res.status(200).send({
          status: "success",
          article: articleStored,
        });
      });
    } else {
      return res.status(200).send({
        status: "Error",
        message: "Los datos no son válidos",
      });
    }
  },
  /////////////////////////////////////////////////////////////
  //TRAE TODOS LOS ARTÍCULOS GUARDADOS EN LA BASE DE DATOS
  getArticles: (req, res) => {
    var query = Article.find({});
    var last = req.params.last;
    if (last || last != undefined) {
      query.limit(5);
    }

    //Find
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al devolver los artículos",
        });
      }
      if (!articles) {
        return res.status(404).send({
          status: "Error",
          message: "No hay artículos para mostrar",
        });
      }
      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },
  //////////////////////////////////////////////////////////////////////////
  getArticle: (req, res) => {
    //Tomamos el id url
    var articleId = req.params.id;
    //Comprobamos que exista
    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "El articulo no existe !",
      });
    }
    //Buscamos el articulo
    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(404).send({
          status: "error",
          message: "No existe el articulo",
        });
      }
      //Enviar respuesta JSON y devolverlo
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },
  /////////////////////////////////////////////////////////////////////////////
  update: (req, res) => {
    //Tomar el id de articulo de la URL
    var articleId = req.params.id;
    //Tomamos los datos que llegan por put
    var params = req.body;
    //Validar los datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
    if (validate_title && validate_content) {
      //Find y update
      Article.findByIdAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar",
            });
          }
          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No existe el articulo",
            });
          }
          return res.status(200).send({
            status: "success",
            articleUpdated,
          });
        }
      );
    } else {
      return res.status(200).send({
        status: "error",
        message: "Error al actualizar",
      });
    }
  },
  /////////////////////////////////////////////////////////////////////////
  //Acción para borrar un articulo determinado
  delete: (req, res) => {
    //Tomar el id de la URL
    var articleId = req.params.id;
    //Find and delete
    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(200).send({
          status: "error",
          message: "Error al borrar",
        });
      }
      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "El articulo no se ha borrado, por ahi no existe",
        });
      }
      //Devolver respuesta
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },
  ///////////////////////////////////////////////////////////////////////////////
  upload: (req, res) => {
    //Configurar el modulo del connectMultiparty router/article.js (O.K.!)

    //Tomar el archivo de la petición que nos envia

    var file_name = "Imagen no subida...";
    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    //Conseguir el nombre y la extensión del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");

    /* Advertencia en linux o mac*/
    //var file_split = file_path.split('\');

    //Nombre del archivo
    var file_name = file_split[2];

    //Extensión del archivo
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];
    //Comprobar la extensión -> solo imagenes, si no es valida, borra el archivo
    if (file_ext != "png" && file_ext != "jpg" && file_ext != "gif" && file_ext != "jpeg") {
      //Borrar el archivo subido
      fs.unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          message: "La extensión de la imagen no es valida",
        });
      });
    } else {
      //Si esta todo bien
      var articleId = req.params.id;
      //Busca el articulo,asignamos el nombre de la imagen y lo actualizamos
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: file_name },
        { new: true },
        (err, articleUpdated) => {
          if (err || !articleUpdated) {
            return res.status(200).send({
              status: "error",
              message: "Error al guardar la imagen del articulo !",
            });
          }
          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
      /* return res.status(200).send({
        fichero: req.files,
        split: file_split,
        file_ext,
      });*/
    }
  },
  /////////////////////////////////////////////////////////////////
  getImage: (req, res) => {
    //
    var file = req.params.image;
    //sacar el path completo
    var path_file = "./upload/articles/" + file;
    fs.exists(path_file, (exists) => {
      console.log(exists);
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          status: "error",
          message: "La imagen no exisiste !",
        });
      }
    });
  },
  ////////////////////////////////////////////////////////////////
  //Acción para buscar articulos en nuestro blog
  search: (req, res) => {
    //Sacar el string a buscar
    var searchString = req.params.search;
    //Find or
    Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error en la petición de busqueda!",
          });
        }
        if (!articles || articles.length <= 0) {
          return res.status(404).send({
            status: "error",
            message: "No hay articulos para mostrar!",
          });
        }
        return res.status(200).send({
          status: "success",
          articles,
        });
      });
  },
}; //FIN DEL CONTROLLER

module.exports = controller;

/* if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");*/
