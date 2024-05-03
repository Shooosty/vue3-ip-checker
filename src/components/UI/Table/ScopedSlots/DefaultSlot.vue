<template>
  <span
    class="default__slot"
    v-text="data || '-'"
  />
</template>

<script lang="ts" setup>
// props
const props = defineProps({
  data: {
    type: [Object, String, Number, Boolean, Array],
    default: ''
  }
})
</script>

<style scoped lang="scss">
.default__slot {
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
}
</style>
