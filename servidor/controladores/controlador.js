var connection = require("../../lib/conexionbd");


function devolver_competencias(req, res) {
    connection.query("SELECT * from competencias.competencias", function(
        err,
        response,
        rows
      ) {
        if (err) {
          return res.sendStatus(500).json("Ocurrio un error");
        }
      return res.json({competencias: response});

      
      });
    }

    


module.exports = devolver_competencias;
