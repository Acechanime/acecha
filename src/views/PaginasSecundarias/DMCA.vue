<template>
    <section class="content">
        <main class="main section the-page">
            <div class="main__inner wrap">
                <div class="essence loop loop--page">
                    <article class="essence__block the-post__article">
                        <header class="the-post__header">
                            <h1 class="the-post__title">DMCA</h1>
                        </header>
                        <section class="the-post__content">
                            <p>acechanime.com no hospeda ninguno de los contenidos en su propio servidor, acechanime.com solo integra
                                contenido que se cargó en sitios populares de alojamiento de videos en línea como Dailymotion.com,
                                Youtube.com, Mp4upload.com, Stream.moe y otros sitios similares</p>

                            <p>Todas las marcas comerciales, videos, nombres comerciales, marcas de servicio, trabajos con derechos de
                                autor, logotipos mencionados aquí pertenecen a sus respectivos propietarios / compañías.
                                acechanime.com&nbsp; no es responsable de lo que otras personas suban a sitios de terceros. Alentamos a
                                todos los propietarios de derechos de autor a que reconozcan que los videos incrustados pertenecen a
                                otros sitios, como los que se incluyen arriba. Si tiene algún problema legal, póngase en contacto con
                                los propietarios / anfitriones de los archivos de medios apropiados.</p>
                        </section>
                    </article>
                </div>
            </div>
        </main>
    </section>
</template>

<script lang="coffee">
    import { paginasLegacy as nombres } from "../../router"

    contenedorCssPromesa = new Promise (resolve) =>
        intervalo = setInterval (=>
            el = document.getElementById "estilos-acecha"
            if el?
                clearInterval intervalo
                resolve el
        ), 100


    export default
        name: "DMCA"
        beforeRouteEnter: (to, from, next) ->

            unless (nombres.find (x) => x is from.name)?
                contenedorCss = await contenedorCssPromesa
                css = await fetch "/style.css?ver=1.0.0"
                cssTxt = await css.text()
                contenedorCss.innerHTML = cssTxt

            next()
        beforeRouteLeave: (to, from, next) ->
            contenedorCss = await contenedorCssPromesa

            unless (nombres.find (x) => x is to.name)?
                contenedorCss.innerHTML = ""

            next()
    
#
</script>

<style scoped lang="sass">

    
    //
</style>