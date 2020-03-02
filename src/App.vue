<template>
  <div id="app">
    <vue-particles color="#409EFF"
                   :particleOpacity="0.9"
                   :particlesNumber="20"
                   shapeType="circle"
                   :particleSize="4"
                   linesColor="#409EFF"
                   :linesWidth="1"
                   :lineLinked="true"
                   :lineOpacity="0.7"
                   :linesDistance="150"
                   :moveSpeed="5"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="true"
                   clickMode="push"></vue-particles>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss" scoped>
  /*@import "./assets/style/gol";*/
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #particles-js {
      width: 100%;
      height: calc(100% - 100px);
      position: absolute;
      overflow: hidden;
    }
  }
</style>
