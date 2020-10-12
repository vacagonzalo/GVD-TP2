// 5 Basados en la consulta del punto 4 informar sólo los clientes con número de
//     CUIT mayor a 27000000000.

use finanzas
db.facturas.aggregate([
	{ $match: { "cliente.cuit": { $gt: 2700000000 } } },
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