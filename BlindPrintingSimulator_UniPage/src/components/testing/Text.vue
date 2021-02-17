<template>
  <el-col class="test-text" :span="20">
      <span class="test-text__char" v-for="(char, index) in text" :key="index"
            :class="{ 'test-text__char_active': index === cursor,
                      'test-text__char_complete': index < cursor,
                      'test-text__char_mistake': index === cursor && isMistake && mistakes > 0}">
        {{ char }}
      </span>
  </el-col>
</template>

<!--suppress JSAnnotator, JSUnusedGlobalSymbols -->
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Text',

  data: () => ({
    isWarningLanguage: false,
    isMistake: false,
  }),

  methods: {
    ...mapActions({
      // history
      addToHistoryWithSave: 'history/addItemWithSave',
      // testing
      fetchText: 'testing/fetchText',
      incMistakes: 'testing/incMistakes',
      nextCursorPosition: 'testing/incCursorPosition',
      resetTestBase: 'testing/resetTest',
      // timer
      startTimer: 'testing/startTimer',
      stopTimer: 'testing/stopTimer',
      updateTimer: 'testing/updateEndTimer',
    }),

    /**
     * Возвращает соответствующий результату сертификат
     */
    getCertificate() {
      if (this.speed >= 350 && this.accuracy >= 0.995) return 'platinum';
      if (this.speed >= 250 && this.accuracy >= 0.987) return 'gold';
      if (this.speed >= 200 && this.accuracy >= 0.960) return 'silver';
      return 'none';
    },

    /**
     * Сохраняет результат
     */
    saveResult() {
      this.addToHistoryWithSave({
        accuracy: this.accuracy,
        certificate: this.getCertificate(),
        speed: this.speed,
        textLength: this.text.length,
      });
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

    /**
     * Обрабатывает нажатие клавиши в документе
     */
    handleKeyDown(event) {
      if (!this.isVisibility || this.isCompleted || event.key.length > 1) {
        return;
      }

      if (/[A-Za-z]{1}/.test(event.key)) {
        this.getWarningLanguage();
        return;
      }

      if (!this.isTestInProgress) this.startTimer(this.updateTimer.bind(this));

      const symbol = this.text[this.cursor];
      if (event.key === symbol || (event.key === 'е' && symbol === 'ё')) {
        this.nextCursorPosition();
        this.isMistake = false;
        if (this.isCompleted) {
          this.saveResult();
          this.stopTimer();
        }
        return;
      }

      if (!this.isMistake) {
        this.isMistake = true;
        this.incMistakes();
      }
    },

    resetTest() {
      this.isMistake = false;
      this.resetTestBase();
      this.fetchText();
    },
  },

  computed: {
    ...mapGetters({
      // text
      text: 'testing/getText',
      // test
      accuracy: 'testing/getAccuracy',
      cursor: 'testing/getCursor',
      mistakes: 'testing/getMistakes',
      speed: 'testing/getSpeed',
      // flags
      isCompleted: 'testing/isCompletedTest',
      isVisibility: 'testing/isVisibilityTest',
      isTestInProgress: 'testing/isTestInProgress',
    }),
  },

  created() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },

  unmounted() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style lang="scss">
.test-text {
  width: 100%;
  font-size: 21px;
  line-height: 32px;
  padding: 24px 48px;

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
