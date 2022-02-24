module.exports = app => {
    const notes = require("../controllers/notes.controller.js");
    var router = require("express").Router();


    router.get("/", notes.obtener);



    app.use('/notes', router);
    //app.use('/api/notes', router);
  };