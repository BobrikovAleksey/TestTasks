<template>
  <div class="display">
    <el-col class="display__column display__text" :span="20">
      <span class="display__char" v-for="(chr, i) in text" :key="i"
            :class="{ display__char_active: activeChar === i,
                      display__char_complete: activeChar > i,
                      display__char_mistake: activeChar === i & mistake.check }">{{ chr }}</span>
    </el-col>

    <el-col class="display__column" :span="4">
      {{ getAccuracy }}, {{ getSpeed }}
    </el-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TestingField',

  data() {
    return {
      activeChar: 0,
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
      if (this.activeChar >= this.text.length || event.key.length > 1) return;

      if (/[A-Za-z]{1}/.test(event.key)) {
        this.getWarningLanguage();
        return;
      }

      if (!this.timer.id) {
        this.startTimer();
      }

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
      return (this.text.length - this.mistake.counter) / this.text.length;
    },

    getTimer() {
      return this.timer.end - this.timer.start;
    },

    getSpeed() {
      return this.getTimer > 0 ? (this.activeChar / this.getTimer) * 60000 : 0;
    },
  },

  mounted() {
    this.fetchText();
    document.addEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style scoped lang="scss">
.display {
  max-width: 1024px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 0 auto;

  &__column {
    padding: 24px;
  }

  &__text {
    font-size: 21px;
    line-height: 32px;
    padding-left: 48px;
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
