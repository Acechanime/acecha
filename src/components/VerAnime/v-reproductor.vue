<template lang="pug">
    div.video-player-box(
        :playsinline="true"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @ready="playerReadied"
        @statechanged="playerStateChanged($event)"
        v-video-player:myVideoPlayer="options"
    )

    //
</template>

<script lang="coffee">

    export default
        name: "v-reproductor"
        props:
            options:
                type: Object
                required: true
        methods:
            onPlayerPlay: (player) ->
                # console.log('player play!', player)

            onPlayerPause: (player) ->
                # console.log('player pause!', player)

            onPlayerEnded: (player) ->
                # console.log('player ended!', player)

            onPlayerLoadeddata: (player) ->
                # console.log('player Loadeddata!', player)

            onPlayerWaiting: (player) ->
                # console.log('player Waiting!', player)

            onPlayerPlaying: (player) ->
                # console.log('player Playing!', player)

            onPlayerTimeupdate: (player) ->
                # console.log('player Timeupdate!', player.currentTime())

            onPlayerCanplay: (player) ->
                # console.log('player Canplay!', player)

            onPlayerCanplaythrough: (player) ->
                # console.log('player Canplaythrough!', player)

            # or listen state event
            playerStateChanged: (playerCurrentState) ->
                console.log('player current update state', playerCurrentState)

            # player is ready
            playerReadied: (player) ->
                console.log('example 01: the player is readied', player)



#
</script>

<style scoped lang="sass">


    //
</style>
