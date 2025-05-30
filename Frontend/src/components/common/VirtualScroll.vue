<template>
  <div 
    class="virtual-scroll-container" 
    ref="container" 
    @scroll="handleScroll"
  >
    <div 
      class="virtual-scroll-content" 
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="getItemKey(item, index)"
        :style="{ transform: `translateY(${startIndex * itemHeight}px)` }"
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  items: any[]
  bufferSize?: number
  loading?: boolean
  itemHeight?: number
  getItemKey?: (item: any, index: number) => string | number
}

const props = withDefaults(defineProps<Props>(), {
  bufferSize: 5,
  loading: false,
  itemHeight: 100,
  getItemKey: (_, index) => index
})

const emit = defineEmits<{
  (e: 'loadMore'): void
}>()

// Refs
const container = ref<HTMLElement | null>(null)
const sentinel = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const startIndex = ref(0)
const observer = ref<IntersectionObserver | null>(null)

// Computed
const totalHeight = computed(() => props.items.length * props.itemHeight)

const visibleItems = computed(() => {
  if (!container.value) return []
  
  const containerHeight = container.value.clientHeight
  const visibleCount = Math.ceil(containerHeight / props.itemHeight)
  
  startIndex.value = Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.bufferSize)
  const endIndex = Math.min(
    props.items.length,
    startIndex.value + visibleCount + props.bufferSize * 2
  )
  
  return props.items.slice(startIndex.value, endIndex)
})

// Methods
const handleScroll = () => {
  if (!container.value) return
  scrollTop.value = container.value.scrollTop
}

const setupIntersectionObserver = () => {
  if (!sentinel.value || !container.value) return

  observer.value = new IntersectionObserver(
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

  observer.value.observe(sentinel.value)
}

// Lifecycle hooks
onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

// Watchers
watch(() => props.items, async () => {
  await nextTick()
  if (container.value) {
    handleScroll()
  }
}, { deep: true })

// Expose
defineExpose({
  container
})
</script>

<style scoped>
.virtual-scroll-container {
  height: 100%;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

.virtual-scroll-content {
  position: relative;
  will-change: transform; /* Optimize for animations */
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.sentinel {
  height: 1px;
  width: 100%;
  pointer-events: none; /* Prevent interference with scrolling */
}
</style> 