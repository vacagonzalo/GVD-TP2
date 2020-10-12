// 2 Basado en la consulta del punto 1, mostrar sólo la región que tenga el menor ingreso.

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
    { $limit: 1 }
])