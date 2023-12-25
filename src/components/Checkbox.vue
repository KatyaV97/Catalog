<template>
  <label
      aria-label="Чек-бокс"
      class="container-checkbox"
      :for="'checkbox' + id">
    <input
        :id="'checkbox' + id"
        type="checkbox"
        :checked="checked"
        @change="$emit('update:checked', !checked)"
    /><span class="custom-checkbox"></span>
    {{ text }}
  </label>
</template>

<script lang="ts">
export default {
  name: "Checkbox",
  emits: ['update:checked'],
  props: {
    text: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

input[type="checkbox"]:checked + .custom-checkbox {
  background-color: #0D5CF0;
  border-color: #0D5CF0;
}

input[type="checkbox"]:checked + .custom-checkbox {
  background: url("../public/tick.svg") no-repeat center center #0D5CF0;
  background-size: 15px;
}
</style>
