// 3 Basado en la consulta del punto 1, mostrar sólo las regiones que tengan una cantidad
//     de productos vendidos superior a 10000.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $group:
        {
            _id: "$cliente.region",
            total: { $sum: "$item.cantidad" }
        }
    },
    { $sort: { total: 1 } },
    { $match: { total: { $gt: 10000 } } }
])