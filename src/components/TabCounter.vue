<template>
  <div class="tabs-devices-counter">
      <span
          v-for="(tab, index) in devicesCounter"
          :key="tab.title"
          class="tab-count"
      ><span
          :class="{
                     '_active': tab.isActive
                  }"
          @click="setActive(tab)"
      >{{ tab.title }}</span>
      <span>{{ index !== devicesCounter.length - 1 ? '&nbsp;' : '' }}</span>
      </span>
  </div>
</template>

<script lang="ts">
type Tab = {
  title: string,
  isActive: boolean
}
export default {
  emits: ['getActiveTab'],
  props: {
    devicesCounter: {
      type: Array,
      required: true
    }
  },
  methods: {
    setActive(selectedTab: Tab): void {
      this.devicesCounter.forEach(tab =>  {
        tab.isActive = tab === selectedTab
      })
      this.getActiveTab(selectedTab)
    },
    getActiveTab(tab: object): void {
      this.$emit('getActiveTab', tab)
    }
  }
}
</script>

<style scoped>
</style>