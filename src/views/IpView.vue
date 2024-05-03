<template>
  <div class="container">
    <h1>Инфо IP адреса</h1>

    <el-descriptions
      border
      :title="route.params.query"
    >
      <el-descriptions-item
        v-for="(item, index) in getItem"
        :key="index"
        :label="index"
      >
        {{ item }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { useIpStore } from '@/store/ip'
import { computed, onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'

// store
const store = useIpStore()

// data
const route = useRoute()
const isLoading = ref(false)

// computed
const getItem = computed(() => store.getItem)

// methods
const loadItem = async () => {
  isLoading.value = true
  try {
    await store.GET(route.params.query.toString())
  } catch (e) {
    ElNotification({
      message: 'Ошибка сервера',
      type: 'error',
    })
  } finally {
    isLoading.value = false
  }
}

// hooks
onMounted(() => {
  loadItem()
})
</script>
