// 16 Utilizando MapReduce, indicar la cantidad total comprada de cada ítem. 
//      Comparar el resultado con el ejercicio 8.

use finanzas
map = function () {
    this.item.forEach(
        function (item) {
            emit(item.producto, item.cantidad);
        }
    )
}

reduce = function (key, values) {
    var total = 0
    for (var i = 0; i < values.length; i++)
        total += values[i];
    return total;
}

db.facturas.mapReduce(map, reduce, { out: { inline: 1 } })