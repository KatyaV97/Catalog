<template>
  <div class="phone-card-container">
    <div class="icons">
      <img
          :class="{
            '_apple': deviceInfo.brand === 'Apple',
            '_xiaomi': deviceInfo.brand === 'Xiaomi',
            '_samsung': deviceInfo.brand === 'Samsung',
          }"
          :src="'src/public/' + deviceInfo.imgPath"
          alt="icon"
      />
      <div class="stroke">
        <svg
            v-if="countDevicesForCompare !== 6"
            @click="togglePopover(true)"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="27"
            viewBox="0 0 30 27"
            fill="none"
        >
          <path d="M24.375 10.125L15 18.5625L5.625 10.125" stroke="#0D5ADC" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
        <Popover
            v-if="showPopover"
            :devise-id="deviceInfo.id"
            @toggle-popover="togglePopover"
        />
      </div>
    </div>
    <p class="_non-space model-title">{{ deviceInfo.model }}</p>
  </div>
</template>

<script lang="ts">
import Popover from "@/components/Popover.vue";

export default {
  components: {Popover},
  props: {
    deviceInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    countDevicesForCompare(){
      return this.$store.getters['devices/getCountDevicesForCompare']
    }
  },
  data() {
    return {
      showPopover: false as boolean
    }
  },
  methods: {
    togglePopover(show: boolean): void {
      this.showPopover = show
    }
  }
}

</script>

<style scoped>

</style>