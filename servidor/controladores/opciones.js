var connection = require("../../lib/conexionbd");

function devolver_opciones(req, res){
   let id = req.params.id

  connection.query("SELECT * from competencias.competencias where competencias.competencias.id = " + id, function(
    err,
    response
  ) {
    if (err) {
      return res.sendStatus(404).json("Ocurrio un error");
    }
    var competencias = response[0]
    var query = " "
    var condicion = []
    if (competencias.genero_id != 0){
      condicion.push("competencias.pelicula.genero_id =  "+ competencias.genero_id)
    }
    if(competencias.director_id != 0){
      condicion.push("competencias.pelicula.director_id = " + competencias.director_id)
    }
    if(competencias.actor_id != 0){
      condicion.push("competencias.pelicula.actor_id = " + competencias.actor_id)
    }
    if(condicion.length>0){
      query += "where "
      for(var i = 0; i<condicion.length; i++){
        if(i!=0){
          query += " and "
        } 
        query += condicion[i]
      }
    }
    console.log(query)
    connection.query("SELECT * from competencias.pelicula " + query, function(
      err,
      response
    ) {
      if (err || competencias.length == 0) {
        return res.sendStatus(404)
      }
      return res.json({ peliculas: response, competencias: competencias });
    });
  })
};
   

module.exports = devolver_opciones