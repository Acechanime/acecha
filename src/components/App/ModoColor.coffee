# TODO: ajustar los colores
colores =
    claro:
        "--fondo0": "#ffffff"
        "--fondo1": "#ffffff"
        "--fondo2": "#ffffff"
        "--fondo3": "#ebebeb"
        "--sombra1": "rgba(0, 0, 0, 0.15)"
        "--texto1": "#3A3A3A"
        "--texto2": "#4e565b"
        "--opacidad1": "1"
        "--opacidad2": "0.9"
    azulOscuro:
        "--fondo0": "#0e1621"
        "--fondo1": "#080911"
        "--fondo2": "#0c131d"
        "--fondo3": "#080911"
        "--sombra1": "rgba(0, 0, 0, 0.12)"
        "--texto1": "#e8e8e1"
        "--texto2": "#BFC1B6"
        "--opacidad1": "0.8"
        "--opacidad2": "0.9"
    negro:
        "--fondo0": "#0e1621"
        "--fondo1": "black"
        "--fondo2": "#0c131d"
        "--fondo3": "#080911"
        "--sombra1": "rgba(0, 0, 0, 0.12)"
        "--texto1": "#e8e8e1"
        "--texto2": "#BFC1B6"
        "--opacidad1": "0.8"
        "--opacidad2": "0.9"
    oscuro:
        "--fondo0": "#0e1621"
        "--fondo1": "#101010"
        "--fondo2": "#0c131d"
        "--fondo3": "#080911"
        "--sombra1": "rgba(0, 0, 0, 0.12)"
        "--texto1": "#e8e8e1"
        "--texto2": "#BFC1B6"
        "--opacidad1": "0.8"
        "--opacidad2": "0.9"
    gris:
        "--fondo0": "#0e1621"
        "--fondo1": "#1a2329"
        "--fondo2": "#0c131d"
        "--fondo3": "#080911"
        "--sombra1": "rgba(0, 0, 0, 0.12)"
        "--texto1": "#e8e8e1"
        "--texto2": "#BFC1B6"
        "--opacidad1": "0.8"
        "--opacidad2": "0.9"


cambiarEsquema = (nombreEsquema) =>
    localStorage.setItem "modo-color", nombreEsquema
    esquema = colores[nombreEsquema]
    if esquema?
        for propiedad, color of esquema
            document.documentElement.style.setProperty propiedad, color
            null
    else
        console.error "Error al cambiar el esquema de color. #{nombreEsquema} no existe."


inicializarModoColorOscuro = () =>
    modoActual = localStorage?.getItem "modo-color-oscuro"
    unless modoActual?
        localStorage.setItem "modo-color-oscuro", "azulOscuro"


cambiarModoColorOscuro = (modo) =>
    localStorage.setItem "modo-color-oscuro", modo


cambiarColor = () =>
    nuevoModo = do ->
        res = localStorage.getItem "modo-color"
        res ? "claro"
    cambiarEsquema (
        if nuevoModo is "claro"
            (localStorage?.getItem "modo-color-oscuro") ? "azulOscuro"
        else "claro"
    )


export cambiarEsquema = cambiarEsquema
export cambiarColor = cambiarColor
export inicializarModoColorOscuro = inicializarModoColorOscuro
export cambiarModoColorOscuro = cambiarModoColorOscuro
#