<template lang="pug">
    div
        div.separador
        div.contenedor-login
            div.login
                h1.titulo-login Inicia Sesión
                br
                form.form-login(@submit.prevent)
                    div.campo
                        input#login-correo(
                            type="email"
                            placeholder="Correo electrónico"
                            autocomplete="off"
                            required
                            @input="enInputCorreo($event)"
                        )
                        label#label-correo(
                            for="login-correo"
                            :class="claseHayEmail"
                        ) Correo electrónico
                    div.campo
                        input#login-contrasena(
                            type="password"
                            placeholder="Contraseña"
                            autocomplete="off"
                            required
                            @input="enInputContrasena($event)"
                        )
                        label#label-contrasena(
                            for="login-contrasena"
                            :class="claseHayContrasena"
                        ) Contraseña


    //
</template>

<script lang="coffee">

    export default
        name: "Login"
        data: ->
            hayEmail: false
            hayContrasena: false
        computed:
            claseHayEmail: -> if @hayEmail then "hay-email" else ""
            claseHayContrasena: -> if @hayContrasena then "hay-contrasena" else ""
        methods:
            enInputCorreo: (ev) -> @hayEmail = ev.target.value isnt ""
            enInputContrasena: (ev) -> @hayContrasena = ev.target.value isnt ""


#
</script>

<style scoped lang="sass">

    .contenedor-login
        text-align: center
        padding-top: 5rem
        color: var(--texto1)


    .titulo-login
        font-family: "Product Sans", sans-serif


    .login
        padding: 2rem
        display: inline-block
        border: solid 1px var(--texto1)
        border-radius: 3px


    .form-login
        text-align: left
        label
            color: var(--texto2)
            font-family: "Product Sans", sans-serif


    .campo
        padding: 2rem 0
        position: relative


    #label-correo, #label-contrasena
        transition: top 250ms, left 250ms, font-size 250ms, color 250ms
        user-select: none
        position: absolute
        top: 3rem
        left: 1rem


    #login-correo, #login-contrasena
        width: 20rem
        border: solid 2px var(--texto2)
        border-radius: 3px
        padding: 1rem
        background-color: var(--fondo1)
        font-size: large
        color: var(--texto1)
        transition: border-color 100ms ease-in-out
        &::placeholder
            color: transparent
        &:focus
            outline: none
            border-color: var(--first-color)


    #login-correo:invalid:not(:focus):not(:placeholder-shown)
        border-color: #ff2c31


    #login-correo:focus ~ #label-correo
        color: var(--first-color)
        top: 0.5rem
        left: 0.5rem
        font-size: 0.8rem


    #login-contrasena:focus ~ #label-contrasena
        color: var(--first-color)
        top: 0.5rem
        left: 0.5rem
        font-size: 0.8rem


    .hay-email, .hay-contrasena
        top: 0.5rem !important
        left: 0.5rem !important
        font-size: 0.8rem !important


    //
</style>