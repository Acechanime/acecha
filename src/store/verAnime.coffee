export moduloVerAnime =
    state:
        verAnimeActivo: no
        listaEpisodios: []
        activo: no
        anime:
            mega: null
            rapidvideo: null
            mango: null
            mp4upload: null
            okru: null
        nombre: null
        esOva: no
        ep: -1
        ruta: ""
    mutations:
        cambiarNumEp: (state, valor) ->
            state.ep = valor
        cambiarEstadoVerAnime: (state) ->
            state.activo = !state.activo
        activarVerAnime: (state) ->
            state.activo = true
        desactivarVerAnime: (state) ->
            state.activo = false
        cambiarRutaVerAnime: (state, ruta) ->
            state.ruta = ruta
        cambiarDatosVerAnime: (state, datos) ->
            if state.nombre isnt datos.nombre or state.ep isnt datos.ep
                state.nombre = datos.nombre
                state.esOva = datos.esOva
                state.ep = datos.ep
                state.ruta = datos.ruta
        cambiarAnimeVerAnime: (state, datos) ->
            if state.anime.mega isnt datos.mega
                state.anime = datos
        cambiarListaEpisodios: (state, data) ->
            state.listaEpisodios = data

        activarVerAnime: (state) ->
            state.verAnimeActivo = yes
        desactivarVerAnime: (state) ->
            state.verAnimeActivo = no
