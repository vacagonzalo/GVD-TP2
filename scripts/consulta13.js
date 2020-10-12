// 13 Obtener el promedio de gasto por factura por cada región.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "region": "$cliente.region",
            "nroFactura": "$nroFactura",
            "totalItem": {
                $multiply: ["$item.cantidad", "$item.precio"]
            }
        }
    },
    {
        $group:
        {
            _id:
            {
                region: "$region",
                nroFactura: "$nroFactura"
            },
            total: { $sum: "$totalItem" }

        }
    },
    {
        $group:
        {
            _id: "$_id.region",
            promedio: { $avg: "$total" }

        }
    }
])