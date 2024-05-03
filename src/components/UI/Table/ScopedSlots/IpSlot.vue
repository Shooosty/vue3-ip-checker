<template>
  <div
    @mouseover="showActions = true"
    @mouseleave="showActions = false"
    class="ip__slot"
  >
    <div>
      <span
        v-if="record.countryCode"
        class="fi"
        :class="`fi-${record.countryCode?.toLowerCase()}`"
      />
      <span
        class="ip__slot-text"
        v-text="data"
      />
    </div>

    <div
      v-if="showActions"
      class="ip__slot-actions"
    >
      <el-space>
        <Delete
          @click="onClickDelete"
          class="icon pointer icon__delete"
        />
        <CopyDocument
          @click="onClickCopy"
          class="icon pointer icon__copy"
        />
        <View
          @click="onClickShow"
          class="icon pointer icon__show"
        />
      </el-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "/node_modules/flag-icons/css/flag-icons.min.css"
import { Delete, CopyDocument, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useIpStore } from '@/store/ip'

// store
const store = useIpStore()

// props
const props = defineProps({
  data: {
    type: [Object, String, Number, Boolean, Array],
    default: ''
  },
  record: {
    type: Object,
    default: () => {}
  }
})

// route
const route = useRoute()

// data
const showActions = ref(false)

// methods
const onClickDelete = () => {
  store.DELETE(props.data)
  ElNotification({
    message: 'IP удален',
    type: 'success'
  })
}

const onClickCopy = () => {
  navigator.clipboard.writeText(props.data).then(() => {
    ElNotification({
      message: 'IP скопирован',
      type: 'success'
    })
  })
}

const onClickShow = () => {
  router.push({ path: `/ip/${props.data}`, query: { ...route.query } })
}
</script>

<style scoped lang="scss">
.ip__slot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ip__slot-text {
  margin-left: 0.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
}

.ip__slot-actions {
  display: none;
}

.ip__slot:hover .ip__slot-actions {
  display: flex;
}

.ip__slot-actions {
  display: none;
  align-items: center;
}

.icon__delete {
  color: #791919;
}

.icon__copy {
  color: #808a96;
}

.icon__show {
  color: #1c4385;
}
</style>

