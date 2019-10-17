/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log(
                'Aplicacion servida desde un service worker.\n' +
                'Detalles -> https://goo.gl/AFskqB'
            )
        },
        registered() {
            console.log("Se ha registrado el Service Worker.");
        },
        cached() {
            console.log("Se ha descargado contenido para usarlo sin internet.");
        },
        updatefound() {
            console.log("Descargando nuevo contenido.");
        },
        updated() {
            console.log("Nuevo contenido disponible, la pagina se recargará.");
            window.location.reload(true);
        },
        offline() {
            console.log("No hay conexion a internet.");
        },
        error(error) {
            console.error("Error al registrar el service worker: ", error);
        }
    })
}
