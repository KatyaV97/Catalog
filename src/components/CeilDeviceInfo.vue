<template>
  <div class="ceil-info">
    <p v-if="typeValue === 'string'"
       class="_non-space"
    >{{ text }}</p>
    <p v-else-if="typeValue === 'boolean'"
       class="_non-space ceil-info"
    >
      <svg
          v-if="text === 'true'"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
      >
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM9.01982 12.9508L16.7961 5.17451L18.7334 7.11161L9.01982 16.8255L3.2667 11.0722L5.20408 9.13514L9.01982 12.9508Z"
              fill="#36935B"/>
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
      >
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22ZM8.75981 11.0304L4 15.7888L6.2734 18.0629L11.0338 13.3038L15.7266 17.9952L18 15.7211L13.3079 11.0304L17.9979 6.34168L15.7245 4.06764L11.0338 8.75697L6.27549 3.99996L4.00209 6.274L8.75981 11.0304Z"
              fill="#EF4058"/>
      </svg>
    </p>
    <p v-else-if="typeValue==='number'"
       class="_non-space ceil-info"
    >{{ new Intl.NumberFormat('ru-Ru').format(Number(text)) }}<span v-if="unit !== null">&nbsp;{{ unit }}</span>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    typeValue: {
      type: String,
      default: 'string'
    },
    unit: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
</style>