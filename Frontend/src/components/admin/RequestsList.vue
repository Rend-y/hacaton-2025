<template>
  <div class="requests-container" ref="container" @scroll="handleScroll">
    <div class="requests-list">
      <RequestCard
        v-for="(item, index) in visibleItems"
        :key="index"
        :preview="item.preview"
        :title="item.title"
        :description="item.description"
        :status="item.status"
      />
    </div>
    <div v-if="loading" class="loading">Загрузка...</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import RequestCard from './RequestCard.vue'
import { useTaskRequestStore } from '@/stores/taskRequestStore'
import type { TaskRequest } from '@/stores/taskRequestStore'

const taskRequestStore = useTaskRequestStore()

const allTasks = taskRequestStore.requests

// Константы для виртуального скролла
const ITEM_HEIGHT = 100 // Примерная высота элемента в пикселях
const BUFFER_SIZE = 5 // Количество элементов для буфера
const ITEMS_PER_PAGE = 10 // Количество элементов для загрузки за раз

const container = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const loading = ref(false)

const loadedTasks = ref<TaskRequest[]>([])

const visibleItems = computed(() => {
  if (!container.value) return []
  
  const containerHeight = container.value.clientHeight
  const startIndex = Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER_SIZE
  const endIndex = Math.ceil((scrollTop.value + containerHeight) / ITEM_HEIGHT) + BUFFER_SIZE
  
  return loadedTasks.value.slice(
    Math.max(0, startIndex),
    Math.min(loadedTasks.value.length, endIndex)
  )
})

// Функция для загрузки новых элементов
const loadMoreItems = async () => {
  if (loading.value) return
  
  loading.value = true
  
  // Имитация задержки загрузки
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const start = loadedTasks.value.length
  const end = Math.min(start + ITEMS_PER_PAGE, allTasks.length)
  
  if (start < allTasks.length) {
    loadedTasks.value = [...loadedTasks.value, ...allTasks.slice(start, end)]
  }
  
  loading.value = false
}

// Обработчик скролла
const handleScroll = () => {
  if (!container.value) return
  
  scrollTop.value = container.value.scrollTop
  
  // Проверяем, нужно ли загрузить еще элементы
  const scrollHeight = container.value.scrollHeight
  const clientHeight = container.value.clientHeight
  const scrollBottom = scrollTop.value + clientHeight
  
  if (scrollHeight - scrollBottom < 500 && loadedTasks.value.length < allTasks.length) {
    loadMoreItems()
  }
}

// Инициализация
onMounted(() => {
  loadMoreItems()
})
</script>

<style scoped>
.requests-container {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}

.requests-list {
  padding: 1rem;
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}
</style> 