//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require("./controladores/controlador.js")
var resultados = require("./controladores/resultados.js")
var agregar_competencias = require("./controladores/agregar_competencias.js")
var votar = require("./controladores/votar.js")
var reiniciar = require("./controladores/reiniciar.js")
var generos = require("./controladores/generos.js")
var directores = require("./controladores/directores.js")
var actores = require("./controladores/actores.js")
var app = express();
var path = require('path');
var opciones = require('./controladores/opciones.js')


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
  res.sendFile(paht.join(__dirname, '../cliente/html/administrar/index.html'))
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

app.get('/generos', function(req, res){
  generos(req, res)
})

app.get('/directores', function(req, res){
  directores(req, res)
})

app.get('/actores', function(req, res){
  actores(req, res)
})


app.get('/competencias/:id/peliculas', function(req, res){
  opciones(req, res)
})

app.get('/competencias/:id/resultados', function(req, res){
  resultados(req, res)
})



app.get('/votar?:id', function(req, res){
  res.sendFile(path.join(__dirname, '../cliente/html/votar.html'))
})


app.get('/', function(req, res){
  controlador(req, res)
})

app.post('/competencias/:id/voto', function(req, res){
  votar(req, res)
  })


app.get('/competencias', function(req, res){
  controlador(req, res)
})

app.post('/competencias', function(req, res){
  agregar_competencias(req, res)
})

app.delete('/competencias/:id/votos', function(req, res){
  reiniciar(req, res)
})







