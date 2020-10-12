// 7 Se requiere realizar una consulta que devuelva la siguiente información: 
//   producto y cantidad de facturas en las que lo compraron, ordenado por 
//   cantidad de facturas descendente.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $group:
        {
            _id: "$item.producto",
            total: { $sum: 1 }
        }
    },
    { $sort: { total: -1 } },
])