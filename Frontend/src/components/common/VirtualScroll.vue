<template>
  <div class="virtual-scroll-container" ref="container" @scroll="handleScroll">
    <div class="virtual-scroll-content" :style="{ height: `${props.items.length * 100}px` }">
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        :style="{ transform: `translateY(${startIndex * 100}px)` }"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
    <div v-if="loading" class="loading">
      <slot name="loading">Загрузка...</slot>
    </div>
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

interface Props {
  items: any[]
  bufferSize?: number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bufferSize: 5,
  loading: false
})

const container = ref<HTMLElement | null>(null)
const sentinel = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const startIndex = ref(0)

const emit = defineEmits<{
  (e: 'loadMore'): void
}>()

const visibleItems = computed(() => {
  if (!container.value) return []
  
  const containerHeight = container.value.clientHeight
  const visibleCount = Math.ceil(containerHeight / 100)
  startIndex.value = Math.max(0, Math.floor(scrollTop.value / 100) - props.bufferSize)
  const endIndex = Math.min(
    props.items.length,
    startIndex.value + visibleCount + props.bufferSize * 2
  )
  
  return props.items.slice(startIndex.value, endIndex)
})

// Следим за изменениями в items
watch(() => props.items, async () => {
  await nextTick()
  if (container.value) {
    handleScroll()
  }
}, { deep: true })

const handleScroll = () => {
  if (!container.value) return
  scrollTop.value = container.value.scrollTop
}

onMounted(() => {
  if (!sentinel.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !props.loading) {
        emit('loadMore')
      }
    },
    {
      root: container.value,
      threshold: 0.1
    }
  )

  observer.observe(sentinel.value)
})

defineExpose({
  container
})
</script>

<style scoped>
.virtual-scroll-container {
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.virtual-scroll-content {
  position: relative;
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.sentinel {
  height: 1px;
  width: 100%;
}
</style> 