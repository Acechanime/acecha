<template>
    <section class="content">
        <div class="separador"></div>
        <main class="main section the-page">
            <div class="main__inner wrap">
                <div class="essence loop loop--page">
                    <article class="essence__block the-post__article">
                        <header class="the-post__header">
                            <h1 class="the-post__title">Política de privacidad</h1>
                        </header>
                        <section class="the-post__content">

                            <h2><strong>¿Quiénes somos?</strong></h2>



                            <p>La dirección de nuestro sitio web es: https://acechanime.com.</p>



                            <h3><strong>Comentarios</strong></h3>



                            <p>Cuando los visitantes dejan comentarios en el sitio, recopilamos los datos que se muestran en el
                                formulario de comentarios, y también la dirección IP del visitante y la cadena del agente del usuario
                                del navegador para ayudar a la detección de spam.</p>



                            <h3><strong>Media</strong></h3>



                            <p>Si carga imágenes en el sitio web, debe evitar subir imágenes con datos de ubicación incorporados (GPS
                                EXIF) incluidos. Los visitantes del sitio web pueden descargar y extraer los datos de ubicación de las
                                imágenes en el sitio web.</p>



                            <h3><strong>Cookies</strong></h3>



                            <p>Si deja un comentario en nuestro sitio, puede optar por guardar su nombre, dirección de correo
                                electrónico y sitio web en cookies. Estos son para su conveniencia para que no tenga que completar sus
                                datos nuevamente cuando deje otro comentario. Estas cookies durarán un año.</p>



                            <p>Si tiene una cuenta e inicia sesión en este sitio, estableceremos una cookie temporal para determinar
                                si su navegador acepta cookies. Esta cookie no contiene datos personales y se descarta al cerrar su
                                navegador.</p>



                            <p>Cuando inicie sesión, también configuraremos varias cookies para guardar su información de inicio de
                                sesión y las opciones de visualización de su pantalla. Las cookies de inicio de sesión duran dos días y
                                las cookies de opciones de pantalla duran un año. Si selecciona «Recordarme», su inicio de sesión
                                persistirá durante dos semanas. Si se desconecta de su cuenta, se eliminarán las cookies de inicio de
                                sesión.</p>



                            <p>Si edita o publica un artículo, se guardará una cookie adicional en su navegador. Esta cookie no
                                incluye datos personales y simplemente indica el ID de publicación del artículo que acaba de editar.
                                Vence después de 1 día.</p>



                            <h3><strong>Contenido incrustado de otros sitios web</strong></h3>



                            <p>Los artículos en este sitio pueden incluir contenido incrustado (por ejemplo, videos, imágenes,
                                artículos, etc.). El contenido incorporado de otros sitios web se comporta de la misma manera que si el
                                visitante hubiera visitado el otro sitio web.</p>



                            <p>Estos sitios web pueden recopilar datos sobre usted, usar cookies, incrustar un seguimiento de terceros
                                adicional y monitorear su interacción con ese contenido incrustado, incluido el seguimiento de su
                                interacción con el contenido incrustado si tiene una cuenta y está registrado en ese sitio web.</p>



                            <h2><strong>Cuánto tiempo conservamos sus datos</strong></h2>



                            <p>Si deja un comentario, el comentario y sus metadatos se conservan indefinidamente. Esto es para que
                                podamos reconocer y aprobar los comentarios de seguimiento automáticamente en lugar de mantenerlos en
                                una cola de moderación.</p>



                            <p>Para los usuarios que se registran en nuestro sitio web (si corresponde), también almacenamos la
                                información personal que proporcionan en su perfil de usuario. Todos los usuarios pueden ver, editar o
                                eliminar su información personal en cualquier momento (excepto que no pueden cambiar su nombre de
                                usuario). Los administradores del sitio web también pueden ver y editar esa información.</p>



                            <h2><strong>Qué derechos tienes sobre tus datos</strong></h2>



                            <p>Si tiene una cuenta en este sitio o ha dejado comentarios, puede solicitar recibir un archivo exportado
                                de los datos personales que tenemos sobre usted, incluidos los datos que nos haya proporcionado. También
                                puede solicitar que borremos cualquier información personal que tengamos sobre usted. Esto no incluye
                                ningún dato que estemos obligados a conservar con fines administrativos, legales o de seguridad.</p>



                            <h2><strong>Dónde enviamos tus datos</strong></h2>



                            <p>Los comentarios de los visitantes pueden verificarse a través de un servicio automatizado de detección
                                de spam.</p>
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
        name: "PoliticaPrivacidad"
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