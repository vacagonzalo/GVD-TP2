# Gestión de Grandes Volúmenes de Datos TP2
Ing. Gonzalo Nahuel Vaca

## Instrucciones para recrear el TP

### Requisitos
* Tener instalado docker y docker-compose
* Tener el puerto 27017 libre
* El sistema debe poder ejecutar scripts de bash

### Pasos a seguir
* Descargar/clonar este repositorio
* Dar permisos de ejecución al script iniciar.sh
* Ejecutar el script iniciar.sh
```bash
sudo chmod +x iniciar.sh
./iniciar.sh
```
Al finalizar, puede limpiar el sistema ejecutando destruir.sh
```bash
./destruir.sh
```

## Resolución

### 1 Realizar una consulta que devuelva la siguiente información: Región y cantidad total de productos vendidos a clientes de esa Región.
Consulta
```javascript
use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $group:
        {
            _id: "$cliente.region",
            total: { $sum: "$item.cantidad" }
        }
    }
])
```
Resultado
```javascript
switched to db finanzas
{ "_id" : "CABA", "total" : 87600 }
{ "_id" : "NOA", "total" : 4380 }
{ "_id" : "CENTRO", "total" : 55080 }
{ "_id" : "NEA", "total" : 131400 }
```

### 2 Basado en la consulta del punto 1, mostrar sólo la región que tenga el menor ingreso.
Consulta
```javascript
use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $group:
        {
            _id: "$cliente.region",
            total: { $sum: "$item.cantidad" }
        }
    },
    { $sort: { total: 1 } },
    { $limit: 1 }
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : "NOA", "total" : 4380 }
```

### 3 Basado en la consulta del punto 1, mostrar sólo las regiones que tengan una cantidad de productos vendidos superior a 10000.
Consulta
```javascript
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $group:
        {
            _id: "$cliente.region",
            total: { $sum: "$item.cantidad" }
        }
    },
    { $sort: { total: 1 } },
    { $match: { total: { $gt: 10000 } } }
])
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : "CENTRO", "total" : 55080 }
{ "_id" : "CABA", "total" : 87600 }
{ "_id" : "NEA", "total" : 131400 }
```

### 4 Se requiere obtener un reporte que contenga la siguiente información, nro. cuit, apellido y nombre y región y cantidad de facturas, ordenado por apellido.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{
	"_id" : {
		"cuit" : 2729887543,
		"apellido" : "Lavagno",
		"nombre" : "Soledad",
		"region" : "NOA"
	},
	"cantidadFacturas" : 4380
}
{
	"_id" : {
		"cuit" : 2740488484,
		"apellido" : "Malinez",
		"nombre" : "Marina",
		"region" : "CENTRO"
	},
	"cantidadFacturas" : 4590
}
{
	"_id" : {
		"cuit" : 2029889382,
		"apellido" : "Manoni",
		"nombre" : "Juan Manuel",
		"region" : "NEA"
	},
	"cantidadFacturas" : 13140
}
{
	"_id" : {
		"cuit" : 2038373771,
		"apellido" : "Zavasi",
		"nombre" : "Martin",
		"region" : "CABA"
	},
	"cantidadFacturas" : 8760
}
```

### 5 Basados en la consulta del punto 4 informar sólo los clientes con número de CUIT mayor a 27000000000.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{
	"_id" : {
		"cuit" : 2729887543,
		"apellido" : "Lavagno",
		"nombre" : "Soledad",
		"region" : "NOA"
	},
	"cantidadFacturas" : 4380
}
{
	"_id" : {
		"cuit" : 2740488484,
		"apellido" : "Malinez",
		"nombre" : "Marina",
		"region" : "CENTRO"
	},
	"cantidadFacturas" : 4590
}
```

### 6 Basados en la consulta del punto 5 informar solamente la cantidad de clientes que cumplen con esta condición.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : null, "count" : 2 }
```

### 7 Se requiere realizar una consulta que devuelva la siguiente información: producto y cantidad de facturas en las que lo compraron, ordenado por cantidad de facturas descendente.
Consulta
```javascript
use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $group:
        {
            _id: "$item.producto",
            total: { $sum: 1 }
        }
    },
    { $sort: { total: -1 } },
])
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : "TALADRO 12mm", "total" : 13350 }
{ "_id" : "CORREA 10mm", "total" : 8760 }
{ "_id" : "SET HERRAMIENTAS", "total" : 8760 }
{ "_id" : "TUERCA 2mm", "total" : 8760 }
{ "_id" : "TUERCA 5mm", "total" : 8760 }
{ "_id" : " CORREA 12mm", "total" : 4590 }
```

### 8 Obtener la cantidad total comprada así como también los ingresos totales para cada producto.
Consulta
```javascript
use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "producto": "$item.producto",
            "cantidad": "$item.cantidad",
            "ingreso": { $multiply: ["$item.cantidad", "$item.precio"] }
        }
    },
    {
        $group:
        {
            _id: "$producto",
            sumaCantidad: { $sum: "$cantidad" },
            ingresosTotales: { $sum: "$ingreso" }
        }
    },
]).pretty()
```
Respuesta
```javascript
switched to db finanzas
{
	"_id" : " CORREA 12mm",
	"sumaCantidad" : 50490,
	"ingresosTotales" : 908820
}
{
	"_id" : "SET HERRAMIENTAS",
	"sumaCantidad" : 8760,
	"ingresosTotales" : 6132000
}
{
	"_id" : "TUERCA 2mm",
	"sumaCantidad" : 35040,
	"ingresosTotales" : 2102400
}
{
	"_id" : "TUERCA 5mm",
	"sumaCantidad" : 109500,
	"ingresosTotales" : 9855000
}
{
	"_id" : "TALADRO 12mm",
	"sumaCantidad" : 13350,
	"ingresosTotales" : 6541500
}
{
	"_id" : "CORREA 10mm",
	"sumaCantidad" : 61320,
	"ingresosTotales" : 8216880
}
```

### 9 Idem el punto anterior, ordenar por ingresos en forma ascendente, saltear el 1ro y mostrar 2do y 3ro.
Consulta
```javascript
use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "producto": "$item.producto",
            "cantidad": "$item.cantidad",
            "ingreso": { $multiply: ["$item.cantidad", "$item.precio"] }
        }
    },
    {
        $group:
        {
            _id: "$producto",
            sumaCantidad: { $sum: "$cantidad" },
            ingresosTotales: { $sum: "$ingreso" }
        }
    },
    { $sort: { ingresosTotales: 1 } },
    { $skip: 1 },
    { $limit: 2 }
]).pretty()
```
Respuesta
```javascript
switched to db finanzas
{
	"_id" : "TUERCA 2mm",
	"sumaCantidad" : 35040,
	"ingresosTotales" : 2102400
}
{
	"_id" : "SET HERRAMIENTAS",
	"sumaCantidad" : 8760,
	"ingresosTotales" : 6132000
}
```

### 10 Obtener todos productos junto con un array de las personas que lo compraron. En este array deberá haber solo strings con el nombre completo de la persona. Los documentos entregados como resultado deberán tener la siguiente forma: {producto: "<nombre>", personas:["…", …]}
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "producto" : "TALADRO 12mm", "personas" : [ "Marina Malinez", "Juan Manuel Manoni" ] }
{ "producto" : "TUERCA 2mm", "personas" : [ "Martin Zavasi", "Juan Manuel Manoni" ] }
{ "producto" : "TUERCA 5mm", "personas" : [ "Juan Manuel Manoni" ] }
{ "producto" : "CORREA 10mm", "personas" : [ "Martin Zavasi" ] }
{ "producto" : " CORREA 12mm", "personas" : [ "Marina Malinez" ] }
{ "producto" : "SET HERRAMIENTAS", "personas" : [ "Juan Manuel Manoni", "Soledad Lavagno" ] }
```

### 11 Obtener los productos ordenados en forma descendente por la cantidad de diferentes personas que los compraron.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "producto" : "SET HERRAMIENTAS", "personas" : [ "Juan Manuel Manoni", "Soledad Lavagno" ] }
{ "producto" : "TALADRO 12mm", "personas" : [ "Juan Manuel Manoni", "Marina Malinez" ] }
{ "producto" : "TUERCA 2mm", "personas" : [ "Martin Zavasi", "Juan Manuel Manoni" ] }
{ "producto" : " CORREA 12mm", "personas" : [ "Marina Malinez" ] }
{ "producto" : "CORREA 10mm", "personas" : [ "Martin Zavasi" ] }
{ "producto" : "TUERCA 5mm", "personas" : [ "Juan Manuel Manoni" ] }
```

### 12 Obtener el total gastado por persona y mostrar solo los que gastaron más de 3100000. Los documentos devueltos deben tener el nombre completo del cliente y el total gastado: {cliente:"<nombreCompleto>",total:<num>}
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "cliente" : "Marina Malinez", "total" : 3157920 }
{ "cliente" : "Martin Zavasi", "total" : 9793680 }
{ "cliente" : "Juan Manuel Manoni", "total" : 17739000 }
```

### 13 Obtener el promedio de gasto por factura por cada región.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : "NOA", "promedio" : 700 }
{ "_id" : "CABA", "promedio" : 1118 }
{ "_id" : "CENTRO", "promedio" : 688 }
{ "_id" : "NEA", "promedio" : 1350 }
```

### 14 Obtener la factura en la que se haya gastado más. En caso de que sean varias obtener la que tenga el número de factura menor.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : 1002, "total" : 1968 }
```

### 15 Obtener a los clientes indicando cuánto fue lo que más gastó en una única factura.
Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
{ "_id" : "Soledad Lavagno", "maximo" : 700 }
{ "_id" : "Juan Manuel Manoni", "maximo" : 1960 }
{ "_id" : "Martin Zavasi", "maximo" : 1968 }
{ "_id" : "Marina Malinez", "maximo" : 688 }
```

### 16 Utilizando MapReduce, indicar la cantidad total comprada de cada ítem. Comparar el resultado con el ejercicio 8.
Consulta
```javascript
use finanzas
map = function () {
    this.item.forEach(
        function (item) {
            emit(item.producto, item.cantidad);
        }
    )
}

reduce = function (key, values) {
    var total = 0
    for (var i = 0; i < values.length; i++)
        total += values[i];
    return total;
}

db.facturas.mapReduce(map, reduce, { out: { inline: 1 } }
```
Respuesta
```javascript
switched to db finanzas
function () {
    this.item.forEach(
        function (item) {
            emit(item.producto, item.cantidad);
        }
    )
}
function (key, values) {
    var total = 0
    for (var i = 0; i < values.length; i++)
        total += values[i];
    return total;
}
{
	"results" : [
		{
			"_id" : " CORREA 12mm",
			"value" : 50490
		},
		{
			"_id" : "CORREA 10mm",
			"value" : 61320
		},
		{
			"_id" : "SET HERRAMIENTAS",
			"value" : 8760
		},
		{
			"_id" : "TALADRO 12mm",
			"value" : 13350
		},
		{
			"_id" : "TUERCA 2mm",
			"value" : 35040
		},
		{
			"_id" : "TUERCA 5mm",
			"value" : 109500
		}
	],
	"timeMillis" : 667,
	"counts" : {
		"input" : 30870,
		"emit" : 52980,
		"reduce" : 1854,
		"output" : 6
	},
	"ok" : 1
}
```

### 17 Obtener la información de los clientes que hayan gastado 100000 en una orden junto con el número de orden.
Consulta modificada para importes mayores a 1000

Consulta
```javascript
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
```
Respuesta
```javascript
switched to db finanzas
bye
```

### 18 En base a la localidad de los clientes, obtener el total facturado por localidad.
Consulta
```javascript
use finanzas
db.facturas.aggregate([
    { $unwind: "$item" },
    {
        $project:
        {
            "region": "$cliente.region",
            "totalItem": {
                $multiply: ["$item.cantidad", "$item.precio"]
            }
        }
    },
    {
        $group:
        {
            _id: "$region",
            total: { $sum: "$totalItem" }
        }
    },
    {
        $project:
        {
            region: "$_id",
            _id: 0,
            total: "$total"
        }
    }
])
```
Respuesta
```javascript
switched to db finanzas
{ "region" : "NEA", "total" : 17739000 }
{ "region" : "CENTRO", "total" : 3157920 }
{ "region" : "CABA", "total" : 9793680 }
{ "region" : "NOA", "total" : 3066000 }
```