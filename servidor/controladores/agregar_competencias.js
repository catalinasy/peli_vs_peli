var connection = require("../../lib/conexionbd");

function agregar_competencias(req, res){
    console.log(req)
    var competencia = req.body.nombre
    var query = "select * from competencias.competencias where competencias.nombre like '%" + competencia + "%'"    
    var check_if_exist = "select * from competencias.pelicula where "
    var voto = 'INSERT INTO competencias.competencias VALUES ( id, "' + req.body.nombre + '", ' + req.body.genero + ', ' + req.body.director + ', ' + req.body.actor + ')'
    if(req.body.genero != 0){
        condicion.push("pelicula.genero_id = " + req.body.genero)
    }
    if(req.body.director != 0){
        condicion.push("pelicula.director_id = " + req.body.director)
    }
    if(req.body.actor != 0){
        condicion.push("pelicula.actor_id = " +req.body.actor)
    }

    if(condicion.length > 0){
        for(var i = 0; i < condicion.length; i++){
            if(i != 0){
                check_if_exist += " and "
            }
            check_if_exist += condicion[i]
        }
    }
    if(competencia.length>0){
    connection.query(query, function(error, respuesta){
        if (error) throw error
        if (respuesta.length>0){
          return res.sendStatus(500).json("La competencia ya existe");

        } else {
            connection.query(voto, function(err, response){
                if(err) throw err;
            })
        }
    })
        
            
    
    }
}

module.exports = agregar_competencias;