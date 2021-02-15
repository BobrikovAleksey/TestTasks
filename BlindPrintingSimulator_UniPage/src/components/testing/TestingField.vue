<template>
  <div class="testing-field">
    <el-col class="testing-field__column testing-field__text" :span="20">
      <span class="testing-field__char" v-for="(chr, i) in text" :key="i"
            :class="{ 'testing-field__char_active': activeChar === i,
                      'testing-field__char_complete': activeChar > i,
                      'testing-field__char_mistake': activeChar === i & mistake.check }">
        {{ chr }}
      </span>
    </el-col>

    <el-col class="testing-field__column testing-field__column_right" :span="4">
      <h3 class="testing-field__label">Скорость</h3>

      <p class="testing-field__value">{{ getSpeedAsStr }} <span>зн./мин</span></p>

      <h3 class="testing-field__label testing-field__label_top">Точность</h3>

      <p class="testing-field__value">{{ getAccuracyAsStr }}</p>

      <el-progress class="testing-field__progress" type="dashboard" :stroke-width="8"
                   :status="getPercentage === 100 && 'success' || ''"
                   :percentage="getPercentage" :color="colors"></el-progress>

      <el-button class="testing-field__refresh" type="warning" icon="el-icon-refresh-right"
                 :loading="isLoading" @click="refreshTest">
        {{ isLoading && 'Обновление' || 'Заново' }}
      </el-button>
    </el-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TestingField',

  props: {
    isTest: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      activeChar: 0,
      isWarningLanguage: false,
      colors: [
        { color: '#E6A23C', percentage: 99 },
        { color: '#67C23A', percentage: 100 },
      ],
      mistake: {
        check: false,
        counter: 0,
      },
      timer: {
        id: null,
        start: 0,
        end: 0,
      },

      handleKeyDown: this.handleKeyDownForBind.bind(this),
      tikTak: this.tikTakForBind.bind(this),
    };
  },

  methods: {
    ...mapActions({
      fetchText: 'fetchText',
    }),

    /**
     * Выводит сообщение об ошибке с раскладкой
     */
    getWarningLanguage() {
      if (this.isWarningLanguage) return;

      this.$message({
        message: 'Пожалуйста, смените раскладку клавиатуры на русскую',
        type: 'warning',
        // eslint-disable-next-line
        onClose: function () {
          this.isWarningLanguage = false;
        }.bind(this),
      });

      this.isWarningLanguage = true;
    },

    /**
     * Обрабатывает нажатие клавиши в документе (навешивается на document через bind(this))
     */
    handleKeyDownForBind(event) {
      if (!this.isTest
        || this.activeChar >= this.text.length
        || event.key.length > 1) return;

      if (/[A-Za-z]{1}/.test(event.key)) {
        this.getWarningLanguage();
        return;
      }

      if (!this.timer.id) this.startTimer();

      if (event.key === this.text[this.activeChar]
        || (this.text[this.activeChar] === 'ё' && event.key === 'е')) {
        this.activeChar += 1;
        this.mistake.check = false;
        if (this.activeChar === this.text.length) this.stopTimer();
        return;
      }

      if (!this.mistake.check) {
        this.mistake.check = true;
        this.mistake.counter += 1;
      }
    },

    /**
     * Обрабатывает один шаг счетчика времени - таймера (навешивается на interval через bind(this))
     */
    tikTakForBind() {
      this.timer.end = new Date();
    },

    refreshTest() {
      this.activeChar = 0;
      this.stopTimer();
      this.fetchText();
    },

    /**
     * Устанавливает счетчик времени - таймер
     */
    startTimer() {
      this.timer.id = true;
      this.timer.start = new Date();
      this.timer.end = this.timer.start;
      this.timer.id = setInterval(this.tikTak, 1000);
    },

    /**
     * Отключает счетчик времени - таймер
     */
    stopTimer() {
      if (!this.timer.id) return;
      clearInterval(this.timer.id);
      this.timer.id = null;
    },
  },

  computed: {
    ...mapGetters({
      text: 'getTextValue',
      error: 'getTextError',
      isLoading: 'isLoadingText',
    }),

    getAccuracy() {
      const result = (this.text.length - this.mistake.counter) / this.text.length;
      return result && !Number.isNaN(result) && Number.isFinite(result) ? result : 1;
    },

    getAccuracyAsStr() {
      return `${Math.floor(this.getAccuracy * 1000) / 10}%`;
    },

    getPercentage() {
      const result = this.activeChar / this.text.length;
      return result && !Number.isNaN(result) && Number.isFinite(result)
        ? Math.floor(result * 100) : 0;
    },

    getTimer() {
      return this.timer.end - this.timer.start;
    },

    getSpeed() {
      const result = (this.activeChar / this.getTimer) * 60000;
      return result && !Number.isNaN(result) && Number.isFinite(result) ? result : 0;
    },

    getSpeedAsStr() {
      return `${Math.floor(this.getSpeed)}`;
    },
  },

  mounted() {
    this.fetchText();
    document.addEventListener('keydown', this.handleKeyDown);
  },

  unmounted() {
    this.stopTimer();
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style scoped lang="scss">
.testing-field {
  width: 100%;
  max-width: 1024px;
  min-height: 256px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 0 auto;

  &__column {
    width: 100%;
    padding: 24px 48px;

    &_right {
      min-width: 150px;
      padding-left: 0;
      padding-right: 24px;
    }
  }

  &__label {
    color: #909399;
    text-transform: uppercase;

    &_top {
      margin-top: 16px;
    }
  }

  &__progress {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  &__refresh {
    width: 100%;
    margin-top: 24px;
  }

  &__text {
    font-size: 21px;
    line-height: 32px;
  }

  &__value {
    font-size: 32px;

    span {
      font-size: 0.5em;
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  &__char {
    border-width: 1px;
    border-style: solid;
    border-color: white;
    border-radius: 2px;

    &_complete {
      color: #5BC538;
    }

    &_active {
      background: rgba(#5BC538, 0.8);
      border-color: #5BC538;
      padding: 0 2px;
    }

    &_mistake {
      background: rgba(#F36747, 0.8);
      border-color: #F36747;
    }
  }
}
</style>
