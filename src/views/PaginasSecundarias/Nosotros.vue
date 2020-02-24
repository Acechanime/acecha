<template>
  <div>
    <div class="subheader">
      <div class="subheader__inner wrap">
        <div class="subheader__icon">
          <span class="icon-group"></span>
        </div>
        <h1 class="subheader__title">Nosotros</h1>
        <p class="subheader__description">
          Somos consumidores como vosotros, solo queremos tener una comunidad cercana con
          buen diseño y ofreceros lo mejor.
        </p>
      </div>
      <div
        class="subheader__cover"
        data-background="https://beta.acechanime.com/wp-content/uploads/2019/05/nosotros-960x600.jpg"
      ></div>
    </div>
    <section class="content">
      <main class="main section">
        <div class="main__inner wrap">
          <div class="section__content">
            <div class="social">
              <a href="https://www.facebook.com/AcechaAnimeES/" target="_blank">
                <div class="social__item social__item--facebook">
                  <div class="social__icon">
                    <span class="icon-facebook"></span>
                  </div>
                  <h3 class="social__title">Facebook</h3>
                  <p class="social__description">
                    Publicamos nuevos episodios, eventos relacionados con AcechaAnime,
                    novedades referente a la página, recomendamos Twitter para un mejor contacto.
                  </p>
                </div>
              </a>
              <a href="https://twitter.com/AcechaAnime" target="_blank">
                <div class="social__item social__item--twitter">
                  <div class="social__icon">
                    <span class="icon-twitter"></span>
                  </div>
                  <h3 class="social__title">Twitter</h3>
                  <p class="social__description">
                    Publicamos nuevos episodios, eventos relacionados con AcechaAnime,
                    novedades referente a la página, recomendamos Twitter para un mejor contacto.
                  </p>
                </div>
              </a>
              <a href="https://www.youtube.com/channel/UCdW5XXIYqDLQCG3llyUnPdQ" target="_blank">
                <div class="social__item social__item--youtube">
                  <div class="social__icon">
                    <span class="icon-youtube-text"></span>
                  </div>
                  <h3 class="social__title">YouTube</h3>
                  <p class="social__description">
                    Publicamos nuevos episodios, eventos relacionados con AcechaAnime,
                    novedades referente a la página, recomendamos Twitter para un mejor contacto.
                  </p>
                </div>
              </a>
              <a href="https://discord.gg/WDkKcJr" target="_blank">
                <div class="social__item social__item--discord">
                  <div class="social__icon">
                    <span class="icon-discord"></span>
                  </div>
                  <h3 class="social__title">Discord</h3>
                  <p class="social__description">
                    Publicamos nuevos episodios, eventos relacionados con AcechaAnime,
                    novedades referente a la página, recomendamos Twitter para un mejor contacto.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <section class="section history">
        <div class="section__header">
          <div class="wrap">
            <h2 class="section__title">Nuestra Historia</h2>
            <div class="section__icon">
              <span class="icon-heart"></span>
            </div>
          </div>
        </div>
        <div class="section__content">
          <div class="history__text">
            <div class="wrap">
              <p>
                Empezamos en una simple página de Wix donde nos limitaba, estaba sólo frente a miles pero, empezaron a
                venir grandes personas, hicimos una gran amistad además de un gran trabajo con la página pero
                necesitábamos más personal y nueva página.
              </p>
              <p>
                He aquí cuando decidimos pasar a WordPress, por fin pudimos tener un público más amplio gracias a todos
                del Staff y a los YouTubers los cuales confiaron en nuestro proyecto entonces decidieron promocionar
                nuestro sitio, les ofrecemos ayuda en todo lo que podemos siempre además del contacto constante.
              </p>
            </div>
          </div>
          <div class="history__cover">
            <img
              src="https://acechanime.com/wp-content/themes/anime/img/history.png"
              alt="Nuestra Historia"
            />
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
        name: "Nosotros"
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



    //
</style>