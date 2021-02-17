<template>
  <div class="test-field">
    <vText v-show="!isCompleted"></vText>

    <vHistory v-show="isCompleted"></vHistory>

    <vInform></vInform>
  </div>
</template>

<!--suppress JSAnnotator -->
<script>
import { mapActions, mapGetters } from 'vuex';
import vHistory from '@/components/testing/History.vue';
import vInform from '@/components/testing/Inform.vue';
import vText from '@/components/testing/Text.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Field',

  components: {
    vHistory,
    vInform,
    vText,
  },

  methods: {
    ...mapActions({
      fetchText: 'testing/fetchText',
      loadHistory: 'history/loadData',
      resetTest: 'testing/resetTest',
    }),
  },

  computed: {
    ...mapGetters({
      isCompleted: 'testing/isCompletedTest',
    }),
  },

  mounted() {
    this.fetchText();
    this.loadHistory();
  },

  unmounted() {
    this.resetTest();
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
}
</style>
