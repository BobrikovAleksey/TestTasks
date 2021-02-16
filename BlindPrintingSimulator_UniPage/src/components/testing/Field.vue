<template>
  <div class="test-field">
    <el-col class="test-field__column test-field__test-text" :span="20" v-show="!isSuccess">
      <span class="test-field__char" v-for="(char, index) in text" :key="index"
            :class="{ 'test-field__char_active': activeChar === index,
                      'test-field__char_complete': activeChar > index,
                      'test-field__char_mistake': activeChar === index & mistake.check }">
        {{ char }}
      </span>
    </el-col>

    <el-col class="test-field__column test-field__test-text" :span="20" v-show="isSuccess">
      <el-table class="test-field__table" :row-class-name="rowClassName" :data="stats"
                :empty-text="'Нет данных'">
        <el-table-column prop="certificate" label="сертификат"></el-table-column>
        <el-table-column prop="speed" label="скорость"></el-table-column>
        <el-table-column prop="accuracy.string" label="точность"></el-table-column>
        <el-table-column prop="textLength" label="длина текста"></el-table-column>
      </el-table>

      <el-row>
        <el-button class="test-field__clear" type="warning" icon="el-icon-delete"
                   @click="clear">{{ 'Удалить статистику' }}</el-button>
      </el-row>
    </el-col>

    <el-col class="test-field__column test-field__column_right" :span="4">
      <h3 class="test-field__label test-field__label_timer">Скорость</h3>

      <p class="test-field__value">{{ getSpeedAsStr }} <span>зн./мин</span></p>

      <h3 class="test-field__label test-field__label_target">Точность</h3>

      <p class="test-field__value">{{ getAccuracyAsStr }}</p>

      <el-progress class="test-field__progress" type="dashboard" :stroke-width="8"
                   :percentage="getPercentage" :color="colors"
                   :status="isSuccess && 'success' || ''"></el-progress>

      <el-button class="test-field__refresh" type="warning" icon="el-icon-refresh-right"
                 :loading="isLoading" @click="refreshTest">
        {{ isLoading && 'Обновление' || 'Заново' }}
      </el-button>
    </el-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Field',

  props: {
    isTest: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      activeChar: 0,
      colors: [
        { color: '#E6A23C', percentage: 99 },
        { color: '#67C23A', percentage: 100 },
      ],
      isWarningLanguage: false,
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
      loadStats: 'loadStats',
      pushToStats: 'addItemToStats',
      clearStats: 'clearStats',
      saveToStorage: 'saveStats',
    }),

    rowClassName: ({ rowIndex }) => {
      if (rowIndex === 0) return 'test-field__table-row test-field__table-row_avg';
      return 'test-field__table-row';
    },

    clear() {
      this.clearStats();
      this.loadStats();
    },

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

    getCertificate() {
      if (this.getSpeed >= 350) return 'platinum';
      if (this.getSpeed >= 250) return 'gold';
      if (this.getSpeed >= 200) return 'silver';
      return 'none';
    },

    saveStats() {
      this.pushToStats({
        certificate: this.getCertificate(),
        speed: this.getSpeed,
        accuracy: this.getAccuracy,
        textLength: this.text.length,
      });
      this.saveToStorage();
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
        if (this.activeChar === this.text.length) {
          this.stopTimer();
          this.saveStats();
        }
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
      this.mistake = { check: false, counter: 0 };
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
      stats: 'getStats',
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

    isSuccess() {
      return this.getPercentage === 100;
    },
  },

  mounted() {
    this.fetchText();
    this.loadStats();
    document.addEventListener('keydown', this.handleKeyDown);
  },

  unmounted() {
    this.stopTimer();
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss">
.test-field {
  width: 100%;
  max-width: 1024px;
  min-height: 256px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 0 auto;

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

  &__clear {
    margin: 24px auto 0;
  }

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
      margin-top: 16px;

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

    .el-progress__text span {
      color: #909399;
      font-size: 18px;
      font-weight: 600;
    }

    .el-icon-check {
      font-size: 32px;
    }
  }

  &__refresh {
    width: 100%;
    margin-top: 24px;
  }

  &__test-text {
    font-size: 21px;
    line-height: 32px;
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

.test-field__table {
  max-width: 680px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 auto;

  & .is-leaf .cell {
    display: flex;
    align-items: center;
  }

  & .is-leaf:not(:first-of-type) .cell {
    text-align: right;
  }

  & .is-leaf .cell:before {
    content: "";
    width: 23px;
    height: 23px;
    display: inline-block;
    padding-right: 10px;
  }

  & .is-leaf:nth-of-type(1) .cell:before {
    background: url("/images/icons/i-certificate.png") no-repeat;
  }

  & .is-leaf:not(:first-of-type) .cell {
    display: flex;
    justify-content: flex-end;
  }

  & .is-leaf:nth-of-type(2) .cell:before {
    background: url("/images/icons/i-timer.png") no-repeat;
  }

  & .is-leaf:nth-of-type(3) .cell:before {
    background: url("/images/icons/i-target.png") no-repeat;
  }

  & .cell {
    display: flex;
    align-items: center;
  }

  &-row {
    & td:not(:first-of-type) .cell {
      display: flex;
      justify-content: flex-end;
    }
  }
}

.el-table .test-field__table-row_avg {
  background: oldlace;
}
</style>
