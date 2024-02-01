// EN ESTE ARCHIVO TENGO TODO LO QUE ES LA CONFIGURACION DEL SERVIDOR Y EN APP LOS DE LOS MIDDLEWARES
const { server } = require("./app");
const PORT = 3001; //declaro el puerto dond evoy a levantar al servidor
const { conn } = require("./db_conecctions");

// server.listen(PORT, () => {
//   console.log(`Server raised in port ${PORT}`);
// });

//CUANDO REQUIERA { conn } de DB voy a utilizar esta de abajo

conn.sync({ force: true }).then(() => {
  //cuando termine cambiar a false para al menos tener algunos videgames creados en el momento de la correccion
  server.listen(PORT, () => {
    console.log("Server raised in port: " + PORT);
  });
});
