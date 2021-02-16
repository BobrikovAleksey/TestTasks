<template>
  <div>
    <el-row>
      <el-col :span="13">
        <el-image class="test-content__image test-content__image_certificates" alt="Сертификаты"
                  :src="images.certificates"></el-image>
      </el-col>

      <el-col class="test-content__text-block" :span="11">
        <h2 class="test-content__title">Узнай, как печатать вслепую</h2>

        <p class="test-content__description">
          Главная идея слепой печати в том, что за каждым пальцем закреплена своя зона клавиш. Это
          позволяет печатать не глядя на клавиатуру. Регулярно тренируйся и, благодаря мышечной
          памяти, все твои десять пальцев будут знать, куда нажать.
        </p>

        <el-button class="button test-content__button" type="warning" plain @click="goToTest">
          Пройти тест печати
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="13">
        <el-table class="test-content__table" :row-class-name="rowClassName"
                  :data="certificates">
          <el-table-column prop="certificate" label="сертификат"></el-table-column>
          <el-table-column prop="speed" label="скорость"></el-table-column>
          <el-table-column prop="accuracy" label="точность"></el-table-column>
        </el-table>
      </el-col>

      <el-col class="test-content__text-block" :span="11">
        <p class="test-content__text">
          Проходи тестирование сколько хочешь раз и на любой раскладке. В зачет пойдет только
          лучший результат. Так что не бойся пробовать снова!
        </p>

        <p class="test-content__text">
          А еще проверь свой рейтинг в таблице лучших результатов после прохождения теста скорости
          печати.
        </p>
      </el-col>
    </el-row>

    <el-row>
      <el-col class="test-content__text-block" :span="12">
        <h2 class="test-content__title">Зачем проходить тест скорости печати?</h2>

        <p class="test-content__text">
          Чтобы узнать свою скорость и точность печати, понять нужно ли что-то улучшить. Средняя
          скорость печати составляет 200 зн./мин, попробуй ее превзойти! Ты можешь пройти тест
          несколько раз и увидеть, как твоя скорость печати улучшается со временем.
        </p>

        <p class="test-content__text">
          После прохождения теста онлайн ты получишь сертификат скорости печати, который сможешь
          прикрепить к резюме, показать учителю или похвастаться друзьям.
        </p>
      </el-col>

      <el-col class="test-content__text-block" :span="12">
        <h2 class="test-content__title">Как мы измеряем скорость печати?</h2>

        <p class="test-content__text">
          Мы измеряем скорость печати в зн./мин  — сколько знаков в минуту без опечаток ты набрал.
          «Знаком» считается любой символ, включая пробелы. Мы учитываем только правильно
          набранные слова.
        </p>

        <p class="test-content__text">
          Поэтому, если сделана опечатка, подсчет символов останавливается, пока ты ее не
          исправишь.
        </p>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-row>
      <h2 class="test-content__title test-content__text_center">Тест займет всего 2-3 минуты!</h2>

      <p class="test-content__text test-content__text_center">
        Проходи тест, сколько хочешь. Ограничений нет.
      </p>

      <p class="test-content__text test-content__text_center">
        Хватай клавиатуру и измеряй свою скорость печати!
      </p>

      <el-button class="button test-content__button" type="warning" plain @click="goToTest">
        Пройти тест печати
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Content',

  props: {
    goToTest: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      publicPath: process.env.BASE_URL,
      certificates: [
        {
          certificate: 'platinum',
          speed: '350 зн./мин',
          accuracy: '99.5%',
        },
        {
          certificate: 'gold',
          speed: '250 зн./мин',
          accuracy: '98.7%',
        },
        {
          certificate: 'silver',
          speed: '200 зн./мин',
          accuracy: '96.0%',
        },
      ],
    };
  },

  methods: {
    rowClassName: ({ rowIndex }) => `test-content__table-row test-content__table-row_${rowIndex}`,
  },

  computed: {
    ...mapGetters({
      images: 'getImages',
    }),
  },
};
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss">
.test-content {
  &__button {
    margin: 24px auto 0;
  }

  &__description {
    width: 100%;
    font-size: 18px;
    line-height: normal;
    margin-top: 24px;
  }

  &__image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &_certificates img {
      max-width: 512px;
      height: auto;
    }
  }

  &__table {
    width: 90%;
    max-width: 512px;
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
  }

  &__table-row {
    & td:first-of-type .cell:before {
      content: "";
      width: 32px;
      height: 32px;
      display: inline-block;
      padding-right: 10px;
    }

    & td:not(:first-of-type) .cell {
      display: flex;
      justify-content: flex-end;
    }

    &_0 td:first-of-type .cell:before {
      background: url("/images/icons/i-medal-platinum.png") no-repeat;
    }

    &_1 td:first-of-type .cell:before {
      background: url("/images/icons/i-medal-gold.png") no-repeat;
    }

    &_2 td:first-of-type .cell:before {
      background: url("/images/icons/i-medal-silver.png") no-repeat;
    }
  }

  &__text {
    width: 100%;
    margin-top: 10px;

    &_center {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    &-block {
      padding: 12px 24px
    }
  }

  &__title {
    font-size: 24px;
    line-height: normal;
  }
}
</style>
