var connection = require("../../lib/conexionbd");

function devolverCompetencias(req, res) {
  connection.query("SELECT * from competencias.competencias", function(
    err,
    response,
    rows
  ) {
    if (err) {
      return res.sendStatus(500).json("Ocurrio un error");
    }
    return res.json({ competencias: response });
  });
}

function votar(req, res) {
  var id_competencia = req.params.id;
  var id_pelicula = req.body.idPelicula;
  var voto =
    "INSERT INTO votos VALUES (" + id_pelicula + ", " + id_competencia + ", 1)";
  var query =
    "select * from competencias.votos where id_pelicula = " +
    id_pelicula +
    " and id_competencia = " +
    id_competencia;
  var update =
    "UPDATE competencias.votos SET voto = voto + 1 WHERE id_pelicula = " +
    id_pelicula +
    " and id_competencia = " +
    id_competencia;

  connection.query(query, function(err, result) {
    if (err){
      
    }
    if (result.length > 0) {
      connection.query(update, function() {});
    } else {
      connection.query(voto, function(err, res) {
        if (err) throw err;
      });
    }
  });
}

function nuevaCompetencia(req, res) {
  var competencia = req.body.nombre;
  var query =
    "select * from competencias.competencias where competencias.nombre like '%" +
    competencia +
    "%'";
  var sumarCompetencia =
    'INSERT INTO competencias.competencias VALUES ( id, "' +
    req.body.nombre +
    '", ' +
    req.body.genero +
    ", " +
    req.body.director +
    ", " +
    req.body.actor +
    ")";

  if (competencia.length > 0) {
    connection.query(query, function(error, respuesta) {
      if (error) throw error;
      if (respuesta.length > 0) {
        return res.sendStatus(500).json("La competencia ya existe");
      } else {
        connection.query(sumarCompetencia, function(err, response) {
          if (err) throw err;
        });
      }
    });
  }
}

function reiniciarVotos(req, res) {
  var query =
    "update competencias.votos set voto = 0 where id_competencia = " +
    req.params.id;
  connection.query(query, function(err) {
    if (err) throw err;
  });
}

function eliminarCompetencia(req, res) {
  var query =
    "DELETE FROM competencias.competencias WHERE competencias.id = " +
    req.params.id;
  connection.query(query, function(err) {
    if (err) throw err;
  });
}

function buscarCompetencia(req, res) {
  connection.query(
    "Select * from competencias.competencias where competencias.id =" +
      req.params.id,
    function(err, response) {
      if (err) throw err;
      return res.json({ competencias: response[0] });
    }
  );
}

function editarCompetencia(req, res) {
  let newText = req.body.nombre;
  let update_query =
    "Update competencias.competencias set nombre = '" +
    newText +
    "' where competencias.id =" +
    req.params.id;
  connection.query(update_query, function(err, response) {
    if (err) throw err;
  });
}

function generos(req, res) {
  connection.query("Select * from competencias.genero", function(
    err,
    response
  ) {
    if (err) throw err;
    return res.json({ generos: response });
  });
}

function directores(req, res){
    connection.query("Select * from competencias.director", function(err, response){
        if(err) throw err
        return res.json({directores: response})


    })
}

function actores(req, res){
    connection.query("Select * from competencias.actor", function(err, response){
        if(err) throw err
        return res.json({actores: response})

    })
}


function devolverOpciones(req, res){
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


function devolverResultados(req, res){
    let id = req.params.id
    var query = "select * from competencias.votos inner join competencias.pelicula on pelicula.id = votos.id_pelicula inner join competencias.competencias on competencias.id = votos.id_competencia where competencias.id = " + id + " order by votos.voto"
    connection.query(query, function(err, response){
        if (err)
          return res.sendStatus(404).json("Ocurrio un error");
        else{
            return res.json({resultados: response});
        }

    })
}
    
 

module.exports = {
  devolverCompetencias,
  votar,
  nuevaCompetencia,
  reiniciarVotos,
  eliminarCompetencia,
  buscarCompetencia,
  editarCompetencia,
  generos,
  directores,
  actores,
  devolverOpciones,
  devolverResultados
};
