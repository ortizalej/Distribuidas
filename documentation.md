# MoneyManager

MoneyManager es una aplicación mobile (Android/iOS) que permite tener un registro eficaz de las finanzas personales de un individuo.


## ¿Para quién está pensada esta solución?
---
Para toda persona que quiera conocer a fondo cuales son sus ingresos y egresos. Podrás conocer las fuentes, tipos y medios de pago que utilizas para tus transacciones. También podrás segmentarlas según tus tarjetas de crédito/débito y cuentas bancarias. Podrás ver tus inversiones y prestamamos. Podrás comparar un presupuesto esperado contra lo real gastado.

## Instalación
---
Para instalar este proyecto en su Visual Studio Code, debe...

## Diseño UX/UI
---
La primer etapa del proyecto, luego del relevamiento de la información, fue diseñar la aplicación en un programa que nos permita trabajar de manera colaborativa y plasmar el UX/UI que iba a tener la aplicación.
Estos diseños se pueden ver en: https://www.figma.com/file/mwWjJyMfzCLbTrls4n8iPA/App-Distribuidas?node-id=0%3A1

# Casos de usos.

## Autenticación

- ### Registro de un nuevo usuario.  
  Para registrar un nuevo usuario, debemos presionar 'Registrarse' en la pantala de LogIn y completar los datos solicitados.

  ![Registro](/assets/pantallas/registrarse.jpg)


- ### Inicio de sesión de un usuario registrado.
  Al abrir la aplicación por primera vez en el telefono o luego de ser encendido, el usuario podrá iniciar sesión.

  ![Login](/assets/pantallas/logi.jpg)

---
## Inicio

- ### Ver un dashboard con los principales gráficos.    
  En el home podremos encontrar una serie de gráficos que nos indican:
  - Monto gastado por mes en pesos, según tarjeta de credito+debito y por transferencia bancaria.
  - Monto gastado por mes en dolares, según tarjeta de credito+debito y por transferencia bancaria.
  - Los saldos en nuestras cuentas bancarias.
  - Desvío presupuestal en pesos.

   ![Dashboard2](\assets\pantallas\dashboard1.jpg)

   ![Dashboard2](\assets\pantallas\dashboard2.jpg)



- ### Ver todas las herramientas de la aplicación.
    En cualquier momento, el usuario puede deslizar desde el borde izquierdo hacia el derecho para ver el menu hamburguesa.
    - La contraseña ingresada debe tener almenos 8 caracteres.
    - El usuario ingresado debe tener almenos 6 caracteres.

    ![Menu Hamburguesa](\assets\pantallas\hamburguesa.jpg)
---
## Ingresos

- ### Ver ingreso acumulado.
    Una vez posicionado en la sección de ingresos, se encuentra un display principal que indica el ingreso acumulado según el período de tiempo que se muestra debajo.

    ![Ingreso acumulado](\assets\pantallas\ingresosdisplay.jpg)


- ### Registro de un nuevo ingreso.
    Para registrar un nuevo ingreso se debe completar el formulario con los datos solicitados y presionar el botón.
    - Al seleccionar 'Moneda' se encuentran las opciones: pesos o dóalres.
    - Al seleccionar 'Fuente' se encuentran las opciones: alquiler, sueldo, facturación o extraordinario.
    - Al seleccionar 'Medio' se encuentran las opciones: efectivo o transferencia bancaria.
      - Si seleccionamos transferencia bancaria, tendremos que elegir una cuenta bancaria vinculada del usuario. 

    ![Añadir ingreso](\assets\pantallas\ingresosañadir.jpg)


- ### Ver historial de ingresos.
    Deslizando hacia abajo, se encuentra una tabla que representa un historial de todos los ingresos que se realizaron el el periódo de tiempo seleccionado.

    ![Historial ingreso](\assets\pantallas\ingresoshistorial2.jpg)
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


    ![Acumulado egreso](\assets\pantallas\egresonuevo2.jpg)

- ### Ver historial de egresos.
    Bajando se encuentra una tabla historial de todos los egresos realizados.

    ![Historial egreso](\assets\pantallas\egresohistorial2.jpg)

  - ### Ver detalle de un egreso.
    Al pulsar sobre el botón '+', se puede ver un detalle con toda la información del egreso.
    
    ![Detalle egreso](\assets\pantallas\egresodetalle.jpg)


    - ### Eliminar un egreso.
        Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de esa transacción.

    - ### Ver archivo adjunto.
      Para visualizar el archivo adjunto debemos pulsar 'Abrir adjunto' y se veerá el archivo debajo de la tabla de historial.

      ![Egreso Imagen](\assets\pantallas\egresoimagen.jpg)


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

  ![Agregar tarjeta](\assets\pantallas\tarjetasagregar2.jpg)


- ### Ver egreso acumulado por tarjeta.
  En la parte central de la pantalla, se encuentra un display principal que indica el egreso acumulado según el período de tiempo que se muestra debajo, de la tarjeta seleccionada.

  ![Display Tarjeta](\assets\pantallas\tarjetasdisplay.jpg)


- ### Solicitar información en fecha de cierre resumen.
  El contador que se encuentra debajo del date picker, indica cuánto tiempo falta para que se cumpla la fecha de cierre resumen. Al llegar a 0, solicita ingresar la nueva fecha de cierre resumen y de vencimiento resumen.

  ![Tiempo vencimiento tarjetas](\assets\pantallas\tarjetastiempo.jpg)




- ### Ver historial de egresos por tarjeta.
  Bajando se encuentra una tabla historial de todos los movimientos realizados con la tarjeta seleccionada.

  ![Tarjetas historial](\assets\pantallas\tarjetashistorial.jpg)
    - #### Ver detalle de un movimiento.
      Al pulsar sobre el botón '+', se puede ver un detalle con toda la información del movimiento.

      ![Tarjeta detalle](\assets\pantallas\tarjetadetalle.jpg)




- ### Filtrar datos de egreso por período de tiempo.
  Para modificar toda la información mostrada, se debe seleccionar el período de tiempo deseado como se indica en la imagen. Se puede seleccionar: anual, semestral o mensual.

  ![Tarjetas periodo](\assets\pantallas\tarjetasperiodo.jpg)


---
## Cuentas bancarias

- #### Ver cuentas bancarias del usuario.
  Las cuentas bancarias se visualizan en un carrusel, desplanzado hacia la izquierda avanzamos en las cuentas vinculadas del usuario. La información mostrada en pantalla, es correspondiente a la cuenta seleccionada.

  ![Cuentas usuario](\assets\pantallas\cuentasusuario.jpg)

- ### Agregar nueva cuenta.
  Para agregar una nueva cuenta bancaria, debemos completar el forumalrio que aparece debajo del display, ingresando el titular, CBU y banco de la cuenta.

  ![Cuentas agregar](\assets\pantallas\cuentasagregar.jpg)


- ### Ver saldo actual de la cuenta.
  Debajo de la información de la cuenta, se encuentra un display con el saldo actual de la cuenta seleccionada.

  ![Cuentas salgo](\assets\pantallas\cuentassaldo.jpg)


- ### Ver historial de transacciones de la cuenta.
  Al bajar, se encuentra una tabla que nos muestra un listado de los movimientos realizados desde esa cuenta.

  ![Cuentas detalle](\assets\pantallas\cuentasdetalle.jpg)



## Inversiones

- ### Ver gráficos de inversiones.
  Si ya tenemos inversiones registradas, se ve un carrusel con diversos gráficos que representan las inversiones del usuario.

  ![Inversion grafico](\assets\pantallas\inversiongrafico.jpg)


- ### Agregar nueva inversión.
  Para agregar una nueva inversión del usuario, debe completar el formulario ingresando el monto de la inversión en pesos argentinos.
  - Al seleccionar 'Tipo' se encuentran las opciones: Plazo fijo, compra de titulos, acciones, bienes raices, energias renovables, divisas, bono, comodities y futuros.
  - Al seleccionar 'Plazo fijo' nos solicita ingresar el interés anual en %.
  - Al seleccionar 'Acciones' nos solicita ingresar el nombre de la empresa.

  ![Agregar inversion](\assets\pantallas\inversionesagregar2.jpg)



- ### Ver historial de inversiones.
  Al bajar, se encuentra una tabla que nos muestra un listado de las inversiones realizadas del usuario.

  ![Agregar inversion](\assets\pantallas\inversioneshistorial.jpg)
    - #### Ver detalle de una inversión.
      Al pulsar el '+' de la derecha, se muestra la información detallada de la inversión.

      ![Inversión detalle](\assets\pantallas\inversiondetalle.jpg)
      - #### Eliminar una inversión.
        Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de ese movimiento.

---
## Prestamos

### (Dinero prestado)
Al ingresar en la sección de préstamos, primero veremos toda la información asociada a prestamos que donde el usuario es el prestamista.

- ### Ver total de dinero prestado.
  Tendremos un display que indica el dinero total prestado.

  ![Prestamista display](\assets\pantallas\prestamistadisplay.jpg)


- ### Añadir nuevo dinero prestado.
  Debajo del display, tenemos un formulario para ingresar la información pertinente cuando prestamos dinero. 
  - Al seleccionar 'Moneda' se encuentran las opciones: pesos o dóalres.
  - Al seleccionar 'Medio' se encuentran las opciones: Efectivo o Transferencia Bancaria.
  - Al seleccionar 'Transferencia Bancaria' se debe seleccionar una cuenta asociada del usuario.
  
  ![Prestamista agregar](\assets\pantallas\prestamistaagregar.jpg)



- ### Ver historial de dinero prestado.
  Al bajar, se encuentra una tabla que nos muestra un listado del dinero prestado del usuario.

  ![Prestamista historial](\assets\pantallas\prestamistahistorial.jpg)

    - #### Ver detalle de un dinero prestado.
      Al pulsar el '+' de la derecha, se muestra la información detallada del dinero prestado.

      ![Prestamista detalle](\assets\pantallas\prestamistadetalle.jpg)


      - ### Eliminar un dinero prestado.
        Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de ese movimiento.


- ### Filtrar el dinero prestado por período de tiempo.
  Para modificar toda la información mostrada, se debe seleccionar el período de tiempo deseado como se indica en la imagen. Se puede seleccionar: anual, semestral o mensual.

  ![Prestamista tiempo](\assets\pantallas\prestamistatiempo.jpg)


### (Dinero tomado)
Si bajamos hasta la mitad inferior de la sección, encontraremos la información relacioanda al dinero que tomó prestado el usuario.

- ### Ver total de dinero tomado.
  Tendremos un display que indica el dinero total tomado.

  ![Deuda total](\assets\pantallas\deudatotal.jpg)


- ### Añadir nuevo dinero tomado.
  Debajo del display, tenemos un formulario para ingresar la información pertinente cuando tomamos prestado dinero.

- Al seleccionar 'Moneda' se encuentran las opciones: pesos o dóalres.
- Al seleccionar 'Medio' se encuentran las opciones: Efectivo o Transferencia Bancaria.
- Al seleccionar 'Transferencia Bancaria' se debe seleccionar una cuenta asociada del usuario.
- Al selecciona 'Cuotas' debemos seleccionar en cuántas cuotas hemos tomado el préstamo.

  ![Deuda agregar](\assets\pantallas\deudaagregar.jpg)


- ### Ver historial de dinero tomado.
  Al bajar, se encuentra una tabla que nos muestra un listado del dinero tomado por usuario.

  ![Deuda historial](\assets\pantallas\deudahistorial.jpg)


  - #### Ver detalle de un dinero tomado.
     Al pulsar el '+' de la derecha, se muestra la información detallada del dinero tomado.

    ![Deuda detalle](\assets\pantallas\deudadetalle.jpg)


  - ### Eliminar un dinero tomado.
    Cuando se visualiza un detalle, pulsando el botón 'borrar' se elimina el registro de ese movimiento.

---

## Presupuesto
En esta sección podremos agregar un presupuesto mensual que estimamos gastar. Este se debe seccionar por distintos tipos.

- ### Añadir presupuesto mensual.
  Para agregar un nuevo presupuesto mensual, debemos completar el formulario.
  - Al seleccionar 'Tipo' se encuentran las opciones: servicio, impuestos nacionales, impuestos provinciales, impuestos municipales, educación, salud, gastos varios, comida, entretenimiento, viáticos u otros.
  - Si seleccionamos servicio, tendremos que elegir una el tipo de servicio: luz, agua u otro.
    - Si seleccionamos otro, debemos detallar el servicio.

  ![Presupuesto agregar](\assets\pantallas\presupuestoagregar.jpg)


- ### Ver comparación de presupuesto versus real.
  Debajo del formulario de agregar presupuesto, vemos un grafico comparativo donde podremos ver el presupuesto estimado versus el presupuesto real, diferenciado por los distintos tipos que fuimos dando de alta.

  ![Presupuesto versus](\assets\pantallas\presupuestoversus.jpg)


  ---

  ## Configuración

  ![Configuracion](\assets\pantallas\configuracion.jpg)

  - ### Back-up
    Si queremos realizar un back-up de nuestros datos, debemos pulsar el boton 'Generar back-up'. Esto impacta en nuestra base de datos en la nube (mongoDB), quedando almacenados de manera permanente.

  - ### Recuperar Back-up
    Si queremos recuperar un back-up que hemos almacenado anteriormente, debemos pulsar el boton 'Recuperar Back-up'. Esto traerá la última copia realizada de nuestra base de datos en la nube e impactará en toda la información mostrada en la aplicación.

  - ### Exportar CSV
    Para exportar todos nuestros datos de usuario fuera de la aplicación en formato 'CSV', debemos pulsar el boton 'Exportar CSV'. Esto nos creará un documento de ese formato y nos permitirá compartirlo en las principales aplicaciónes que tengamos en nuestro dispositivo.