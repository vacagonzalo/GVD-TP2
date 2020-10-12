// 11 Obtener los productos ordenados en forma descendente por la cantidad de 
//      diferentes personas que los compraron.

use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "producto": "$item.producto",
            "nombreCompleto": {
                $concat: ["$cliente.nombre", " ", "$cliente.apellido"]
            }
        }
    },
    {
        $group:
        {
            _id: "$producto",
            personasArray: { $addToSet: "$nombreCompleto" }

        }
    },
    {
        $addFields:
        {
            producto: "$_id",
            personas: "$personasArray",
            cantidad: { $size: "$personasArray" }
        }
    },
    { $sort: { cantidad: -1, producto: 1 } },
    { $project: { _id: 0, personasArray: 0, cantidad: 0 } }
])