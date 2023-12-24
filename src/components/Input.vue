<template>
  <div class="input-body">
    <div class="left">
      <input
          class="main-input"
          ref="input"
          type="text"
          placeholder="Поиск"
          :value="value"
          @input="setValue($event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Input",
  emits: ['input'],
  props: {
    value: {
      type: String,
      required: true
    },
  },
  methods: {
    setValue(text: string): void {
      this.$emit('input', text)
    },
  },
}
</script>

<style scoped>
</style>
