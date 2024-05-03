<template>
  <component
    :is="componentName"
    :data="data"
    :config="config"
    :record="record"
  />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
const DefaultSlot = defineAsyncComponent(
  () => import('@/components/UI/Table/ScopedSlots/DefaultSlot.vue')
)
const IpSlot = defineAsyncComponent(
  () => import('@/components/UI/Table/ScopedSlots/IpSlot.vue')
)
const StatusSlot = defineAsyncComponent(
  () => import('@/components/UI/Table/ScopedSlots/StatusSlot.vue')
)

export default {
  components: {
    DefaultSlot,
    IpSlot,
    StatusSlot
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

// props
const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  config: {
    type: [Object, String, Number, Boolean, Array],
    default: ''
  },
  data: {
    type: [Object, String, Number, Boolean, Array],
    default: ''
  },
  record: {
    type: Object,
    default: () => {}
  }
})

// computed
const componentName = computed(() => {
  return `${props.type}Slot`
})
</script>

