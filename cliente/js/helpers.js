// Función que busca el parámetro "param" en la query string de la url actual y retorna su valor
function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) { // returns first occurence and stops
            return item.split("=")[0] == param && (param = item.split("=")[1])
        })
    return param;
}

function shuffle(opciones) {
    var j, x, i;
    for (i = opciones.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = opciones[i];
        opciones[i] = opciones[j];
        opciones[j] = x;
    }
    return opciones;
}