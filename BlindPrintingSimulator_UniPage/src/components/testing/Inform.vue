<template>
  <el-col class="inform" :span="4">
    <h3 class="inform__label inform__label_timer">Скорость</h3>

    <p class="inform__value">{{ speedAsStr }} <span>зн./мин</span></p>

    <h3 class="inform__label inform__label_target">Точность</h3>

    <p class="inform__value">{{ accuracyAsStr }}</p>

    <el-progress class="inform__progress" type="dashboard" :stroke-width="8"
                 :percentage="percentage" :color="colors"
                 :status="isCompleted && 'success' || ''"></el-progress>

    <el-button class="inform__button" type="warning" icon="el-icon-refresh-right"
               :loading="isLoading" @click="resetTest">
      {{ isLoading && 'Обновление' || 'Заново' }}
    </el-button>
  </el-col>
</template>

<!--suppress JSAnnotator -->
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Params',

  data: () => ({
    colors: [
      { color: '#E6A23C', percentage: 99 },
      { color: '#67C23A', percentage: 100 },
    ],
  }),

  methods: {
    ...mapActions({
      fetchText: 'testing/fetchText',
      resetTestBase: 'testing/resetTest',
    }),

    resetTest() {
      this.resetTestBase();
      this.fetchText();
    },
  },

  computed: {
    ...mapGetters({
      isError: 'testing/isError',
      isLoading: 'testing/isLoading',
      accuracyAsStr: 'testing/getAccuracyAsStr',
      speedAsStr: 'testing/getSpeedAsStr',
      percentage: 'testing/getPercentage',
      isCompleted: 'testing/isCompletedTest',
    }),
  },
};
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss">
.inform {
  width: 100%;
  min-width: 150px;
  padding: 24px 24px 24px 0;

  &__button {
    width: 100%;
    margin-top: 24px;
  }

  &__label {
    color: #909399;
    text-transform: uppercase;
    display: flex;
    align-items: center;

    &:before {
      content: "";
      width: 23px;
      height: 23px;
      display: inline-block;
      padding-right: 10px;
    }

    &_timer:before {
      background: url("/images/icons/i-timer.png") no-repeat;
    }

    &_target {
      margin-top: 24px;

      &:before {
        background: url("/images/icons/i-target.png") no-repeat;
      }
    }
  }

  &__progress {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;

    & .el-progress__text span {
      color: #909399;
      font-size: 18px;
      font-weight: 600;
    }

    & .el-icon-check {
      font-size: 32px;
    }
  }

  &__value {
    font-size: 28px;

    span {
      font-size: 0.5em;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
}
</style>
