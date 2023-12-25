<template>
  <div class="row">
    <p class="_non-space row-title">{{ title.title }}</p>
    <div class="device-info-row"
         :class="{
                    'max-content': devicesForCompare.length > 4
                  }"
    >
      <div
          v-for="device in devicesForCompare"
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
  },
  computed: {
    devicesForCompare() {
      return this.$store.getters['devices/getDevicesForCompare']
    }
  }
}
</script>

<style scoped>
</style>