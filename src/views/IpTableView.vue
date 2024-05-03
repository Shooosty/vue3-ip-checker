<template>
  <div class="container">
    <div class="page__header">
      <h1>Таблица IP адресов</h1>

      <RouterLink to="/new-ip">
        <el-button
          class="page__header-add__btn"
          type="primary"
        >
          Add more
        </el-button>
      </RouterLink>
    </div>

    <div class="page__table">
      <el-input
        v-model="searchData"
        size="large"
        class="page__header-search"
        placeholder="Table Search"
        :prefix-icon="Search"
        @input="handleSearch"
      />

      <el-button
        v-if="checkedRows.length"
        type="danger"
        class="delete__btn"
        @click="onClickCheckedDelete">
        Удалить выбранные
      </el-button>

      <UITable
        :items="filteredTableData"
        :is-loading="isLoading"
        :columns="columns"
        @on-click-checkbox="onClickCheckbox"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import Model from '@/models/ip-model'
import { useIpStore } from '@/store/ip'
import UITable from '@/components/UI/Table/UITable.vue'
import { RouterLink, useRoute } from 'vue-router'
import router from '@/router'
import { ElNotification } from 'element-plus'

// route
const route = useRoute()

// store
const store = useIpStore()

// computed
const getItems = computed(() => store.getItems)

// data
const columns = Model.columns
const isLoading = ref(false)
const checkedRows = ref([])
const searchData = ref('')
const filteredTableData = ref(getItems.value)

// methods
function debounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  let timerId: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const onClickCheckedDelete = () => {
  checkedRows.value.forEach((ITEM) => {
    store.DELETE(ITEM.query)
  })
  ElNotification({
    message: 'IP удалены',
    type: 'success'
  })
  checkedRows.value = []
}

const filterData = debounce(async () => {
  filteredTableData.value = getItems.value.filter(data =>
    !searchData.value ||
    Object.values(data).some(value => {
      if (typeof value === 'string' || typeof value === 'number') {
        router.push({ path: route.fullPath, query: { search: searchData.value } })
        return value.toString().toLowerCase().includes(searchData.value.toLowerCase())
      }
      return false
    })
  )
}, 300)

const handleSearch = () => {
  filterData()
}

const onClickCheckbox = (DATA) => {
  checkedRows.value = DATA
}

// watch
watch(
  () => route.query['search'], (VALUE) => {
    if (VALUE) {
      searchData.value = VALUE
      handleSearch()
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__table {
  display: flex;
  flex-direction: column;
}

.delete__btn {
  width: 12rem;
  margin: 0 1rem 1rem 0;
}

.page__header-add__btn {
  padding: 0.1rem 1rem;
}

.page__header-search {
  width: 33%;
  margin-bottom: 1rem;
}
</style>
