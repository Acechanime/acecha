<template>
    <div>
        <div class="subheader">
            <div class="subheader__inner wrap">
                <h1 class="subheader__title">Creadores de Contenido</h1>
                <div class="subheader__icon">
                    <span class="icon-youtube"></span>
                </div>
            </div>
            <div
                    class="subheader__cover"
                    data-background="https://legacy.acechanime.com/wp-content/themes/anime/img/subheader.png"
                    style="background-image: url('https://legacy.acechanime.com/wp-content/themes/anime/img/subheader.png');"
            ></div>
        </div>
        <section class="content">
            <main class="main section">
                <div class="main__inner wrap">
                    <div class="section__content">
                        <div class="cdc">
                            <div class="cdc__item">
                                <figure class="cdc__thumbnail">
                                    <a
                                            class="cdc__thumbnail__link"
                                            href="https://www.youtube.com/channel/UCITHhAUGpYv-MMV87gG8Gdw"
                                            target="_blank"
                                    >
                                        <img
                                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/youtuber-01.jpg"
                                                alt="Rodik Sama"
                                                class="cdc__image"
                                        />
                                    </a>
                                    <figcaption class="cdc__name">Rodik Sama</figcaption>
                                </figure>
                            </div>
                            <div class="cdc__item">
                                <figure class="cdc__thumbnail">
                                    <a
                                            class="cdc__thumbnail__link"
                                            href="https://www.youtube.com/channel/UCa3g6esBayHoL2TDgPDtUdQ"
                                            target="_blank"
                                    >
                                        <img
                                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/youtuber-02.jpg"
                                                alt="Xazbet"
                                                class="cdc__image"
                                        />
                                    </a>
                                    <figcaption class="cdc__name">Xazbet</figcaption>
                                </figure>
                            </div>
                            <div class="cdc__item">
                                <figure class="cdc__thumbnail">
                                    <a
                                            class="cdc__thumbnail__link"
                                            href="https://www.youtube.com/channel/UC5ESBIGGASXjPq4nQaMJ4qQ"
                                            target="_blank"
                                    >
                                        <img
                                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/youtuber-03.jpg"
                                                alt="Casa Anime OtakuYT"
                                                class="cdc__image"
                                        />
                                    </a>
                                    <figcaption class="cdc__name">Casa Anime OtakuYT</figcaption>
                                </figure>
                            </div>
                            <div class="cdc__item">
                                <figure class="cdc__thumbnail">
                                    <a
                                            class="cdc__thumbnail__link"
                                            href="https://www.youtube.com/channel/UC-YGGs-VuOHSBf8CQjvR_ww"
                                            target="_blank"
                                    >
                                        <img
                                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/youtuber-04.jpg"
                                                alt="Animatium"
                                                class="cdc__image"
                                        />
                                    </a>
                                    <figcaption class="cdc__name">Animatium</figcaption>
                                </figure>
                            </div>
                            <div class="cdc__item">
                                <figure class="cdc__thumbnail">
                                    <a
                                            class="cdc__thumbnail__link"
                                            href="https://www.youtube.com/channel/UCfLMgWLpzh2Foj4RfA8KgcA"
                                            target="_blank"
                                    >
                                        <img
                                                src="https://legacy.acechanime.com/wp-content/themes/anime/img/youtuber-05.jpg"
                                                alt="Kawaii Tops"
                                                class="cdc__image"
                                        />
                                    </a>
                                    <figcaption class="cdc__name">Kawaii Tops</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <section class="section stats">
                <div class="stats__inner wrap">
                    <div class="section__header">
                        <h2 class="section__title">Estadísticas</h2>
                        <p class="section__description">
                            ¡HOLA! ya son varios YouTubers los que forman parte de la plantilla de
                            @AcechaAnime, es un placer tener a nuestros “Influencers” todo unidos aquí. Para agradecer la confianza de
                            ellos hemos creado este apartado solo para ellos.
                        </p>
                    </div>
                    <div class="section__content">
                        <div class="stats__progress">
                            <div class="stats__progress__item">
                                <div class="progress progress--green">
                                    <span class="progress__text">Alcance</span>
                                    <span class="progress__text">100%</span>
                                </div>
                            </div>
                            <div class="stats__progress__item">
                                <div class="progress progress--red">
                                    <span class="progress__text">Alcance</span>
                                    <span class="progress__text">100%</span>
                                </div>
                            </div>
                            <div class="stats__progress__item">
                                <div class="progress progress--yellow">
                                    <span class="progress__text">Alcance</span>
                                    <span class="progress__text">100%</span>
                                </div>
                            </div>
                            <div class="stats__progress__item">
                                <div class="progress progress--lightblue">
                                    <span class="progress__text">Alcance</span>
                                    <span class="progress__text">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
        name: "Creadores"
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
        background: rgba(0, 0, 0, 0.85) !important


    //
</style>