<template>
  <div class="display">
    <el-col class="display__column display__text" :span="20">
      <span class="display__char" v-for="(chr, i) in text" :key="i"
            :class="{ display__char_active: activeChar === i,
                      display__char_complete: activeChar > i }">{{ chr }}</span>
    </el-col>

    <el-col class="display__column" :span="4">
      Тут будет статистика и рестарт
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
      keyPress: null,
    };
  },
  methods: {
    ...mapActions({
      fetchText: 'fetchText',
    }),

    handleKeyDown(event) {
      if (event.key.length > 1) return;

      if (/[a-z]/i.test(event.key)) return;

      if (event.key === this.text[this.activeChar]) {
        this.activeChar += 1;
        this.keyPress = '';
      }
    },
  },
  computed: {
    ...mapGetters({
      text: 'getTextValue',
      error: 'getTextError',
      isLoading: 'isLoadingText',
    }),

    isMistake() {
      return this.text[this.activeChar] !== this.keyPress;
    },
  },
  mounted() {
    this.fetchText();
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
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
