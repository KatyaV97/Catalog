<template>
  <div
      class="row"
  >
    <p class="_non-space row-title">{{ title.title }}</p>
    <div class="device-info-row">
      <div
          v-for="device in devicesInfo"
          :key="device.id"
      >
        <CeilDeviceInfo
            :text="(device[title.parameter]).toString()"
            :type-value="typeof device[title.parameter]"
            :unit="title.unit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CeilDeviceInfo from "@/components/CeilDeviceInfo.vue";

export default {
  components: {CeilDeviceInfo},
  props: {
    title: {
      type: Object,
      required: true
    },
    devicesInfo: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>