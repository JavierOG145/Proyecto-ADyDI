module.exports = app => {
  const login = require("../controllers/login.controller.js");
  var router = require("express").Router();

  // Hacer que la ruta padre sea /login
  app.use('/login', router)

  // router.get("/", (req, res) => {
  //   console.log("Get /login")
  //   res.json({ message: "Bienvenido a /login" })
  // });

  // router.post("/", login.login);

  //router.get("/", login.findAll);

  router.get("/", (req, res) => {
    console.log("Get /login")
    res.json({ message: "Bienvenido a /login" })
  })
};