<template>
    <div id="apps">
        <lottie :options="defaultOptions"  :width="400" :height="400" v-on:animCreated="handleAnimation" />
<!--        <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>-->
        <div>
            <p>Speed: x{{animationSpeed}}</p>
            <input type="range" value="1" min="0" max="3" step="0.5"
                   v-on:change="onSpeedChange" v-model="animationSpeed">
        </div>
        <button v-on:click="stop">stop</button>
        <button v-on:click="pause">pause</button>
        <button v-on:click="play">play</button>
    </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import animationData from '../../assets/pinjump'

  export default {
    name: 'app',
    components: {
      lottie: Lottie
    },
    data() {
      return {
        defaultOptions: { animationData: animationData, loop: true, autoplay: true },
        defaultAnim: '',
        // defaultOptions: { animationData: animationData, loop: false, autoplay: false },
        animationSpeed: 1
      }
    },
    methods: {
      handleAnimation (anim) {
        this.defaultAnim = anim
      },

      stop: function () {
        this.defaultAnim.stop()
      },

      play: function () {
        this.defaultAnim.play()
      },

      pause: function () {
        this.defaultAnim.pause()
      },

      onSpeedChange: function () {
        this.defaultAnim.setSpeed(this.animationSpeed)
      }
    }
  }
</script>
<style scoped>
    #apps{
        position: relative;
    }
</style>
