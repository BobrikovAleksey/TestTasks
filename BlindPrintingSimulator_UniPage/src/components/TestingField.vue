<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TestingField',
  methods: {
    ...mapActions({
      fetchText: 'fetchText',
    }),
  },
  computed: {
    ...mapGetters({
      text: 'getTextValue',
      error: 'getTextError',
      isLoading: 'isLoadingText',
    }),
  },
  mounted() {
    this.fetchText();
  },
};
</script>

<style scoped lang="scss">

</style>
