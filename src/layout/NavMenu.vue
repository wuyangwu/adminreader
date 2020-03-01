<template>
  <div>
    <div v-for="(item, i ) in NavMenus" :key="i">
      <div v-if="!item.children">
        <el-menu-item :index="item.path" >
          <i class="el-icon-setting"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>
      <div v-else-if="item.children">
        <el-submenu :index="item.path" >
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span v-show="!isCollapse" slot="title">{{item.name}}</span>
          </template>
          <!--递归操作-->
          <nav-menu :nav-menus="item.children"></nav-menu>
        </el-submenu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    NavMenus: Array,
    fontsizelist: Array,
    isCollapse: Boolean
  },
  mounted () {
    console.log(this.NavMenus)
  }
}
</script>

<style scoped>

</style>
