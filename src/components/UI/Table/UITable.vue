<template>
  <el-table
    v-loading="isLoading"
    :data="items"
    :row-key="rowKeyFunction"
    table-layout="fixed"
    max-height="400"
    flexible
    border
    stripe
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="40"
    />
    <el-table-column
      v-for="(col, index) in columns"
      :key="index"
      :min-width="col.width"
      :label="col.label"
    >
      <template #default="scope">
        <MetaScopedSlots
          :type="col.slot.type"
          :data="scope.row[col.prop]"
          :config="col.slot.config"
          :record="scope.row"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import MetaScopedSlots from '@/components/UI/Table/ScopedSlots/MetaScopedSlots.vue'

// emits
const emit = defineEmits(['on-click-checkbox'])

// props
const props = defineProps({
  rowKeyFunction: {
    type: Function,
    default: (record) => record.id,
  },
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  checkboxEnabled: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  selectedRowKeys: {
    type: Array,
    default: () => []
  }
})

// methods
const handleSelectionChange = (VALUE) => {
  emit('on-click-checkbox', VALUE)
}
</script>
