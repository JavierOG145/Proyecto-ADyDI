module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", user.create);

    // Retrieve all Tutorials
    router.get("/", user.findAll);

    app.use('/docencia/users', router);


    // Retrieve all published Tutorials
    //router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    //router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    //router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    //router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    //router.delete("/", tutorials.deleteAll);
    
  };