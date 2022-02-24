const sql = require("./db.js");
const jwt = require('jsonwebtoken');


const accessTokenSecret = 'AccessTokenPass'; // laParaulaSecretaDelServidor
const refreshTokenSecret = 'RefreshTokenPass'; // laParaulaSecretaDelServidorDeRefresc
const refreshTokens = [];

// constructor
const Login = function (t) {
  this.id = t.id;
  this.username = t.username;
  this.password = t.password;
};

Login.getAll = (title, result) => {
  let query = "SELECT * FROM users";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(true, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};

Login.login = (username, password, result) => {
  console.log(username + ":" + password)
  // sql.query("SELECT id FROM users WHERE username = '${username}' and password = '${password}'", (err, res) => {
  sql.query(`SELECT id FROM users WHERE username = '${username}' and password = '${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(true, err);
    }
    if (res.length) {
      console.log("res:", res, "\nres[0]:", res[0], "\nres[0]['id']:", res[0]["id"]);
      sql.query(`SELECT id_profe FROM professor WHERE id_profe = '${res[0]["id"]}'`, (err_profe, res_profe) => {
        if (err_profe) {
          console.log("error: ", err_profe);
          result(true, err_profe);
        }
        else {
          let role = "";
          if (res_profe.length) {
            console.log("id Profe: ", res[0]["id"]);
            role = "profe";
          }
          else {
            console.log("id Alumne: ", res[0]["id"]);
            role = "alu";
          }
          const accessToken = jwt.sign(
            {
              "user_id": res[0]["id"],
              "username": username,
              "role": role
            },
            accessTokenSecret,
            { "expiresIn": "1m" }
          );
          result(null, accessToken);
        }
      });
    }
    else {
      console.log("res is null")
      result({ kind: "not_found" }, null);
    }
  });
};

module.exports = Login;