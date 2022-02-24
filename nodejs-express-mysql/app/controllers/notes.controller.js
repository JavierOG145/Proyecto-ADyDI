
const Notes = require("../models/notes.model.js");


exports.obtener = (req, res) => {

    if (req.user.role!='alumne'){
        res.status(400).send("Solo pueden consultar alumnos");
    }

    Notes.recuperar(req.user.id_alumne,(err,data)=>{
        if(err)
            res.status(500).send({
                "ok":false,
                "error":err
            });
        else{
            // retornar les dades al client
            res.status(200).send(
                {
                    "ok":true,
                    "data":data
                }
            )
        }
        
    });
}


/*
const Notes = require("../models/notes.model.js");

exports.obtener = (req,res) =>{
    const title = req.query.title;
    Tutorial.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

  exports.obtener = (req,res) =>{

    if(req.user.role!='alumne'){
        res.status(400).send("Solo pueden consultar alumnos");
    }
    Notes.recuperar(req.user.id_alumne,(err,data)=>{
        if(err)
            res.status(500).send({
                "ok":false,
                "error":err
            });
        else(
            res.status(200).send(
                {
                    "ok":true,
                    "data":data
                }
            )
        )
    });
}
*/