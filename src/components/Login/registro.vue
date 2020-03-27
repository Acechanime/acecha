<template lang="pug">
    div
        div.login
            h1.titulo-login Regístrate
            br
            form.form-login(@submit.prevent)
                div.campo
                    input#reg-correo.entrada-reg(
                        type="email"
                        placeholder="Correo electrónico"
                        autocomplete="off"
                        required
                    )
                    label#label-reg-correo.label-reg(for="reg-correo") Correo electrónico

                div.campo
                    input#reg-usuario.entrada-reg(
                        type="text"
                        placeholder="Correo electrónico"
                        autocomplete="off"
                        required
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
                    )
                    label#label-reg-contrasena.label-reg(for="reg-contrasena") Contraseña
                    div.ayuda Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.
                input(type="submit" value="Regístrate")

    //
</template>

<script lang="coffee">

    export default
        name: "registro"

#
</script>

<style scoped lang="sass">

    .ayuda
        font-size: small
        opacity: 0.75


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