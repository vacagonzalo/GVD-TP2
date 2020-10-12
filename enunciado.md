# Aggregation Framework en MongoDB
1. Realizar una consulta que devuelva la siguiente información: Región y cantidad total
de productos vendidos a clientes de esa Región.
2. Basado en la consulta del punto 1, mostrar sólo la región que tenga el menor ingreso.
3. Basado en la consulta del punto 1, mostrar sólo las regiones que tengan una cantidad
de productos vendidos superior a 10000.
4. Se requiere obtener un reporte que contenga la siguiente información, nro. cuit,
apellido y nombre y región y cantidad de facturas, ordenado por apellido.
5. Basados en la consulta del punto 4 informar sólo los clientes con número de
CUIT mayor a 27000000000.
6. Basados en la consulta del punto 5 informar solamente la cantidad de clientes
que cumplen con esta condición.
7. Se requiere realizar una consulta que devuelva la siguiente información: producto y
cantidad de facturas en las que lo compraron, ordenado por cantidad de facturas
descendente.
8. Obtener la cantidad total comprada así como también los ingresos totales para cada
producto.
9. Idem el punto anterior, ordenar por ingresos en forma ascendente, saltear el 1ro y
mostrar 2do y 3ro.
10. Obtener todos productos junto con un array de las personas que lo compraron. En este
array deberá haber solo strings con el nombre completo de la persona. Los
documentos entregados como resultado deberán tener la siguiente forma:
{producto: “&lt;nombre&gt;”, personas:[“…”, …]}
11. Obtener los productos ordenados en forma descendente por la cantidad de
diferentes personas que los compraron.
12. Obtener el total gastado por persona y mostrar solo los que gastaron más de
3100000. Los documentos devueltos deben tener el nombre completo del cliente y el
total gastado:
{cliente:”&lt;nombreCompleto&gt;”,total:&lt;num&gt;}
13. Obtener el promedio de gasto por factura por cada región.
14. Obtener la factura en la que se haya gastado más. En caso de que sean varias obtener
la que tenga el número de factura menor.
15. Obtener a los clientes indicando cuánto fue lo que más gastó en una única factura.
16. Utilizando MapReduce, indicar la cantidad total comprada de cada ítem. Comparar el
resultado con el ejercicio 8.
17. Obtener la información de los clientes que hayan gastado 100000 en una orden junto
con el número de orden.
18. En base a la localidad de los clientes, obtener el total facturado por localidad.