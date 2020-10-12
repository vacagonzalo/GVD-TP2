// 10 Obtener todos productos junto con un array de las personas que lo compraron. 
//     En este array deberá haber solo strings con el nombre completo de la persona. 
//     Los documentos entregados como resultado deberán tener la siguiente forma:
//     {producto: "<nombre>", personas:["…", …]}

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
    { $addFields: { producto: "$_id", personas: "$personasArray" } },
    { $project: { _id: 0, personasArray: 0 } }
])