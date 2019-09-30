var connection = require("../../lib/conexionbd");

function reiniciar(req, res){
    
    var query = "update competencias.votos set voto = 0 where id_competencia = " + req.params.id 
    connection.query(query, function(err, res){

    })
}

module.exports = reiniciar;