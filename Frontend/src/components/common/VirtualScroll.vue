<template>
  <div class="virtual-scroll-container" ref="container" @scroll="handleScroll">
    <div class="virtual-scroll-content">
      <slot
        v-for="(item, index) in visibleItems"
        :key="index"
        :item="item"
        :index="index"
      />
    </div>
    <div v-if="loading" class="loading">
      <slot name="loading">Загрузка...</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'

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
const scrollTop = ref(0)

const visibleItems = computed(() => {
  if (!container.value) return []
  
  const containerHeight = container.value.clientHeight
  const visibleCount = Math.ceil(containerHeight / 100)
  const startIndex = Math.max(0, Math.floor(scrollTop.value / 100) - props.bufferSize)
  const endIndex = Math.min(
    props.items.length,
    startIndex + visibleCount + props.bufferSize * 2
  )
  
  return props.items.slice(startIndex, endIndex)
})

const handleScroll = () => {
  if (!container.value) return
  scrollTop.value = container.value.scrollTop
}

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
</style> 