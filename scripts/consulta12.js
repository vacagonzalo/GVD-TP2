// 12 Obtener el total gastado por persona y mostrar solo los que gastaron 
//      más de 3100000. Los documentos devueltos deben tener el nombre completo 
//      del cliente y el total gastado:
//      {cliente:"<nombreCompleto>",total:<num>}

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "cliente": {
                $concat: ["$cliente.nombre", " ", "$cliente.apellido"]
            },
            "totalItem": {
                $multiply: ["$item.cantidad", "$item.precio"]
            }
        }
    },
    {
        $group:
        {
            _id: "$cliente",
            totalGastado: { $sum: "$totalItem" }

        }
    },
    {
        $addFields:
        {
            cliente: "$_id",
            total: "$totalGastado",
        }
    },
    { $project: { _id: 0, totalGastado: 0 } },
    { $match: { total: { $gt: 3100000 } } }
])