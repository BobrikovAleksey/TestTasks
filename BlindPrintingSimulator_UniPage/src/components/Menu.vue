<template>
  <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="inherit"
           mode="horizontal" class="el-menu-demo" router :default-active="current">
    <el-menu-item index="/">
      <router-link to="/">ОБУЧЕНИЕ</router-link>
    </el-menu-item>

    <el-menu-item index="/testing">
      <router-link to="/testing">ТЕСТИРОВАНИЕ</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',

  data: () => ({
    current: null,
  }),

  watch: {
    $route(to) {
      this.current = to.path;
    },
  },
};
</script>

<style lang="scss">

</style>
