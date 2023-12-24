<template>
  <div>
    <div class="row-line"></div>
    <div
        v-for="title in rowsWithDifference"
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

export default {
  components: {Row},
  props: {
    devicesInfo: {
      type: Array,
      required: true
    },
    rowsWithDifference: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>