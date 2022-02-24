const sql = require("./db.js");


// constructor
const Notes = function(t) {
  this.id_alumne = t.id_alumne;
  this.id_profesor = t.id_profesor;
  this.id_assig = t.id_assig;
  this.cod_assig = t.cod_assig;
  this.nota=t.nota;
};

Notes.recuperar=(id_alu,result)=>{
    query="Select n.*,a.cod_assig from notes as n, assignatura as a "+ 
    "where n.id_assig=a.id_assig and n.id_alumne=${id_alu}";

    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(true, err);
          return;
        }
        console.log("tutorials: ", res);
        result(null, res);
      });

    
}


module.exports={Notes}

/*const sql = require("./db.js");
const { query } = require("express");


//constructor
const Notes = function(t){
    this.id_alumne = t.id_alumne;
    this.id_profesor = t.id_profesor;
    this.id_assig = t.id_assig;
    this.cod_assig = t.cod_assig;
    this.nota = t.nota
}

Notes.recupera = (id_alu,result)=>{
    query="Select n.*,a.cod_assig from notes as n, assignatura as a where n.id_assig=a.id_assig and n.id_alumne$(id_alu)"

    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("tutorials: ", res);
        result(null, res);
      });
}
*/