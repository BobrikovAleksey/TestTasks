<template>
  <el-col class="history" :span="20">
    <el-table class="history__table" :row-class-name="rowClassName" :data="history"
              :empty-text="'Нет данных'">
      <el-table-column prop="certificate" label="сертификат"></el-table-column>
      <el-table-column prop="speed" label="скорость"></el-table-column>
      <el-table-column prop="accuracy" label="точность"></el-table-column>
      <el-table-column prop="textLength" label="длина текста"></el-table-column>
    </el-table>

    <el-row>
      <el-button class="history__button" type="warning" icon="el-icon-delete"
                 @click="clear">{{ 'Удалить статистику' }}</el-button>
    </el-row>
  </el-col>
</template>

<!--suppress JSAnnotator -->
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'History',

  methods: {
    ...mapActions({
      clear: 'history/clear',
    }),

    rowClassName: ({ rowIndex }) => {
      if (rowIndex === 0) return 'test-field__table-row test-field__table-row_first';
      return 'test-field__table-row';
    },
  },

  computed: {
    ...mapGetters({
      history: 'history/getList',
    }),
  },
};
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss">
.history {
  width: 100%;
  font-size: 21px;
  line-height: 32px;
  padding: 24px 48px;

  &__button {
    margin: 24px auto 12px;
  }
}

.history__table {
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
    justify-content: flex-end;
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
      justify-content: flex-end;
    }
  }
}

.el-table .history__table-row_first {
  background: oldlace;
}
</style>
