// 15 Obtener a los clientes indicando cuánto fue lo que más gastó en una única 
//      factura.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "cliente": {
                $concat: ["$cliente.nombre", " ", "$cliente.apellido"]
            },
            "nroFactura": "$nroFactura",
            "totalItem": {
                $multiply: ["$item.cantidad", "$item.precio"]
            }
        }
    },
    {
        $group:
        {
            _id: {
                cliente: "$cliente",
                nroFactura: "$nroFactura"
            },
            total: { $sum: "$totalItem" }
        }
    },
    {
        $group:
        {
            _id: "$_id.cliente",
            maximo: { $max: "$total" }
        }
    }
])