// 8 Obtener la cantidad total comprada así como también los ingresos totales 
//    para cada producto.

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
]).pretty()