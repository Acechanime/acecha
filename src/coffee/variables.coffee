export paginasLegacy = [
    "acecha-premium"
    "acecha-tv"
    "creadores-de-contenido"
    "dmca"
    "nosotros"
    "politica-privacidad"
]

export obtenerContenedorCss = () -> new Promise (resolve) =>
    el = document.getElementById "estilos-acecha"
    if el?
        resolve el
    else
        elem = document.createElement "style"
        elem.id = "estilos-acecha"
        document.head.appendChild elem
        resolve elem

export servidor = "https://api.acechanime.com"

export impr =
    if process.env.NODE_ENV != "production" && process.client
        window.console.log
    else =>
