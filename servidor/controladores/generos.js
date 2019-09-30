var connection = require("../../lib/conexionbd");

function generos(req, res){
    connection.query("Select * from competencias.genero", function(err, response){
        if(err) throw err
        return res.json({generos: response})


    })
}

module.exports = generos;