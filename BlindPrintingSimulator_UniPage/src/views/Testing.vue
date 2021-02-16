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

          <el-slider :step="1" :min="1" :max="6" show-stops v-model="volume"
                     @change="handleChangeVolume"></el-slider>
        </div>
      </el-row>
    </div>
  </div>
</template>

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
      setTextLength: 'testing/setTextLength',
    }),

    handleChangeVolume() {
      if (this.volume === this.textLength) return;

      this.setTextLength(this.volume);
      this.fetchText();
    },

    goToTest() {
      this.isTest = true;
    },
  },

  computed: {
    ...mapGetters({
      textLength: 'testing/getTextLength',
    }),
  },

  created() {
    this.volume = this.textLength;
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
