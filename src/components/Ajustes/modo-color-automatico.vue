<template lang="pug">
    div.contenedor-ajuste
        div.modo-color(@click="alternarModoColorAutomatico")
            div.ajuste
                div.titulo-ajuste Cambio de color automático
            div.ajuste-switch
                div
                    label.cl-switch.cl-switch-red
                        input(type="checkbox" :checked="modoColorAutomaticoActivo")
                        span.switcher(@click.prevent.stop="alternarModoColorAutomatico")
        div.opciones(v-if="modoColorAutomaticoActivo")
            p Cambiar al modo claro a las:
            vue-time-picker(format="hh:mm a" :minute-interval="10" v-model="horaClaro")
            p Cambiar al modo oscuro a las:
            vue-time-picker(format="hh:mm a" :minute-interval="10" v-model="horaOscuro")

    //
</template>

<script lang="coffee">
    import VueTimePicker from "vue2-timepicker/src/vue-timepicker.vue"

    strASegundos = (horaStr) =>
        [_, horas, minutos, ampm] = /(\d\d):(\d\d)\s(\w\w)/.exec horaStr
        segundosHoras =
            if horas is "12" then 0
            else (parseInt horas) * 3600

        segundosMinutos = (parseInt minutos) * 60

        segundosHoras + segundosMinutos + (if ampm is "pm" then 43200 else 0)


    segundosAStr = (segundos) =>
        ampm = "am"
        if segundos >= 43200
            ampm = "pm"
            segundos = segundos - 43200

        horasInt = Math.floor (segundos / 3600)
        horas = horasInt.toString()
        minutos = ((segundos - horasInt * 3600) / 60).toString()

        horas =
                if horas is "0" then horas = "12"
                else if horas.length is 1 then horas = "0" + horas
                else horas
        minutos = if minutos.length is 2 then minutos else "0" + minutos

        "#{horas}:#{minutos} #{ampm}"


    export default
        name: "modo-color-automatico"
        components: { VueTimePicker }
        data: ->
            horaClaro: segundosAStr ((localStorage.getItem "segundos-claro-auto") ? 25200)
            horaOscuro: segundosAStr ((localStorage.getItem "segundos-oscuro-auto") ? 64800)
        watch:
            horaClaro: (nuevo, viejo) ->
                segundos = strASegundos nuevo
                localStorage.setItem "segundos-claro-auto", segundos

            horaOscuro: (nuevo) ->
                segundos = strASegundos nuevo
                localStorage.setItem "segundos-oscuro-auto", segundos

        computed:
            modoColorAutomaticoActivo: -> @$store.state.datos.modoColorAutomatico
        methods:
            alternarModoColorAutomatico: ->
                @$store.commit "cambiarModoColorAutomatico"



#
</script>

<style scoped lang="sass">

    .opciones
        padding-left: 10px
        border-left: solid 1px gray
    
    //
</style>