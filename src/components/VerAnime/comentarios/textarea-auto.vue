<template lang="pug">
    div.contenedor-textarea-auto
        textarea.txta(:placeholder="placeholder" :value="value"
            @input="$emit('input', $event.target.value)")

    //
</template>

<script lang="coffee">

    export default
        name: "textarea-auto"
        props:
            placeholder:
                type: String
                required: true
            value:
                type: String
                required: true
        mounted: ->
            elemento = @$el.firstChild
            hiddenDiv = document.createElement "div"
            content = null

            elemento.classList.add "txtstuff"
            hiddenDiv.classList.add "txta"
            hiddenDiv.style.display = "none"
            hiddenDiv.style.whiteSpace = "pre-wrap"
            hiddenDiv.style.wordWrap = "break-word"

            i = elemento
            i.addEventListener "input", () =>
                # Append hiddendiv to parent of textarea, so the size is correct
                i.parentNode.appendChild hiddenDiv

                # Remove this if you want the user to be able to resize it in modern browsers
                i.style.resize = 'none';

                # This removes scrollbars
                i.style.overflow = 'hidden';

                # Every input/change, grab the content
                content = i.value;

                # Add the same content to the hidden div

                # This is for old IE
                content = content.replace(/\n/g, '<br>');

                # The <br ..> part is for old IE
                # This also fixes the jumpy way the textarea grows if line-height isn't included
                hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">'

                # Briefly make the hidden div block but invisible
                # This is in order to read the height
                hiddenDiv.style.visibility = 'hidden';
                hiddenDiv.style.display = 'block';
                i.style.height = hiddenDiv.offsetHeight + 'px';

                # Make the hidden div display:none again
                hiddenDiv.style.visibility = 'visible';
                hiddenDiv.style.display = 'none';


#
</script>

<style scoped lang="sass">

    .txta
        width: 100%
        min-height: 3rem
        overflow: hidden
        line-height: 1.4
        background-color: var(--fondo0)
        color: var(--texto1)
        padding: 0.5rem
        border-radius: 3px
        resize: none

    
    //
</style>