<template lang="pug">
    div
        div.login
            h1.titulo-login Inicia Sesión
            br
            form.form-login(@submit.prevent="iniciarSesion")
                div.campo
                    input#login-correo.entrada-login(
                        type="email"
                        placeholder="Correo electrónico"
                        autocomplete="off"
                        required
                        v-model="correo"
                    )
                    label#label-correo.label-login(for="login-correo") Correo electrónico
                div.campo
                    input#login-contrasena.entrada-login(
                        pattern="(.).{7,}"
                        type="password"
                        placeholder="Contraseña"
                        autocomplete="off"
                        required
                        v-model="contrasena"
                    )
                    label#label-contrasena.label-login(for="login-contrasena") Contraseña
                p.aviso(v-html="aviso")
                input.boton-login(type="submit" :value="textoBoton" :disabled="botonDesactivado")
            div.mini-separador
            p ¿Aun no tienes una cuenta?
            p.cambio-registro(@click="cambiarARegistro") Regístrate


    //
</template>

<script lang="coffee">
    import { servidor } from "../../coffee/variables.coffee"

    export default
        name: "inicio-sesion"
        data: ->
            correo: ""
            contrasena: ""
            aviso: ""
            textoBoton: "Iniciar sesión"
            botonDesactivado: false
        props:
            cambiarARegistro:
                type: Function
                required: true
        methods:
            reiniciarBoton: ->
                @textoBoton = "Iniciar sesión"
                @botonDesactivado = false
            manejarOk: (respuesta) ->
                datos = await respuesta.json()
                @$store.commit "usuario/registrarUsuarioActual", datos
                @reiniciarBoton()
                @$router.push "/"

            manejarErrorComun: ->
                @aviso = "El correo o la contraseña son inválidos."
                @reiniciarBoton()
            manejarError: ->
                @aviso = "Hubo un error al iniciar sesión.<br>Intentalo de nuevo más tarde."
                @reiniciarBoton()
            iniciarSesion: ->
                @textoBoton = "Iniciando Sesión..."
                @botonDesactivado = true

                vm = this

                try
                    respuesta = await fetch "#{servidor}/usuarios/login",
                        method: "POST"
                        headers:
                            "Content-Type": "application/json"
                        body: JSON.stringify
                            email: vm.correo
                            password: vm.contrasena

                    if respuesta.ok is true then @manejarOk respuesta
                    else
                        switch respuesta.status
                            when 400, 401, 404 then @manejarErrorComun()
                            else
                                console.error respuesta
                                throw new Error "Error en peticion de inicio de sesión."
                catch e
                    console.error "Error al iniciar sesión."
                    console.error e
                    @manejarError()


#
</script>

<style scoped lang="sass">

    .aviso
        color: #ff2c31
        white-space: normal


    .boton-login
        margin: 0.5em 1em
        padding: 0.5em 0.75em
        border-radius: 3px
        border: none
        user-select: none
        text-decoration: none
        font:
            family: "Product Sans", sans-serif
            size: 1em
        background-color: var(--colorPrincipal)
        color: white
        cursor: pointer


    .cambio-registro
        text-decoration: underline
        cursor: pointer


    .login
        padding: 2em
        display: inline-block
        border: solid 1px var(--texto1)
        border-radius: 3px
        text-align: center
        background-color: var(--fondo1)
        font-size: 1em


    .form-login label
        color: var(--texto2)
        font-family: "Product Sans", sans-serif


    .campo
        padding: 1.5em 0
        position: relative


    .label-login
        cursor: text
        transition: top 250ms, left 250ms, font-size 250ms, color 250ms
        user-select: none
        position: absolute
        top: 2.5em
        left: 1em


    .entrada-login
        width: 20em
        border: solid 2px var(--texto2)
        border-radius: 3px
        padding: 1em
        background-color: var(--fondo1)
        font-size: large
        color: var(--texto1)
        transition: border-color 100ms ease-in-out

        &::placeholder
            color: transparent

        &:focus
            outline: none
            border-color: var(--colorPrincipal)

        &:invalid:not(:focus):not(:placeholder-shown)
            border-color: #ff2c31

        &:focus + label
            color: var(--colorPrincipal)
            top: 0.25em
            left: 0.5em
            font-size: 0.8em

        &:not(:placeholder-shown) + label
            top: 0.25em !important
            left: 0.5em !important
            font-size: 0.8em !important


    .mini-separador
        height: 2em


    @media only screen and (max-width: 600px)
        .login
            padding: 1em

        .campo
            padding: 0.75em 0

        .entrada-login
            width: 100%
            padding: 0.75em
            font-size: 1em
            &:focus + label
                top: -0.5em
                left: 0.5em
            &:not(:placeholder-shown) + label
                top: -0.5em !important


        .label-login
            cursor: text
            transition: top 250ms, left 250ms, font-size 250ms, color 250ms
            user-select: none
            position: absolute
            top: 1.65em
            left: 1em

        .mini-separador
            height: 0.75em


    //
</style>