var connection = require("../../lib/conexionbd");

function directores(req, res){
    connection.query("Select * from competencias.director", function(err, response){
        if(err) throw err
        return res.json({directores: response})


    })
}

module.exports = directores;