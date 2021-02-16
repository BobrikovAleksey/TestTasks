<template>
  <el-menu background-color="inherit" text-color="#FFF" active-text-color="#FFD04B" router
           mode="horizontal" :default-active="current">
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
