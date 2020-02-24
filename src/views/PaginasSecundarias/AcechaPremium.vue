<template>
  <div>
    <div class="subheader">
      <div class="subheader__inner wrap">
        <!-- <h1 class="subheader__title">Acecha Premium</h1> -->
        <div class="premium-guide">
          <div class="premium-guide__item">
            <div class="premium-guide__image">
              <img
                src="https://acechanime.com/wp-content/themes/anime/img/discord.png"
                alt="Discord"
              />
            </div>
            <div class="premium-guide__text">
              <h3>Rol Vip Discord</h3>
              <p>Rol VIP permanentemente al entrar al servidor Acechanime Discord.</p>
            </div>
          </div>
          <div class="premium-guide__item">
            <div class="premium-guide__image">
              <img
                src="https://acechanime.com/wp-content/themes/anime/img/acechanime.png"
                alt="Acechanime"
              />
            </div>
            <div class="premium-guide__text">
              <h3>Apoya a Acechanime</h3>
              <p>Apoya a AcechaAnime, todo el dinero empleado será destinado a Hosting, Dominio etc</p>
            </div>
          </div>
          <div class="premium-guide__item">
            <div class="premium-guide__image">
              <span class="icon-heart"></span>
            </div>
            <div class="premium-guide__text">
              <h3>Agradecimiento y atención personal</h3>
              <p>por parte de todo el equipo que hay detrás de AcechaAnime.</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="subheader__cover"
        data-background="https://acechanime.com/wp-content/themes/anime/img/subheader.png"
      ></div>
    </div>
    <section class="content">
      <main class="main section">
        <div class="main__inner wrap">
          <div class="essence">
            <div class="essence__block">
              <div class="diptych">
                <div class="diptych__block diptych--rich">
                  <img
                    src="https://acechanime.com/wp-content/themes/anime/img/acechanime.png"
                    alt="Acechanime"
                  />
                  <a
                    href="https://acechanime.com/comprar-acecha-premium"
                    class="btn btn-primary btn-lg mt-2"
                  >
                    Obtener
                    Acecha Premium
                    <span class="icon-long-arrow-right"></span>
                  </a>
                </div>
                <div class="diptych__block diptych--text">
                  <!-- <div class="diptych__label">Preguntas Frecuentes</div> -->
                  <h2 class="section__title">FAQ</h2>
                  <p class="section__description">Preguntas Frecuentes</p>
                  <div class="faqs">
                    <div class="faqs__item">
                      <div class="faqs__header">
                        <h4 class="faqs__title">¿Qué es y para qué sirve Acecha Premium?</h4>
                      </div>
                      <div class="faqs__content">
                        <p>
                          Es una donación que haces a la página para apoyarla. Cualquiera de los pases disponibles,
                          obtendrás los mismos beneficios, ¡el pago es único! no hay que pagar mensualmente.
                        </p>
                      </div>
                    </div>
                    <div class="faqs__item">
                      <div class="faqs__header">
                        <h4 class="faqs__title">¿Es obligado comprar Acecha Premium?</h4>
                      </div>
                      <div class="faqs__content">
                        <p>
                          Obviamente no, sólo si lo deseas, recuerda que funciona como una simple donación sólo que
                          acabas teniendo algún beneficio que otro.
                        </p>
                      </div>
                    </div>
                    <div class="faqs__item">
                      <div class="faqs__header">
                        <h4 class="faqs__title">¿Vale la pena comprar Acecha Premium?</h4>
                      </div>
                      <div class="faqs__content">
                        <p>
                          Si realmente te gusta lo que ves y aprecias el trabajo que hay detrás, podrías apoyar el
                          proyecto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
        name: "Premium"
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

    .faqs__content
        display: block

    //
</style>