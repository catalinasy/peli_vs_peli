var connection = require("../../lib/conexionbd");

function devolver_resultados(req, res){
    let id = req.params.id
    var query = "select * from competencias.votos inner join competencias.pelicula on pelicula.id = votos.id_pelicula inner join competencias.competencias on competencias.id = votos.id_competencia where competencias.id = " + id + " order by votos.voto"
    connection.query(query, function(err, response){
        if (err)
            throw err
        else{
            return res.json({resultados: response});
        }

    })
}
module.exports = devolver_resultados;