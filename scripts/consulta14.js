// 14 Obtener la factura en la que se haya gastado más. En caso de que sean 
//      varias obtener la que tenga el número de factura menor.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "nroFactura": "$nroFactura",
            "totalItem": {
                $multiply: ["$item.cantidad", "$item.precio"]
            }
        }
    },
    {
        $group:
        {
            _id: "$nroFactura",
            total: { $sum: "$totalItem" }
        }
    },
    { $sort: { total: -1, _id: 1 } },
    { $limit: 1 }
])