<template>
  <div
    class="icon__slot"
    :class="[data === 'success' ? 'box__check' : 'box__close']"
  >
    <el-tooltip
      v-if="data === 'success'"
      effect="light"
      content="Успешно"
      placement="top"
    >
      <Check class="icon pointer icon__check" />
    </el-tooltip>

    <el-tooltip
      v-if="data === 'fail'"
      effect="light"
      content="Не успешно"
      placement="top"
    >
      <Close class="icon pointer icon__close" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'

// props
const props = defineProps({
  data: {
    type: [Object, String, Number, Boolean, Array],
    default: ''
  }
})
</script>

<style scoped lang="scss">
.icon__slot {
  display: flex;
  width: 100%;
  height: 2rem;
  align-items: center;
  padding: 0;
  margin: 0;
  justify-content: center;
}

.box__check:hover {
  background: #E9F8E8;
}

.box__close:hover {
  background: #F8E8E8;
}

.icon__check {
  color: #3E7919;
}

.icon__close {
  color: #791919;
}
</style>

