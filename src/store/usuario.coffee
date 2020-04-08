recuperarUsuario = =>
    usuario = localStorage.getItem "usuario"
    if usuario? then JSON.parse usuario
    else {}


export moduloUsuario =
    namespaced: true
    state:
        usuarioActual: recuperarUsuario()
    mutations:
        registrarUsuarioActual: (state, usuario) ->
            state.usuarioActual = usuario
            localStorage.setItem "usuario", JSON.stringify usuario

        cerrarSesionUsuario: (state) ->
            state.usuarioActual = {}
            localStorage.removeItem "usuario"

    actions: {}
