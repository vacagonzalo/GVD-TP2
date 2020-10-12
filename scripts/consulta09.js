// 9 Idem el punto anterior, ordenar por ingresos en forma ascendente, 
//    saltear el 1ro y mostrar 2do y 3ro.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "producto": "$item.producto",
            "cantidad": "$item.cantidad",
            "ingreso": { $multiply: ["$item.cantidad", "$item.precio"] }
        }
    },
    {
        $group:
        {
            _id: "$producto",
            sumaCantidad: { $sum: "$cantidad" },
            ingresosTotales: { $sum: "$ingreso" }
        }
    },
    { $sort: { ingresosTotales: 1 } },
    { $skip: 1 },
    { $limit: 2 }
]).pretty()