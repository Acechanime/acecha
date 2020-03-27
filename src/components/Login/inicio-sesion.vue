<template lang="pug">
    div
        div.login
            h1.titulo-login Inicia Sesión
            br
            form.form-login(@submit.prevent)
                div.campo
                    input#login-correo.entrada-login(
                        type="email"
                        placeholder="Correo electrónico"
                        autocomplete="off"
                        required
                    )
                    label#label-correo.label-login(for="login-correo") Correo electrónico
                div.campo
                    input#login-contrasena.entrada-login(
                        pattern="(.).{7,}"
                        type="password"
                        placeholder="Contraseña"
                        autocomplete="off"
                        required
                    )
                    label#label-contrasena.label-login(for="login-contrasena") Contraseña
                input(type="submit" value="Iniciar sesión")

    //
</template>

<script lang="coffee">

    export default
        name: "inicio-sesion"
    
#
</script>

<style scoped lang="sass">

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