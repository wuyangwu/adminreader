<template>
  <div id="app">
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
  @import "./assets/style/globak.scss";
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
