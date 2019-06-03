<template lang="pug">
    div.contenedor.row.eps
        episodio(v-for="(ep, i) in episodios" :ep="ep" :key="i")
    //
</template>

<script lang="coffee">
    import Episodio from "../../components/Inicio/episodio";

    export default
        name: "episodios"
        components:
            episodio: Episodio
        data: ->
            episodios: [
                    nombre: 'Mob Psycho 100 II 9',
                    img: 'https://i0.wp.com/acechanime.com/wp-content/uploads/2019/02/mob-psycho-100-one-mangaka-realizza-uno-sketch-tema-halloween-v4-349709-1280x720.jpg?resize=768%2C432&ssl=1'
                ,
                    nombre: 'Yakusoku no Neverland 8',
                    img: 'https://i0.wp.com/acechanime.com/wp-content/uploads/2019/02/il-primo-episodio-the-promised-neverland-ora-disponibile-vvvvid-v3-359127-1280x720.jpg?resize=768%2C432&ssl=1'
                ,
                    nombre: 'My Roommate is a Cat 8',
                    img: 'https://i0.wp.com/acechanime.com/wp-content/uploads/2019/02/Roomate.jpg?resize=768%2C432&ssl=1'
                ,
                    nombre: 'Tate no Yuusha no Nariagari 8',
                    img: 'https://i0.wp.com/acechanime.com/wp-content/uploads/2019/02/qSgBzXdu6QwVVeqOYOlHolkLRxZ.jpg?resize=768%2C432&ssl=1'
                ,
                    nombre: 'Domestic Na Kanojo 8',
                    img: 'https://i1.wp.com/acechanime.com/wp-content/uploads/2019/02/domestic-33-1.jpg?resize=768%2C432&ssl=1'
                ,
                    nombre: 'Hundred 12',
                    img: 'https://i1.wp.com/acechanime.com/wp-content/uploads/2019/02/da52lil-5f044c87-298b-495b-b108-59e030e9d69e.jpg?resize=768%2C432&ssl=1'
                ,
                    nombre: 'Inou Battle wa Nichijou-kei... 12',
                    img: 'https://i1.wp.com/acechanime.com/wp-content/uploads/2019/02/1429cc782a845928.jpg?resize=768%2C427&ssl=1'
                ,
                    nombre: 'Dororo 8',
                    img: 'https://i1.wp.com/acechanime.com/wp-content/uploads/2019/02/dororo-anime-del-2019-trailer-1.jpg?resize=768%2C432&ssl=1'
            ]
    #
</script>

<style scoped lang="sass">

</style>