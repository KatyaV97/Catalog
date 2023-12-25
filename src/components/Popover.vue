<template>
  <div
      class="popover-container"
      @mouseenter="onFocus"
      @mouseleave="onBlur"
      v-click-outside="closePopover"
  >
    <perfect-scrollbar>
      <div class="scroll-block">
        <Input
            v-if="countDevicesForCompare < 3"
            :value="searchValue"
            @input="setSearchValue"
        />
        <div class="popover-cards">
          <div v-for="device in filteredDevices"
               :key="device.id"
          >
            <PopoverPhoneCard
                :device="device"
                @change-devices="changeDevices"
            />
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>

</template>

<script lang="ts">
import {PerfectScrollbar} from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import {defineComponent} from "vue";
import Input from "@/components/Input.vue";
import PopoverPhoneCard from "@/components/PopoverPhoneCard.vue";

type Device = {
  id: string,
  model: string,
  brand: string,
  releaseYear: string,
  displaySize: number,
  manufactureCountry: string,
  memory: number,
  displayRefreshRate: number,
  hasNFC: boolean,
  hasESIM: boolean,
  hasWirelessChargeCharge: boolean,
  price: number,
  imgPath: string,
}

export default defineComponent({
  components: {Input, PopoverPhoneCard, PerfectScrollbar},
  emits: ['togglePopover'],
  props: {
    deviseId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchValue: '' as string,
      filteredDevices: [] as Device []
    }
  },
  methods: {
    onFocus() {
      this.stopScroll()
    },
    event(e: Event) {
      e.preventDefault();
    },
    stopScroll() {
      document.querySelector('.popover-container').addEventListener('wheel', this.event, {passive: false})
    },
    removeStoped() {
      document.querySelector('.popover-container').removeEventListener('wheel', this.event)
    },
    onBlur() {
      this.removeStoped()
    },
    closePopover() {
      this.$emit('togglePopover', false)
    },
    changeDevices(newId: string): void {
      console.log(this.$store.commit)
      this.$store.commit('devices/changeDevices', {
        newId: newId,
        oldId: this.deviseId
      })
      this.$store.commit('devices/setDevicesForCompare')
      this.$store.commit('devices/setUnusedDevices')

      if (this.showDifference) {
        this.$store.commit('devices/filteredRowsTitles')
      }
    },
    setSearchValue(text: string): void {
      this.searchValue = text.trim()
      this.updateDevises()
    },
    updateDevises(): void {
      this.filteredDevices = this.unusedDevices.filter((device: Device) => {
        return device.model.toLowerCase().includes(this.searchValue.toLowerCase())
      })
    }
  },
  computed: {
    unusedDevices() {
      return this.$store.getters['devices/getUnusedDevices']
    },
    countDevicesForCompare() {
      return this.$store.getters['devices/getCountDevicesForCompare']
    },
    showDifference() {
      return this.$store.getters['devices/getShowDifference']
    },
  },
  mounted() {
    this.unusedDevices.forEach((device: Device) => {
      this.filteredDevices.push(device)
    })
  }
})
</script>

<style scoped>
</style>