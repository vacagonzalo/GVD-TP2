// 18 En base a la localidad de los clientes, obtener el total facturado por 
//      localidad.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "region": "$cliente.region",
            "totalItem": {
                $multiply: ["$item.cantidad", "$item.precio"]
            }
        }
    },
    {
        $group:
        {
            _id: "$region",
            total: { $sum: "$totalItem" }
        }
    },
    {
        $project:
        {
            region: "$_id",
            _id: 0,
            total: "$total"
        }
    }
])