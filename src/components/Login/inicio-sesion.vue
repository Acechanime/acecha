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
            br
            br
            p ¿Aun no tienes una cuenta?
            p.cambio-registro(@click="cambiarARegistro") Regístrate


    //
</template>

<script lang="coffee">
    import { servidorv3 } from "../../variables"

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
                @$store.commit "registrarUsuarioActual", datos.payload
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
                    respuesta = await fetch "#{servidorv3}/usuarios/login",
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
        margin: 0.5rem 1rem
        padding: 0.5rem 0.75rem
        border-radius: 3px
        border: none
        user-select: none
        text-decoration: none
        font:
            family: "Product Sans", sans-serif
            size: 1rem
        background-color: var(--first-color)
        color: white
        cursor: pointer


    .cambio-registro
        text-decoration: underline
        cursor: pointer


    .login
        padding: 2rem
        display: inline-block
        border: solid 1px var(--texto1)
        border-radius: 3px
        text-align: center


    .form-login label
        color: var(--texto2)
        font-family: "Product Sans", sans-serif


    .campo
        padding: 1.5rem 0
        position: relative


    .label-login
        cursor: text
        transition: top 250ms, left 250ms, font-size 250ms, color 250ms
        user-select: none
        position: absolute
        top: 2.5rem
        left: 1rem


    .entrada-login
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

        &:invalid:not(:focus):not(:placeholder-shown)
            border-color: #ff2c31

        &:focus + label
            color: var(--first-color)
            top: 0.25rem
            left: 0.5rem
            font-size: 0.8rem

        &:not(:placeholder-shown) + label
            top: 0.25rem !important
            left: 0.5rem !important
            font-size: 0.8rem !important


    
    //
</style>