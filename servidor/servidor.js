//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');
var competenciasController = require('./controladores/competenciasController.js')


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../cliente')));

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación

var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});



app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/index.html'))
})

app.get('/administrador', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/administrar/index.html'))
})
app.get('/crear.html', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/administrar/crear.html'))
})

app.get('/index.html', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/index.html'))
})


app.get('/resultados.html?:id', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/resultados.html'))
  
})

app.get('/reiniciar.html', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/administrar/reiniciar.html'))
})


app.get('/editar.html?:id', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/administrar/editar.html'))
})

app.get('/votar?:id', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/votar.html'))
})

app.get('/eliminar.html', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/administrar/eliminar.html'))
})


app.get('/', (req, res) => {
  competenciasController.devolverCompetencias(req, res)
})


// app.post('/competencias/:idCompetencia/voto', competencias.votarPelicula); 
app.post('/competencias/:id/voto', (req, res) => {
  competenciasController.votar(req, res)
  });

app.get('/competencias', (req, res) => {
  competenciasController.devolverCompetencias(req, res)
});

app.post('/competencias', (req, res)=>{
  competenciasController.nuevaCompetencia(req, res)
})


// app.delete('/competencias/:idCompetencia/votos', competencias.reiniciarCompetencia); 
app.delete('/competencias/:id/votos', (req, res) => {
  competenciasController.reiniciarvotos(req, res)
})

// app.delete('/competencias/:idCompetencia', competencias.eliminarCompetencia); 
app.delete('/competencias/:id',(req, res)=>{
  competenciasController.eliminarCompetencia(req, res)
})

// app.get('/competencias/:idCompetencia', competencias.buscarCompetencia); 
app.get('/competencias/:id', (req, res) => {
  competenciasController.buscarCompetencia(req, res)
})

// app.put('/competencias/:idCompetencia', competencias.editarCompetencia); 
app.put('/competencias/:id', (req, res)=>{
  competenciasController.editarCompetencia(req, res)
})


// app.get('/generos', generos.listarGeneros); 
app.get('/generos', (req, res) => {
  competenciasController.generos(req, res)
})

// app.get('/directores', directores.listarDirectores); 
app.get('/directores', (req, res) => {
  competenciasController.directores(req, res)
})

// app.get('/actores', actores.listarActores);
app.get('/actores', function(req, res){
  competenciasController.actores(req, res)
})


// app.get('/competencias/:idCompetencia/peliculas', competencias.listarOpciones)
app.get('/competencias/:id/peliculas', function(req, res){
  competenciasController.devolverOpciones(req, res)
})


// app.get('/competencias/:idCompetencia/resultados', competencias.listarResultados)
app.get('/competencias/:id/resultados', function(req, res){
  competenciasController.devolverResultados(req, res)
})

