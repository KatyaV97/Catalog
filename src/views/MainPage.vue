<template>
  <div class="header">
    <div class="right">
      <p class="_non-space">Каталог</p>
    </div>
    <div class="left">
      <p class="_non-space">СРАВНЕНИЕ</p>
      <div class="personal-account">
        <p class="_non-space">Личный кабинет</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
          <path
              d="M17.0712 2.96481C15.1824 1.07451 12.6711 0.0334473 10.0001 0.0334473C7.32884 0.0334473 4.81769 1.07451 2.92894 2.96481C1.0402 4.85512 0 7.36835 0 10.0418C0 12.7151 1.0402 15.2284 2.92894 17.1188C4.81769 19.0091 7.32884 20.0501 10.0001 20.0501C12.6711 20.0501 15.1824 19.0091 17.0712 17.1188C18.9599 15.2284 20.0001 12.7151 20.0001 10.0418C20.0001 7.36835 18.9599 4.85512 17.0712 2.96481ZM5.01331 17.3286C5.43155 14.9184 7.51836 13.1407 10.0001 13.1407C12.4819 13.1407 14.5686 14.9184 14.9868 17.3286C13.567 18.3049 11.8491 18.8773 10.0001 18.8773C8.15099 18.8773 6.43314 18.3049 5.01331 17.3286ZM6.82042 8.78555C6.82042 7.0307 8.24682 5.60327 10.0001 5.60327C11.7533 5.60327 13.1797 7.03085 13.1797 8.78555C13.1797 10.5402 11.7533 11.9678 10.0001 11.9678C8.24682 11.9678 6.82042 10.5402 6.82042 8.78555ZM16.0018 16.5151C15.6864 15.3931 15.0601 14.3751 14.1821 13.5799C13.6434 13.092 13.0303 12.707 12.3711 12.4356C13.5626 11.6578 14.3517 10.3122 14.3517 8.78555C14.3517 6.3841 12.3995 4.43042 10.0001 4.43042C7.6006 4.43042 5.64853 6.3841 5.64853 8.78555C5.64853 10.3122 6.43772 11.6578 7.62898 12.4356C6.96995 12.707 6.3567 13.0918 5.81806 13.5797C4.94022 14.3749 4.31369 15.3929 3.99828 16.5149C2.26106 14.9003 1.17188 12.5961 1.17188 10.0418C1.17188 5.16987 5.13217 1.2063 10.0001 1.2063C14.8679 1.2063 18.8282 5.16987 18.8282 10.0418C18.8282 12.5962 17.7391 14.9004 16.0018 16.5151Z"
              fill="#3B4157"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="line"></div>
  <div class="container">
    <div class="table-header">
      <div class="top">
        <h1 class="_non-space title">Смартфоны</h1>
        <p class="_non-space tabs-devices-counter">Отобразить товары:&nbsp;
          <TabCounter
              :devices-counter="devicesCounter"
              @get-active-tab="getActiveTab"
          />
        </p>
      </div>
      <div class="devices-block">
        <Checkbox
            :checked="showDifference"
            :text="'Показать различия'"
        />
        <div class="phone-card">
          <div
              v-for="device in devicesForCompare"
              :key="device.id"
          >
            <PhoneCard
                :device-info="device"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="table-body">
    <div class="rows">
      <TableRowsDevices
          :devices-info="devicesForCompare"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Checkbox from "@/components/Checkbox.vue";
import PhoneCard from "@/components/PhoneCard.vue";
import TableRowsDevices from "@/components/TableRowsDevices.vue";
import TabCounter from "@/components/TabCounter.vue";
import {useStore} from 'vuex';

type Tab = {
  title: string,
  isActive: boolean
}

export default {
  components: {
    TabCounter,
    TableRowsDevices,
    Checkbox, PhoneCard
  },
  data() {
    return {
      showDifference: false as boolean,
      countDevicesForCompare: 3 as number,
      devicesCounter: [
        {
          title: '2',
          isActive: false
        },
        {
          title: '3',
          isActive: true
        },
        {
          title: '4',
          isActive: false
        },
        {
          title: '5',
          isActive: false
        },
        {
          title: '6',
          isActive: false
        }
      ] as Tab [],
      activeTab: {
        title: '3',
        isActive: true
      } as Tab,
    }
  },
  methods: {
    getActiveTab(tab: Tab): void {
      this.activeTab = tab
    },
    async getDevicesForCompare(): void{
      await this.$store.dispatch('devices/getDevicesForCompare', this.countDevicesForCompare)
    }
  },
  computed: {
    devicesForCompare() {
      console.log(156)
      return this.$store.getters['devices/getDevicesForCompare']
    }
  },
  async mounted() {
    await this.$store.dispatch('devices/getDevices')
    this.getDevicesForCompare()
  },
  watch: {
    activeTab: {
      handler(newVal, oldVal) {
        this.countDevicesForCompare = Number(newVal.title)
        this.getDevicesForCompare()
      }
    }
  }
}
</script>

<style scoped>

</style>