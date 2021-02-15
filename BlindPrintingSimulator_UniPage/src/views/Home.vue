<template>
  <div class="home">
    <h2 class="home__title">Узнай, как печатать вслепую</h2>

    <p class="home__description">
      Главная идея слепой печати в том, что за каждым пальцем закреплена своя зона клавиш. Это
      позволяет печатать не глядя на клавиатуру. Регулярно тренируйся и, благодаря мышечной
      памяти, все твои десять пальцев будут знать, куда нажать.
    </p>

    <el-collapse accordion v-model="activeItem">
      <el-collapse-item title="Поза при печати текста" name="1">
        <el-row>
          <el-col :span="8">
            <el-image class="home__image home__pose-image"
                      alt="Поза при печати" src="/images/pose.png"></el-image>
          </el-col>

          <el-col :span="16">
            <ul class="home__list">
              <li>Сиди ровно и держи спину прямой.</li>
              <li>Локти держи согнутыми под прямым углом.</li>
              <li>Голова должна быть немного наклонена вперед.</li>
              <li>Расстояние от глаз до экрана должно быть 45-70 см.</li>
              <li>
                Расслабь мышцы плеч, рук и кистей. Кисти могут немного касаться стола в нижней части
                клавиатуры, но не переноси вес тела на руки, чтобы не перенапрягать кисти.
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="Исходная позиция" name="2">
        <el-row>
          <el-image class="home__image home__fingers-image"
                    alt="Положение рук на клавиатуре" src="/images/fingers.png"></el-image>

          <p class="home__text">
            Немного согни пальцы и положи их на клавиши ФЫВА и ОЛДЖ, которые находятся в среднем
            ряду. Эта строка называется ОСНОВНОЙ СТРОКОЙ, потому что ты всегда будешь начинать с
            этих клавиш и возвращаться к ним.
          </p>

          <p class="home__text">
            На клавишах А и О, под указательными пальцами, находятся небольшие выступы. Они
            позволяют ориентироваться на клавиатуре вслепую.
          </p>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="Схема клавиатуры" name="3">
        <el-row>
          <el-image class="home__image home__keyboard-image"
                    alt="Положение рук на клавиатуре" src="/images/keyboard.png"></el-image>

          <p class="home__text">
            Цвет клавиш на этой клавиатуре поможет тебе понять и запомнить, каким пальцем на какую
            клавишу нужно нажимать.
          </p>

          <ul class="home__list home__text">
            <li>Нажимай клавиши только тем пальцем, который для них предназначен.</li>
            <li>Всегда возвращай пальцы в исходную позицию «ФЫВА – ОЛДЖ».</li>
            <li>Когда набираешь текст, представляй расположение клавиш.</li>
            <li>
              Установи ритм и соблюдай его, пока печатаешь. Нажимай на клавиши с одинаковым
              интервалом.
            </li>
            <li>
              Клавишу SHIFT всегда нажимает мизинец с противоположной стороны от нужной буквы.
            </li>
            <li>Пробел отбивай большим пальцем левой или правой руки, как тебе удобнее.</li>
          </ul>

          <p class="home__text">
            Сначала такой метод печати может показаться неудобным. Но не останавливайся. Со временем
            все будет получаться быстро, легко и удобно. Чтобы добиться максимального результата,
            выбирай курс слепой печати для твоей раскладки клавиатуры и на нужном языке.
          </p>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="Движение пальцев" name="4">
        <el-row>
          <el-col :span="8">
            <el-image class="home__image home__man-image"
                      alt="Человек с повязкой на глазах" src="/images/man.png"></el-image>
          </el-col>

          <el-col :span="16">
            <p class="home__text">
              Не подглядывай на клавиатуру во время печати. Просто скользи пальцами по клавишам,
              пока не найдешь основную строку.
            </p>

            <p class="home__text">
              Ограничь движение кистей и пальцев до минимума, только чтобы нажимать нужные клавиши.
              Держи руки и пальцы как можно ближе к исходной позиции. Это увеличит скорость набора
              текста и снизит нагрузку на кисти.
            </p>

            <p class="home__text">
              Следи за безымянными пальцами и мизинцами, так как они часто остаются
              незадействованными.
            </p>
          </el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="Скорость печати" name="5">
        <el-row>
          <ul class="home__list">
            <li>
              Не пытайся сразу печатать со скоростью света. Начинай ускоряться, только когда все 10
              пальцев привыкнут нажимать правильные клавиши.
            </li>
            <li>
              Не торопись когда печатаешь, чтобы избежать ошибок. Скорость будет возрастать
              постепенно.
            </li>
            <li>Всегда просматривай текст на одно-два слова вперед.</li>
          </ul>
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="Береги себя" name="6">
        <el-row>
          <p class="home__text">
            Сделай паузу, если чувствуешь, что сбиваешься и делаешь много ошибок. Небольшой перерыв
            вернет силы и внимательность.
          </p>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <el-row>
      <el-button class="button home__button" type="warning" plain @click="goToTesting">
        Пора потренироваться
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    activeItem: '6',
  }),

  methods: {
    goToTesting() {
      this.$router.push('/testing');
    },
  },
};
</script>

<style lang="scss">
.home {
  &__button {
    margin: 32px auto;
  }

  &__description {
    width: 100%;
    margin-bottom: 32px;
  }

  &__image {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__list {
    margin-left: 20px;
  }

  &__text {
    width: 100%;
    margin-top: 10px;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__fingers-image img {
    width: auto;
    max-height: 150px;
    margin-bottom: 32px;
  }

  &__keyboard-image img {
    width: auto;
    max-height: 250px;
    margin-bottom: 32px;
  }

  &__man-image img {
    max-width: 150px;
    height: auto;
  }

  &__pose-image img {
    max-width: 200px;
    height: auto;
  }
}

.el-collapse-item {
  &__header {
    font-size: 18px;
    font-weight: 600;
  }

  &__content {
    font-size: 16px;
  }
}

.el-row {
  padding: 16px;
}
</style>
