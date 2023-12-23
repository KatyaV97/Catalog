<template>
  <div>
    <div class="row-line"></div>
    <div v-for="title in titlesRows"
         :key="title.title"
    >
      <Row
          :devices-info="devicesInfo"
          :title="title"
      />
      <div class="row-line"></div>
    </div>
    <div class="row-line"></div>
  </div>
</template>

<script lang="ts">
import Row from "@/components/Row.vue";

type Title = {
  title: string,
  parameter: string,
  unit: string | null
}
export default {
  components: {Row},
  props: {
    devicesInfo: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      titlesRows: [
        {
          title: 'Производитель',
          parameter: 'brand',
          unit: null
        },
        {
          title: 'год релиза',
          parameter: 'releaseYear',
          unit: null
        },
        {
          title: 'Диагональ экрана (дюйм)',
          parameter: 'displaySize',
          unit: null
        },
        {
          title: 'Страна-производитель',
          parameter: 'manufactureCountry',
          unit: null
        },
        {
          title: 'Объем памяти',
          parameter: 'memory',
          unit: 'Гб'
        },
        {
          title: 'Частота обновления экрана',
          parameter: 'displayRefreshRate',
          unit: null
        },
        {
          title: 'NFC',
          parameter: 'haveNFC',
          unit: null
        },
        {
          title: 'Поддержка eSIM',
          parameter: 'haveESIM',
          unit: null
        },
        {
          title: 'Поддержка беспроводной зарядки',
          parameter: 'haveWireless',
          unit: null
        },
        {
          title: 'Стоимость',
          parameter: 'price',
          unit: '₽'
        }
      ] as Title[]
    }
  }
}
</script>

<style scoped>

</style>