const sql = require("./db.js");


// constructor
const User = function(t) {
  this.username = t.username;
  this.password = t.password;
  this.full_name = t.full_name;
  this.avatar = t.avatar;
};

User.getAll = (title, result) => {
    let query = "SELECT * FROM users";
   
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  };

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
  module.exports=User;