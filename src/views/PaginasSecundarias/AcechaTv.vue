<template>
    <div>
        <div class="subheader">
            <div class="subheader__inner wrap">
                <div class="subheader__icon">
                    <span class="icon-tv"></span>
                </div>
                <h1 class="subheader__title">
                    Acecha
                    <span>TV</span>
                </h1>
                <p class="subheader__description">
                    En este apartado entenderás cómo subimos los episodios y cuál es nuestra marca
                    de agua.
                </p>
            </div>
            <div
                    class="subheader__cover"
                    data-background="https://legacy.acechanime.com/wp-content/themes/anime/img/subheader.png"
                    style="background-image: url('https://legacy.acechanime.com/wp-content/themes/anime/img/subheader.png');"
            ></div>
        </div>
        <section class="content">
            <div class="section--separator"></div>
            <section class="section step step--one">
                <div class="step__inner wrap">
                    <div class="step__text">
                        <h2>1. Descargamos RAW</h2>
                        <p>Descargamos los animes sin subtítulos.</p>
                    </div>
                    <figure class="step__image">
                        <img
                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/raw.png"
                                alt="Descargamos RAW"
                        />
                    </figure>
                </div>
            </section>
            <div class="section--separator"></div>
            <section class="section step step--two">
                <div class="step__inner wrap">
                    <div class="step__text">
                        <h2>2. Traducimos</h2>
                        <p>Traducimos del japonés y/o ingles al español.</p>
                    </div>
                    <figure class="step__image">
                        <img
                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/translate.png"
                                alt="Traducimos"
                        />
                    </figure>
                </div>
            </section>
            <div class="section--separator"></div>
            <section class="section step step--three">
                <div class="step__inner wrap">
                    <div class="step__text">
                        <h2>3. ¡Lo lanzamos!</h2>
                        <p>Y ¡PUM! ya lo tienes listo en nuestra página.</p>
                    </div>
                    <figure class="step__image">
                        <img
                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/release.png"
                                alt="Descargamos RAW"
                        />
                    </figure>
                </div>
            </section>
            <main class="main section">
                <div class="main__inner wrap">
                    <div class="section__header">
                        <h2 class="section__title">¿Realmente son esos pasos?</h2>
                        <p class="section__description">
                            Estas páginas nos ayudan a que nuestro sitio adelante, muchas veces no nos da
                            tiempo a subir tantos animes como nos gustaría, lo cual recurrimos a estas páginas.
                            <br />Ellos tienen animes
                            sin marca de agua, que quede claro que nosotros no subimos episodios de anime con nuestra marca de agua si
                            es cogido de estas páginas.
                            <br />Nuestra marca de agua solo estará en aquellos animes que sean traducidos por
                            nosotros.
                        </p>
                    </div>
                    <div class="section__content">
                        <div class="helpers">
                            <div class="helpers__item">
                                <div class="helpers__image">
                                    <img
                                            src="https://legacy.acechanime.com/wp-content/themes/anime/img/pseudosubs.jpg"
                                            alt="PseudoSubs"
                                    />
                                </div>
                                <h3 class="helpers__title">PseudoSubs</h3>
                            </div>
                            <div class="helpers__item">
                                <div class="helpers__image">
                                    <img
                                            src="https://legacy.acechanime.com/wp-content/uploads/2019/05/soanime.jpg"
                                            alt="SoAnime Site HD"
                                    />
                                </div>
                                <h3 class="helpers__title">SoAnime Site HD</h3>
                            </div>
                            <div class="helpers__item">
                                <div class="helpers__image" style="background-color: #1F212B">
                                    <img
                                            src="https://2.bp.blogspot.com/-PIL8rHgu9FA/XcNW7YiTI4I/AAAAAAAADVE/tP3NWe8UurYnBirlwQjSIxWW1ZMhag5XwCLcBGAsYHQ/s1600/logo_evaecv6.png"
                                            alt="AnimeFlasho"
                                    />
                                </div>
                                <h3 class="helpers__title">Evangelion-EC</h3>
                            </div>
                            <div class="helpers__item">
                                <div class="helpers__image">
                                    <img
                                            src="https://monoschinos.com/assets/img/logo.png"
                                            alt="MonosChinos"
                                    />
                                </div>
                                <h3 class="helpers__title">MonosChinos</h3>
                            </div>
                            <div class="helpers__item">
                                <div class="helpers__image">
                                    <img
                                            src="https://legacy.acechanime.com/wp-content/themes/anime/img/puyasubs.png"
                                            alt="Puya Subs"
                                    />
                                </div>
                                <h3 class="helpers__title">Puya Subs</h3>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <div class="section--separator"></div>
        </section>
    </div>
</template>

<script lang="coffee">

    contenedorCssPromesa = new Promise (resolve) =>
        intervalo = setInterval (=>
            el = document.getElementById "estilos-acecha"
            if el?
                clearInterval intervalo
                resolve el
        ), 100


    export default
        name: "AcechaTV"
        beforeRouteEnter: (to, from, next) ->
            nombres = ["Nosotros", "Creadores", "Premium", "AcechaTV"]

            unless (nombres.find (x) => x is from.name)?
                contenedorCss = await contenedorCssPromesa
                css = await fetch "/style.css?ver=1.0.0"
                cssTxt = await css.text()
                contenedorCss.innerHTML = cssTxt

            next()
        beforeRouteLeave: (to, from, next) ->
            nombres = ["Nosotros", "Creadores", "Premium", "AcechaTV"]
            contenedorCss = await contenedorCssPromesa

            unless (nombres.find (x) => x is to.name)?
                contenedorCss.innerHTML = ""

            next()


#
</script>

<style scoped lang="sass">

    .subheader__cover:before
        // background: rgba(0, 0, 0, 0.85) !important
        background: linear-gradient(280deg, rgba(64, 84, 178, 0.8) 25%, rgba(242, 41, 91, 0.8) 100%)


    //
</style>