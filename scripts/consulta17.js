// 17 Obtener la información de los clientes que hayan gastado 100000 en una 
//      orden junto con el número de orden.
//      Consulta modificada para importes mayores a 1000

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
    { $match: { total: { $gt: 10000 } } },
    {
        $project:
        {
            cliente: "$_id.cliente",
            nroFactura: "$_id.nroFactura",
            _id: 0
        }
    }
])