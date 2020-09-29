# KnownMyMoney

KnowMyMoney es una aplicación mobile (Android/iOS) que permite tener un registro eficaz de las finanzas personales de un individuo.


## ¿Para quién está pensada esta solución?
---
Para toda persona que quiera conocer a fondo cuales son sus ingresos y egresos. Podrás conocer las fuentes, tipos y medios de pago que utilizas para tus transacciones. También podrás segmentarlas según tus tarjetas de crédito/débito y cuentas bancarias. Podrás ver tus inversiones y prestamamos. Podrás comparar un presupuesto esperado contra lo real gastado.

# Casos de usos.

## Autenticación

- ### Registro de un nuevo usuario.  

- ### Inicio de sesión de un usuario registrado.
    Al abrir la aplicación por primera vez en el telefono o luego de ser encendido, el usuario podrá iniciar sesión.

    ![Login](\assets\pantallas\login2.jpg)


---
## Inicio

- ### Ver un dashboard con los principales gráficos.    
  


- ### Ver todas las herramientas de la aplicación.
    En cualquier momento, el usuario puede deslizar desde el borde izquierdo hacia el derecho para ver el menu hamburguesa.

    ![Menu Hamburguesa](\assets\pantallas\hamburguesa.jpg)
---
## Ingresos

- ### Ver ingreso acumulado.
    Una vez posicionado en la sección de ingresos, se encuentra un display principal que indica el ingreso acumulado según el período de tiempo que se muestra debajo.

    ![Ingreso acumulado](\assets\pantallas\ingresosdisplay2.jpg)


- ### Registro de un nuevo ingreso.
    Para registrar un nuevo ingreso se debe completar el formulario con los datos solicitados y presionar el botón.
    - Al seleccionar 'Moneda' se encuentran las opciones: pesos o dóalres.
    - Al seleccionar 'Fuente' se encuentran las opciones: alquiler, sueldo, facturación o extraordinario.
    - Al seleccionar 'Medio' se encuentran las opciones: efectivo o transferencia bancaria.
      - Si seleccionamos transferencia bancaria, tendremos que elegir una cuenta bancaria vinculada del usuario. 

    ![Añadir ingreso](\assets\pantallas\ingresosañadir2.jpg)


- ### Ver historial de ingresos.
    Deslizando hacia abajo, se encuentra una tabla que representa un historial de todos los ingresos que se realizaron el el periódo de tiempo seleccionado.

    ![Historial ingreso](\assets\pantallas\ingresoshistorial.jpg)
  - ### Ver detalle de un ingreso.
    Al pulsar sobre el botón '+', se puede ver un detalle con toda la información del ingreso.

    ![Detalle ingreso](\assets\pantallas\ingresoshistorialdetalle.jpg)


    - ### Eliminar un ingreso.
        Cuando se esta visualizando un detalle, pulsando el botón 'borrar' se elimina el registro de esa transacción.

        ![Borrar ingreso](\assets\pantallas\ingresoshistorialdetalleborrar.jpg)

- ### Filtrar datos de ingresos por período de tiempo.
    Para modificar toda la información mostrada, se debe seleccionar el período de tiempo deseado como se indica en la imagen. Se puede seleccionar: anual, semestral o mensual.

    ![Filtrar tiempo](\assets\pantallas\ingresotiempo.jpg)

---
## Egresos

- ### Ver egreso acumulado.
    En la parte superior, se encuentra un display principal que indica el egreso acumulado según el período de tiempo que se muestra debajo.

    ![Acumulado egreso](\assets\pantallas\egresodisplay2.jpg)


- ### Registro de un nuevo egreso.
    Para registrar un nuevo egreso se debe completar el formulario con los datos solicitados y presionar el botón. También se puede añadir un comprobante.
   - Al seleccionar 'Moneda' se encuentran las opciones: pesos o dóalres.
  - Al seleccionar 'Tipo' se encuentran las opciones: servicio, impuestos nacionales, impuestos provinciales, impuestos municipales, educación, salud, gastos varios, comida, entretenimiento, viáticos u otros.
    - Si seleccionamos servicio, tendremos que elegir una el tipo de servicio: luz, agua u otro.
      - Si seleccionamos otro, debemos detallar el servicio.
  - Al seleccionar 'Medio' se encuentran las opciones: efectivo, transferencia bancaria, tarjeta de crédito o tarjeta de débito.
    - Si seleccionamos transferencia bancaria, tendremos que elegir una cuenta bancaria vinculada del usuario.
    - Si seleccionamos tarjeta de crédito o débito, tendremos que elegir una tarjeta vinculada del usuario.


    ![Acumulado egreso](\assets\pantallas\egresonuevo.jpg)

- ### Ver historial de egresos.
    Bajando se encuentra una tabla historial de todos los egresos realizados.

    ![Historial egreso](\assets\pantallas\egresohistorial2.jpg)

  - ### Ver detalle de un egreso.
    Al pulsar sobre el botón '+', se puede ver un detalle con toda la información del egreso.
    
    ![Detalle egreso](\assets\pantallas\egresodetalle2.jpg)


    - ### Eliminar un egreso.
        Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de esa transacción.

- ### Filtrar datos de egresos por período de tiempo.
    Para modificar toda la información mostrada, se debe seleccionar el período de tiempo deseado como se indica en la imagen. Se puede seleccionar: anual, semestral o mensual.

    ![Filtrar tiempo](\assets\pantallas\ingresotiempo.jpg)

---
## Tarjetas

- ### Ver tarjetas del usuario.
  Las tarjetas se visualizan en un carrusel, desplazando hacia la izquierda avanzamos en las tarjetas del usuario. La información mostrada en pantalla, es correspondiente a la tarjeta seleccionada.

  ![Tarjetas del usuario](\assets\pantallas\tarjetasusuario.jpg)


- ### Agregar nueva tarjeta.
  Para agregar una tarjeta se debe precionar el boton '+' que se encuentra arriba a la derecha de las tarjetas.
    - Al seleccionar 'Tipo' se encuentran las opciones: crédito y débito.
    - Al seleccionar 'Cuenta bancaria' se encuentran un listado de las cuentas bancarias vinculadas del usuario.

  ![Boton agregar tarjeta](\assets\pantallas\tarjetasbotonadd.jpg)

  ![Agregar tarjeta](\assets\pantallas\tarjetasagregar.jpg)


- ### Copiar datos de la tarjeta.
  Se pueden copiar al cortapapeles el número de la tarjeta presionando el boton 'Copiar número de tarjeta' en la parte central de la pantalla.


- ### Ver egreso acumulado por tarjeta.
  En la parte central de la pantalla, se encuentra un display principal que indica el egreso acumulado según el período de tiempo que se muestra debajo, de la tarjeta seleccionada.

  ![Display Tarjeta](\assets\pantallas\tarjetasdisplay.jpg)


- ### Solicitar información en fecha de cierre resumen.
  El contador que se encuentra debajo del date picker, indica cuánto tiempo falta para que se cumpla la fecha de cierre resumen. Al llegar a 0, solicita ingresar la nueva fecha de cierre resumen y de vencimiento resumen.

  ![Tiempo vencimiento tarjetas](\assets\pantallas\tarjetastiempo.jpg)

  FALTA EL SCREENSHOT QUE AL TERMINAR EL TIEMPO PIDE LAS NUEVAS FECHAS



- ### Ver historial de egresos por tarjeta.
  Bajando se encuentra una tabla historial de todos los movimientos realizados con la tarjeta seleccionada.
    - #### Ver detalle de un movimiento.
      Al pulsar sobre el botón '+', se puede ver un detalle con toda la información del movimiento.

      - ### Eliminar un movimiento de una tarjeta.
        Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de ese movimiento.


- ### Filtrar datos de egreso por período de tiempo.
  Para modificar toda la información mostrada, se debe seleccionar el período de tiempo deseado como se indica en la imagen. Se puede seleccionar: anual, semestral o mensual.

  ![Tarjetas periodo](\assets\pantallas\tarjetasperiodo.jpg)


---
## Cuentas bancarias

- #### Ver cuentas bancarias del usuario.
  Las cuentas bancarias se visualizan en un carrusel, desplanzado hacia la izquierda avanzamos en las cuentas vinculadas del usuario. La información mostrada en pantalla, es correspondiente a la cuenta seleccionada.


- ### Agregar nueva cuenta.


- ### Copiar CBU de la cuenta.


- ### Ver las tarjetas asociadas a la cuenta.


- ### Ver saldo actual de la cuenta.


- ### Ver historial de transacciones de la cuenta.
  - #### Ver detalle de una transacción.


- ### Eliminar una transacción.


## Inversiones

- ### Agregar nueva inversión.
  Para agregar una nueva inversión del usuario, debe completar el formulario ingresando el monto de la inversión en pesos argentinos.
  - Al seleccionar 'Tipo' se encuentran las opciones: Plazo fijo, compra de titulos, acciones, bienes raices, energias renovables, divisas, bono, comodities y futuros.
  - Al seleccionar 'Plazo fijo' nos solicita ingresar el interés anual en %.
  - Al seleccionar 'Acciones' nos solicita ingresar el nombre de la empresa.

  ![Agregar inversion](\assets\pantallas\inversionesagregar.jpg)



- ### Ver historial de inversiones.
  Al bajar, se encuentra una tabla que nos muestra un listado de las inversiones realizadas del usuario.

  ![Agregar inversion](\assets\pantallas\inversioneshistorial.jpg)
    - #### Ver detalle de una inversión.
      Al pulsar el '+' de la derecha, se muestra la información detallada de la inversión.

      ![Inversión detalle](\assets\pantallas\inversiondetalle.jpg)
      - #### Eliminar una inversión.
        Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de ese movimiento.




## Prestamos

### (Dinero prestado)

- ### Ver total de dinero prestado.


- ### Añadir nuevo dinero prestado.


- ### Ver historial de dinero prestado.
    - #### Ver detalle de un dinero prestado.


- ### Eliminar un dinero prestado.


- ### Filtrar el dinero prestado por período de tiempo.

### (Dinero tomado)

- ### Ver total de dinero tomado.

- ### Añadir nuevo dinero tomado.

- ### Ver historial de dinero tomado.
  - #### Ver detalle de un dinero tomado.

- ### Eliminar un dinero tomado.


## Presupuesto

- ### Añadir presupuesto mensual.


- ### Ver comparación de presupuesto versus real.