<template>
  <div class="testing">
    <vContent v-show="!isTest" :goToTest="goToTest"></vContent>

    <div v-show="isTest">
      <el-row>
        <vField :isTest="isTest"></vField>
      </el-row>

      <el-row>
        <div class="testing__settings">
          <p>Количество предложений</p>

          <el-slider :step="1" :min="3" :max="7" show-stops v-model="volume"></el-slider>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import vContent from '@/components/testing/Content.vue';
import vField from '@/components/testing/Field.vue';

export default {
  name: 'Testing',

  components: {
    vContent,
    vField,
  },

  data() {
    return {
      isTest: false,
      volume: 5,
    };
  },

  methods: {
    goToTest() {
      this.isTest = true;
    },
  },
};
</script>

<style lang="scss">
.testing {
  &__settings {
    width: 768px;
    margin: 0 auto;
  }

  .el-slider {
    &__bar {
      background: #E6A23C;
    }

    &__button {
      border-color: #E6A23C;
    }
  }
}
</style>
