<template>
  <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="inherit"
           mode="horizontal" class="el-menu-demo" router :default-active="current">
    <el-menu-item index="home" route="/">
      <router-link to="/">ОБУЧЕНИЕ</router-link>
    </el-menu-item>

    <el-menu-item index="about" route="/test">
      <router-link to="/test">ТЕСТИРОВАНИЕ</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      current: 'home',
    };
  },
};
</script>

<style lang="scss">

</style>
