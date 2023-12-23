<template>
  <div
      class="popover-container"
      v-click-outside="closePopover"
  >
    <perfect-scrollbar>
      <div class="scroll-block">
        <Input
            :value="searchValue"
        />
        <div class="popover-cards">
          <div v-for="device in unusedDevices"
               :key="device.id"
          >
            <PopoverPhoneCard
                :device="device"
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

export default defineComponent({
  components: {Input, PopoverPhoneCard, PerfectScrollbar},
  emits: ['togglePopover'],
  data() {
    return {
      searchValue: '' as string,
      unusedDevices: [
        {
          id: '1frwe',
          model: 'Apple iPhone 12',
          brand: 'Apple',
          releaseYear: 2020,
          displaySize: 6.1,
          manufactureCountry: 'China',
          memory: 128,
          displayRefreshRate: 60,
          haveNFC: false,
          haveESIM: true,
          haveWireless: true,
          price: 81990,
          imgPath: 'Apple12.png',
        },
        {
          id: '45jwe',
          model: 'Xiaomi Mi 11 Lite',
          brand: 'Xiaomi',
          releaseYear: 2021,
          displaySize: 6.55,
          manufactureCountry: 'China',
          memory: 128,
          displayRefreshRate: 90,
          haveNFC: true,
          haveESIM: true,
          haveWireless: false,
          price: 27490,
          imgPath: 'Xiaomi11Lite.png',
        },
        {
          id: 'dfg45',
          model: 'Samsung Galaxy A72',
          brand: 'Samsung',
          releaseYear: 2021,
          displaySize: 6.7,
          manufactureCountry: 'Vietnam',
          memory: 128,
          displayRefreshRate: 90,
          haveNFC: true,
          haveESIM: false,
          haveWireless: true,
          price: 32890,
          imgPath: 'SamsungA72.png',
        },
        {
          id: 'koiu8',
          model: 'Samsung Galaxy S21',
          brand: 'Samsung',
          releaseYear: 2021,
          displaySize: 6.2,
          manufactureCountry: 'Vietnam',
          memory: 256,
          displayRefreshRate: 120,
          haveNFC: true,
          haveESIM: true,
          haveWireless: true,
          price: 709999,
          imgPath: 'SamsungS21.png',
        },
        {
          id: '41dgh',
          model: 'Apple iPhone Xr',
          brand: 'Apple',
          releaseYear: 2018,
          displaySize: 6.1,
          manufactureCountry: 'China',
          memory: 128,
          displayRefreshRate: 60,
          haveNFC: true,
          haveESIM: true,
          haveWireless: true,
          price: 81499,
          imgPath: 'AppleXr.png',
        },
        {
          id: 'ret67',
          model: 'Readmi 8 Pro',
          brand: 'Xiaomi',
          releaseYear: 2019,
          displaySize: 6.53,
          manufactureCountry: 'China',
          memory: 128,
          displayRefreshRate: 60,
          haveNFC: true,
          haveESIM: false,
          haveWireless: false,
          price: 18999,
          imgPath: 'Readmi8Pro.png',
        }
      ]
    }
  },
  methods: {
    closePopover() {
      this.$emit('togglePopover', false)
    }
  }
})
</script>

<style scoped>

</style>