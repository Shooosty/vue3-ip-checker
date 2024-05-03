<template>
  <div class="container">
    <h1>Проверка IP адресов</h1>

    <div>
      <el-form
        ref="formRef"
        :model="resource"
        :rules="rules"
      >
        <el-form-item prop="ip_list">
          <el-input
            v-model="resource.ip_list"
            :autosize="{ minRows: 4, maxRows: 24 }"
            type="textarea"
            placeholder="Введите ip адреса"
          />
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        :loading="isLoading"
        @click.prevent="onClickAddNew"
      >
        Отправить
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { useIpStore } from '@/store/ip'

// store
const store = useIpStore()

// data
const formRef = ref<FormInstance>()
const isLoading = ref(false)
const resource = ref({
  ip_list: []
})

// rules
const rules = reactive<FormRules>({
  ip_list: [
    {
      required: true,
      message: 'Введите список ip',
      trigger: ['blur', 'change'],
    },
  ]
})

// methods
const onClickAddNew = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      isLoading.value = true
      try {
        const ipList = resource.value.ip_list
          .split(/[, \n]+/)
          .map(ip => ip.trim())
          .filter(ip => ip)

        if (ipList.length === 0) return

        await store.CREATE(ipList)
        ElNotification({
          message: 'Список IP отправлен на проверку',
          type: 'success'
        })
      } catch (e) {
        ElNotification({
          message: 'Ошибка сервера',
          type: 'error'
        })
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>
