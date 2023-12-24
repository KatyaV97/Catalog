<template>
  <div
      class="popover-container"
      v-click-outside="closePopover"
  >
    <perfect-scrollbar>
      <div class="scroll-block">
        <Input
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
  haveNFC: boolean,
  haveESIM: boolean,
  haveWireless: boolean,
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
    closePopover() {
      this.$emit('togglePopover', false)
    },
    changeDevices(newId: string): void {
      this.$store.commit('devices/changeDevicesForCompare', {
        newId: newId,
        oldId: this.deviseId
      })
      this.$store.commit('devices/changeUnusedDevices', {
        newId: newId,
        oldId: this.deviseId
      })
    },
    setSearchValue(text: string): void {
      this.searchValue = text.trim()
      this.updateDevises()
    },
    updateDevises(): void {
      this.filteredDevices = this.unusedDevices.filter((device: Device) => {
        return device.model.toLowerCase().includes(this.searchValue.toLowerCase())
      })
      console.log(this.filteredDevices)
    }
  },
  computed: {
    unusedDevices() {
      return this.$store.getters['devices/getUnusedDevices']
    },
    countDevicesForCompare() {
      return this.$store.getters['devices/getCountDevicesForCompare']
    }
  },
  mounted(){
    this.unusedDevices.forEach((device: Device) => {
      this.filteredDevices.push(device)
    })
  }
})
</script>

<style scoped>
</style>