<template>
  <div class="testing">
    <vContent v-show="!isVisibilityTest"></vContent>

    <div v-show="isVisibilityTest">
      <el-row>
        <div class="testing__settings">
          <p>Количество предложений</p>

          <el-slider :step="1" :min="minLength" :max="maxLength" show-stops v-model="volume"
                     @change="handleChangeVolume"></el-slider>
        </div>
      </el-row>

      <el-row>
        <vField></vField>
      </el-row>
    </div>
  </div>
</template>

<!--suppress JSAnnotator -->
<script>
import { mapActions, mapGetters } from 'vuex';
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
      volume: 3,
    };
  },

  methods: {
    ...mapActions({
      fetchText: 'testing/fetchText',
      resetTest: 'testing/resetTest',
      setTextLength: 'testing/setTextLength',
      switchTestVisibility: 'testing/switchTestVisibility',
    }),

    handleChangeVolume() {
      if (this.volume === this.textLength) return;

      this.resetTest();
      this.setTextLength(this.volume);
      this.fetchText();
    },
  },

  computed: {
    ...mapGetters({
      minLength: 'testing/getMinLength',
      maxLength: 'testing/getMaxLength',
      textLength: 'testing/getTextLength',
      isVisibilityTest: 'testing/isVisibilityTest',
    }),
  },

  created() {
    this.volume = this.textLength;
  },

  mounted() {
    this.switchTestVisibility(false);
  },
};
</script>

<style lang="scss">
.testing {
  &__settings {
    width: 768px;
    margin: 0 auto;
  }

  & .el-slider {
    &__bar {
      background: #E6A23C;
    }

    &__button {
      border-color: #E6A23C;
    }
  }
}
</style>
