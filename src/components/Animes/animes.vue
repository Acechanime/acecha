<template lang="pug">
    div
        div.paginacion
            template(v-for="n in paginasEnMedio")
                template(v-if="n === -1")
                    span.rango ...
                template(v-else)
                    span(:class="pagina === n? 'activo': ''" @click="cambiarPagina(n)")
                        | {{ n + 1 }}

        div.gridIn
            anime(v-for="anime in listaAnimesFiltrada3" :key="anime.anime_id" :anime="anime")

        div.paginacion
            template(v-for="n in paginasEnMedio")
                template(v-if="n === -1")
                    span.rango ...
                template(v-else)
                    span(:class="pagina === n? 'activo': ''" @click="cambiarPagina(n)")
                        | {{ n + 1 }}

    //
</template>

<script lang="coffee">
    import anime from "./anime.vue"
    import { comp, filtrar } from "../../coffee/buscador.coffee"

    numeroDeFilas = 5

    export default
        name: "animes"
        components:
            anime: anime
        data: ->
            pagina: 0
        props:
            filtro:
                type: Function # (Contexto, Anime) -> Prioridad
                required: true
            funOrden:
                type: Function # 'A -> 'B -> Num
                required: true
            terminarCargaFn:
                type: Function
                required: true
        computed:
            listaAnimes: -> @$store.state.datos.animes

            listaAnimesFiltrada2: ->
                primerRes = filtrar @, @listaAnimes, @filtro
                primerRes.sort @funOrden

            anchoPantalla: ->
                if process.client == false then return 501

                @$store.state.datos.resizeEvent
                window.innerWidth

            numeroDeAnimes: ->
                ancho = @anchoPantalla
                numeroDeColumnas = do ->
                    if ancho > 1440 then 5
                    else if ancho > 500 then 4
                    else 2
                numeroDeFilas * numeroDeColumnas

            numeroDePaginas: ->
                Math.ceil(@listaAnimesFiltrada2.length / @numeroDeAnimes)

            paginasEnMedio: ->
                pag = @pagina
                numP = @numeroDePaginas
                if numP > 6
                    switch pag
                        when 0, 1, 2 then [0, 1, 2, 3, -1, numP - 1]
                        when numP, numP - 1, numP - 2 then [0, -1, numP - 3, numP - 2, numP - 1]
                        else
                            [0, -1, pag - 1, pag, pag + 1 , -1, numP - 1]
                else
                    for i in [0 ... numP]
                        i

            listaAnimesFiltrada3: ->
                if @pagina > @numeroDePaginas
                    @pagina = @numeroDePaginas
                else if @pagina < 0
                    @pagina = 0
                else
                    posInicial = @pagina * @numeroDeAnimes
                    posFinal = posInicial + @numeroDeAnimes
                    @listaAnimesFiltrada2.slice posInicial, posFinal
        methods:
            cambiarPagina: (n) ->
                @pagina = n

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .paginacion
        text-align: center
        padding: 1rem 0
        span
            display: inline-block
            padding: 0.5rem 0
            border: solid 1px var(--colorPrincipal)
            text-align: center
            width: 2rem
            cursor: pointer
            user-select: none
            &.rango
                cursor: default
            &.activo
                background-color: var(--colorPrincipal)
                color: white



    .gridIn
        display: grid
        grid-template-columns: repeat(5, 18.4%)
        grid-column-gap: 2%
        grid-row-gap: 1.5rem
        grid-template-rows: repeat(2, auto)
        overflow: hidden


    @media only screen and (max-width: 1440px)
        .gridIn
            grid-template-columns: repeat(4, 21.25%)
            grid-column-gap: 5%


    @media only screen and (max-width: 500px)
        .gridIn
            grid-template-columns: repeat(2, 48%)
            grid-column-gap: 4%

    //
</style>
