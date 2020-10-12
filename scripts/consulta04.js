// 4 Se requiere obtener un reporte que contenga la siguiente información, nro. cuit,
//     apellido y nombre y región y cantidad de facturas, ordenado por apellido.

use finanzas
db.facturas.aggregate([
    {
        $group:
        {
            _id: {
                cuit: "$cliente.cuit",
                apellido: "$cliente.apellido",
                nombre: "$cliente.nombre",
                region: "$cliente.region"
            },
            cantidadFacturas: { $sum: 1 }
        }
    },
    { $sort: { "_id.apellido": 1 } }
]).pretty()
