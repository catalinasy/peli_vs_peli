var connection = require("../../lib/conexionbd");

function actores(req, res){
    connection.query("Select * from competencias.actor", function(err, response){
        if(err) throw err
        return res.json({actores: response})


    })
}

module.exports = actores;