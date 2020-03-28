<template lang="pug">
    div
        div.login(v-if="registroExitoso")
            p Tu cuenta ha sido registrada con éxito y has iniciado sesión.
            br
            p Confirma tu correo electrónico para acceder a todas las funciones.
            br
            router-link(to="/") Ir al inicio

        div.login(v-else)
            h1.titulo-login Regístrate
            br
            form.form-login(@submit.prevent="registrarUsuario")
                div.campo
                    input#reg-correo.entrada-reg(
                        type="email"
                        placeholder="Correo electrónico"
                        autocomplete="off"
                        required
                        v-model="correo"
                    )
                    label#label-reg-correo.label-reg(for="reg-correo") Correo electrónico

                div.campo
                    input#reg-usuario.entrada-reg(
                        type="text"
                        placeholder="Correo electrónico"
                        autocomplete="off"
                        required
                        v-model="usuario"
                    )
                    label#label-reg-usuario.label-reg(for="reg-usuario") Usuario
                    div.ayuda Tu nombre de usuario. Puedes cambiarlo luego.

                div.campo
                    input#reg-contrasena.entrada-reg(
                        pattern="(.).{7,}"
                        type="password"
                        placeholder="Contraseña"
                        autocomplete="off"
                        required
                        v-model="contrasena"
                    )
                    label#label-reg-contrasena.label-reg(for="reg-contrasena") Contraseña
                    div.ayuda Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.
                p.aviso(v-html="aviso")
                input.boton-registro(type="submit" :value="textoBoton" :disabled="botonDesactivado")
            br
            br
            p ¿Ya tienes una cuenta?
            p.cambio-login(@click="cambiarALogin") Inicia Sesión

    //
</template>

<script lang="coffee">
    import { servidorv3 } from "../../variables"

    export default
        name: "registro"
        data: ->
            correo: ""
            usuario: ""
            contrasena: ""
            aviso: ""
            textoBoton: "Regístrate"
            botonDesactivado: false
            registroExitoso: false
        props:
            cambiarALogin:
                type: Function
                required: true
        methods:
            reiniciarBoton: ->
                @textoBoton = "Regístrate"
                @botonDesactivado = false
            validarContrasena: ->
                t1 = /[a-záóéúí]/.test @contrasena
                t2 = /[A-ZÁÓÉÚÍ]/.test @contrasena
                t3 = /\d/.test @contrasena

                t1 and t2 and t3

            manejarOk: (respuesta) ->
                usuario = await respuesta.json()
                @$store.commit "registrarUsuarioActual", usuario.payload
                @reiniciarBoton()
                @registroExitoso = true

            manejar400: ->
                @aviso = "El correo electrónico es inválido."
                @reiniciarBoton()

            manejar409: ->
                @aviso = "El correo electrónico es inválido."
                @reiniciarBoton()

            manejarError: ->
                @aviso = "Hubo un error al registrarte.<br>Intentalo de nuevo más tarde."
                @reiniciarBoton()

            registrarUsuario: ->
                unless @validarContrasena()
                    @aviso = "La contraseña no cumple con el formato."
                    return

                @textoBoton = "Registrando..."
                @botonDesactivado = true

                vm = this

                try
                    respuesta = await fetch "#{servidorv3}/usuarios",
                        method: "POST"
                        headers:
                            "Content-Type": "application/json"
                        body: JSON.stringify
                            email: vm.correo
                            nombre: vm.usuario
                            password: vm.contrasena

                    if respuesta.ok is true then @manejarOk respuesta
                    else if respuesta.status is 400 then @manejar400()
                    else if respuesta.status is 409 then @manejar409()
                    else
                        console.error respuesta
                        throw new Error "Error en peticion de registro."

                catch e
                    console.error "Error al registrar usuario."
                    console.error e
                    @manejarError()


#
</script>

<style scoped lang="sass">

    .aviso
        color: #ff2c31
        white-space: normal


    .boton-registro
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


    .boton-registro:disabled
        background-color: var(--texto1)
        color: var(--fondo0)


    .cambio-login
        text-decoration: underline
        cursor: pointer


    .ayuda
        font-size: small
        opacity: 0.75


    .login
        padding: 2rem
        display: inline-block
        border: solid 1px var(--texto1)
        border-radius: 3px
        text-align: center
        background-color: var(--fondo1)


    .form-login label
        color: var(--texto2)
        font-family: "Product Sans", sans-serif


    .campo
        padding: 1.5rem 0
        position: relative


    .label-reg
        cursor: text
        transition: top 250ms, left 250ms, font-size 250ms, color 250ms
        user-select: none
        position: absolute
        top: 2.5rem
        left: 1rem


    .entrada-reg
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