<template lang="pug">
    div.contenedor
        div.dias
            boton-dia(v-for="(dia, pos) in dias" :key="pos"
                :txt="dia"
                :pos="pos"
                :posActual="diaActual"
                :clickFn="cambiarDiaActual"
            )

        div.gridIn
            anime(v-for="(anime, pos) in animesFiltrados" :key="pos" :anime="anime")

    //
</template>

<script lang="coffee">
    import botonDia from "./boton-dia.vue"
    import anime from "../Animes/anime.vue"

    obtenerDia = (fecha) =>
        posPrimerSlash = fecha.indexOf "/"
        temp = fecha.substr (posPrimerSlash + 1)
        posSegundoSlash = temp.indexOf "/"

        dia = fecha.substring 0, posPrimerSlash
        mes = temp.substring 0, posSegundoSlash
        año = temp.substr (posSegundoSlash + 1)

        pre = (new Date "#{mes}/#{dia}/#{año}").getDay()
        (pre + 6) % 7


    export default
        name: "selector"
        components: { botonDia, anime }
        data: ->
            diaActual: 0
            dias: ["Todos los dias", "Lunes", "Martes", "Miercoles",
                "Jueves", "Viernes", "Sábado", "Domingo"]
        computed:
            listaAnimes: -> @$store.state.datos.animes
            listaAnimesEmision: -> @listaAnimes.filter (x) => x.en_emision is true
            animesFiltrados: ->
                listaAnimes = @listaAnimesEmision
                diaActual = @diaActual - 1

                if listaAnimes? && diaActual != -1
                    listaAnimes.filter (x) =>
                        if x.inicio_emision?
                            (obtenerDia x.inicio_emision) == diaActual
                        else false

                else listaAnimes

        methods:
            cambiarDiaActual: (nuevoDia) ->
                @diaActual = nuevoDia
    
#
</script>

<style scoped lang="sass">

    .dias
        display: grid
        grid-template-columns: repeat(8, auto)
        grid-row-gap: 1rem
        padding: 2rem 0


    .gridIn
        display: grid
        grid-template-columns: repeat(6, 14.16%)
        grid-column-gap: 3%
        grid-row-gap: 1.5rem



    @media only screen and (max-width: 1024px)
        .gridIn
            grid-template-columns: repeat(4, 21.25%)
            grid-column-gap: 5%



    @media only screen and (max-width: 850px)
        .dias
            grid-template-columns: repeat(4, auto)


    @media only screen and (max-width: 500px)
        .gridIn
            grid-template-columns: repeat(2, 48%)
            grid-column-gap: 4%

        .dias
            grid-template-columns: repeat(2, auto)
            grid-row-gap: 0.25rem




    //
</style>