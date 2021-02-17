<template>
  <el-container class="site">
    <el-header class="header">
      <h1>Тренажер слепой печати</h1>
      <Menu></Menu>
    </el-header>

    <el-main class="content">
      <router-view/>
    </el-main>

    <Footer></Footer>
  </el-container>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Menu from '@/components/Menu.vue';

export default {
  components: {
    Footer,
    Menu,
  },

  mounted() {
    this.$router.push('/');
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Microsoft YaHei", sans-serif;
  color: #5C5C5C;
  font-size: 16px;
}

h1 {
  font-weight: 700;
  font-size: 24px;
}

h2 {
  font-weight: 600;
  font-size: 20px;
}

h3 {
  font-weight: 600;
  font-size: 18px;
}

a {
  text-decoration: none;
}

.button {
  text-transform: uppercase;
}

.content {
  height: 100%;
}

.site {
  min-width: 1024px;
  min-height: 100vh;
}

.header {
  color: snow;
  background: #545C64;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
