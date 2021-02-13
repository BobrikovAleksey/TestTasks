<template>
  <div class="testing">
    <el-row>
      <TestingField></TestingField>
    </el-row>

    <el-row>

    </el-row>
  </div>
</template>

<script>
import TestingField from '@/components/TestingField.vue';

export default {
  name: 'Testing',
  components: {
    TestingField,
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style lang="scss">
.home {
  &__button {
    margin: 32px auto;
  }

  &__description {
    margin-bottom: 32px;
  }

  &__image {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__list {
    margin-left: 20px;
  }

  &__text {
    margin-top: 10px;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__fingers-image img {
    width: auto;
    max-height: 125px;
  }

  &__keyboard-image img {
    width: auto;
    max-height: 250px;
  }

  &__man-image img {
    max-width: 150px;
    height: auto;
  }

  &__pose-image img {
    max-width: 200px;
    height: auto;
  }
}

.el-collapse-item {
  &__header {
    font-size: 16px;
    font-weight: 600;
  }

  &__content {
    font-size: 14px;
  }
}

.el-row {
  padding: 16px;
}
</style>
