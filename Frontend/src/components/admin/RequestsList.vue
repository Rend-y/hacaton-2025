<template>
  <VirtualScroll
    :items="taskRequestStore.requests"
    :loading="loading"
    ref="virtualScroll"
    @loadMore="loadMoreItems"
  >
    <template #default="{ item }">
      <RequestCard
        :preview="item.preview"
        :title="item.title"
        :description="item.description"
        :status="item.status"
      />
    </template>
  </VirtualScroll>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import RequestCard from './RequestCard.vue'
import VirtualScroll from '../common/VirtualScroll.vue'
import { useTaskRequestStore } from '@/stores/taskRequestStore'
import type { TaskRequest } from '@/stores/taskRequestStore'

const taskRequestStore = useTaskRequestStore()

const loading = ref(false)
const virtualScroll = ref<InstanceType<typeof VirtualScroll> | null>(null)

// Функция для загрузки элементов
const loadMoreItems = async () => {
  console.log('loadMoreItems')
  if (loading.value) return
  
  loading.value = true

  const newRequests = await taskRequestStore.fetchRequests()
  
  // Имитация задержки загрузки
  await new Promise(resolve => setTimeout(resolve, 500))

  // Загружаем все оставшиеся элементы
  taskRequestStore.requests = [...taskRequestStore.requests, ...newRequests]
  
  console.log(taskRequestStore.requests.length)
  
  loading.value = false
}

// Инициализация
onMounted(() => {
  loadMoreItems()
})
</script>

<style scoped>
:deep(.virtual-scroll-container) {
  height: 100vh;
}

:deep(.virtual-scroll-content) {
  padding: 1rem;
}
</style> 