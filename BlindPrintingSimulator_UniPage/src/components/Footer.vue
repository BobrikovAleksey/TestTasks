<template>
  <el-footer class="footer">
    <p class="footer__text">
      <i class="fa fa-envelope-o footer__icon"></i> bobrikov.aleksey.1987@yandex.ru
    </p>

    <el-link type="warning" :href="link">
      <i class="fa fa-github footer__icon"></i> GitHub-репозиторий
    </el-link>

    <p class="footer__text">
      Пользуйтесь тренажером на здоровье :)
    </p>
  </el-footer>
</template>

<script>
export default {
  name: 'Footer',

  data: () => ({
    link: 'https://github.com/BobrikovAleksey/TestTasks/tree/master/BlindPrintingSimulator_UniPage',
  }),
};
</script>

<style lang="scss">
.footer {
  color: snow;
  background: #545c64;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &__text {
    display: flex;
    align-items: center;
  }

  &__icon {
    font-size: 18px;
    margin-right: 6px;
  }
}
</style>
