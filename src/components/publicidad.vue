<template>
    <div id="contPubl">
        <!-- Composite Start --
        <div id="M350151ScriptRootC258136">
            <div id="M350151PreloadC258136"></div>
        </div>
        <div id="BBSLOT"></div>
        -->
        <iframe id="iframePublicidad" width="310px" height="620px" frameborder="none"></iframe>
    </div>
</template>

<script>
    export default {
        name: "publicidad",
        methods: {
            crearPublicidad (ifrm) {
                const ifrmC = ifrm.contentDocument || ifrm.contentWindow.document ;
                const ifrmW = ifrm.contentWindow;

                // Codigo de publicidad 2

                const cssIfr = `body {padding: 0; margin: 0} img { width: 100% !important; } div {border-radius: 15px}`;
                const estilos = ifrmC.createElement("style");
                estilos.innerHTML = cssIfr;
                ifrmC.head.appendChild(estilos);

                if (!ifrmW.BB_a) {
                    ifrmW.BB_a = [];
                }
                if (!ifrmW.BB_ind) {
                    ifrmW.BB_ind = 0;
                }
                if (!ifrmW.BB_r) {
                    ifrmW.BB_r = Math.floor(Math.random() * 1000000000)
                }
                ifrmW.BB_ind++;
                ifrmW.BB_a.push({"pl": 2004572, "index": ifrmW.BB_ind});

                let scriptElem = ifrmC.createElement("script");
                scriptElem.async = true;
                scriptElem.setAttribute("data-cfasync", "false");
                // scriptElem.id = `BBSLOT${window.BBr + window.BBind}`;
                scriptElem.id = `BBSLOT`;
                scriptElem.src = `//st.bebi.com/bebi_v3.js`;

                ifrmC.body.appendChild(scriptElem);
            }
        },
        created() {
            /* Codigo para la publicidad 1 *
            const reIntentar = setInterval(() => {
                try {
                    var D = new Date(), d = document, b = 'body', ce = 'createElement', ac = 'appendChild', st = 'style',
                        ds = 'display', n = 'none', gi = 'getElementById', lp = d.location.protocol,
                        wp = lp.indexOf('http') == 0 ? lp : 'https:';
                    var i = d[ce]('iframe');
                    i['style']['display'] = 'none';
                    document.getElementById("M350151ScriptRootC258136").appendChild(i);
                    try {
                        var iw = i.contentWindow.document;
                        iw.open();
                        iw.writeln("<ht" + "ml><bo" + "dy></bo" + "dy></ht" + "ml>");
                        iw.close();
                        var c = iw[b];
                    }
                    catch (e) {

                    }
                    // Originalmente esto iba en el catch. Por alguna razon, solo funciona el script si esto va aquí.
                    var iw = document;
                    var c = document.getElementById("M350151ScriptRootC258136");
                    //* Fin
                    var dv = iw[ce]('div');
                    dv.id = "MG_ID";
                    dv[st][ds] = n;
                    dv.innerHTML = 258136;
                    c.appendChild(dv);
                    var s = iw[ce]('script');
                    s.async = 'async';
                    s.defer = 'defer';
                    s.charset = 'utf-8';
                    s.src = wp + "//jsc.mgid.com/a/c/acechanime.com.258136.js?t=" + D.getYear() + D.getMonth() + D.getUTCDate() + D.getUTCHours();
                    c.appendChild(s);
                    clearInterval(reIntentar);
                } catch (e) {
                    console.log("Error al cargar la publicidad. Reintentando...");
                }
            }, 500);
            */

            let intervalo = setInterval(() => {
                const ifrm = document.getElementById("iframePublicidad");
                if (ifrm) {
                    try {
                        this.crearPublicidad(ifrm);
                    } finally {
                        clearInterval(intervalo);
                    }
                }
            }, 500);

        }
    }
</script>

<style scoped lang="sass">

    #contPubl
        overflow: hidden

    .iframePublicidad
        overflow: hidden
        width: 100% !important

    .rec
        font-family: "Fira Code", monospace
        font-variant-ligatures: discretionary-ligatures

    //

</style>