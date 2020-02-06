# Acechanime

[![Netlify Status](https://api.netlify.com/api/v1/badges/cdeb5378-efc5-4146-8476-fc08ae964088/deploy-status)](https://app.netlify.com/sites/gifted-lamarr-11dd12/deploys)

Bienvenido al repositorio de Acechanime, aquí se encuentra el
código que permite funcionar la página.

## Instalación

Para instalar una copia de acechanime en tu pc necesitas lo
siguiente:

- Node JS
- PostgreSQL (opcional, para el funcionamiento)

Tras descargar este repositorio:

`yarn install`

o, si usas npm

`npm install`

Luego, necesitarás compilar los archivos `*.coffee` que se
encuentran en la carpeta /srv con coffeescript y babel.

Finalmente, en package.json se encuentran los scripts necesarios:

##### serve

Sirve las vistas en localhost

##### express

Ejecuta el servidor express en localhost

##### build

Construye las vistas

##### start

Inicia el servidor en modo producción, usando como vistas la
carpeta /dist generada por `build`, y los archivos js compilados
en /srv. 

## Estructura

La página utiliza el Modelo Vista Controlador, y consta de:

### Vistas

Se usan Vue.js 2.0 y para los template de este, pug (jade),
sass y coffeescript.

### Modelo

Una simple base de datos PostgreSQL

### Controlador

Backend de node.js con express, pero desarrollado con 
coffeescript.

## Contribuciones

Si encuentras un error en la página, no dudes en agregar un 
Issue.

Si deseas escribir código, puedes crear pull requests, o
solicitar participación directa por Discord. No es necesario
que sepas usar absolutamente todas las tecnologías usadas.


