const Login = require("../models/login.model.js");

// Retrieve all users from the database (with condition).
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   Login.getAll(title, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           data.message || "Some error occurred while retrieving users."
//       });
//     else res.send(data);
//   });
// };

// exports.login = (req, res) => {
//   console.log("AAAAAAAAAAA")
//   const { username, password } = req.body
//   // req.body.username
//   // req.body.password

//   let role

//   Login.login(username, password, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({ message: 'Usuario no encontrado' })
//       } else {
//         res.status(500).send({ message: 'Error devolviendo usuario' })
//       }
//     }
//     if (data) {
//       console.log("Sí hay data manin")
//       res.status(200).send(data)
//       // Login.isProfe(data, (err, data) => {
//       //   if (err) {
//       //     res.status(404).send({ message: 'Profe no encontrado' })
//       //   }
//       // })
//     }
//   });
// }