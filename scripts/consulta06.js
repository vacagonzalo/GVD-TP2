// 6 Basados en la consulta del punto 5 informar solamente la cantidad de 
//    clientes que cumplen con esta condición.

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
	{
		$group: {
			_id: null,
			count: { $sum: 1 }
		}
	}
])