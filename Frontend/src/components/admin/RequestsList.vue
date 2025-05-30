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

enum RequestStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  COMPLETED = 'completed'
}

const statusLabels = {
  [RequestStatus.NEW]: 'Новая',
  [RequestStatus.IN_PROGRESS]: 'В работе',
  [RequestStatus.PENDING]: 'В ожидании',
  [RequestStatus.COMPLETED]: 'Выполнено'
}

// Константы для виртуального скролла
const ITEM_HEIGHT = 100 // Примерная высота элемента в пикселях
const BUFFER_SIZE = 5 // Количество элементов для буфера
const ITEMS_PER_PAGE = 10 // Количество элементов для загрузки за раз

const container = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const loading = ref(false)

// Предопределенный массив всех задач
const allTasks = [
  {
    preview: 'Разработка мобильного приложения для доставки еды с функцией отслеживания заказа...',
    title: 'FoodDelivery App',
    description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
    {
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    expanded: false,
    status: RequestStatus.NEW
  },
    {
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    expanded: false,
    status: RequestStatus.NEW
  },
    {
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для краудфандинга...',
    title: 'Crowdfunding Platform',
    description: 'Разработка платформы для сбора средств на проекты с системой верификации и автоматическим распределением средств.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления контентом для медиа...',
    title: 'Media CMS',
    description: 'Создание системы управления контентом для медиа-компаний с поддержкой мультимедиа и автоматической публикацией.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-консультаций...',
    title: 'Online Consultation Platform',
    description: 'Разработка платформы для проведения онлайн-консультаций с поддержкой видеозвонков и системой оплаты.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  }
]

// Текущие загруженные задачи
const loadedTasks = ref<typeof allTasks>([])

// Вычисляем видимые элементы
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

function toggle(index: number) {
  const item = visibleItems.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}
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