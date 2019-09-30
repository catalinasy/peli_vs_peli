var connection = require("../../lib/conexionbd");

function votar(req, res){
    var id_competencia=req.params.id;
    var id_pelicula = req.body.idPelicula
    var voto = "INSERT INTO votos VALUES (" + id_pelicula + ", " + id_competencia + ", 1)"
    var query = "select * from competencias.votos where id_pelicula = "+ id_pelicula+ " and id_competencia = "+ id_competencia 
    var update = "UPDATE competencias.votos SET voto = voto + 1 WHERE id_pelicula = " + id_pelicula + " and id_competencia = " + id_competencia

    connection.query(query, function(err, result){
        if(err) throw err;
            if (result.length>0){
                connection.query(update, function(err, res){
                })
            }
            else{
                connection.query(voto, function(err, res){
                    if(err) throw err;
                })
            }
        });
}

module.exports = votar;