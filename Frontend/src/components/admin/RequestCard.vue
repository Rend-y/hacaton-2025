<template>
  <div class="card" @click="toggle">
    <div class="card-header">
      <div class="avatar">A</div>
      <div class="info">
        <strong>Заявка</strong>
        <div v-if="!expanded" class="desc">
          {{ preview }}
        </div>
      </div>
      <div class="status" :class="status">{{ statusLabels[status] }}</div>
      <div class="arrow" :class="{ 'arrow-up': expanded }">{{ expanded ? '▲' : '▼' }}</div>
    </div>

    <transition name="expand">
      <div v-if="expanded" class="card-body">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-desc">{{ description }}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

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

interface Props {
  preview: string
  title: string
  description: string
  status: RequestStatus
}

const props = defineProps<Props>()
const expanded = ref(false)

const toggle = () => {
  expanded.value = !expanded.value
}
</script>

<style scoped>
.card {
  background: #f7effa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 0 0 1px #ddd;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  align-items: center;
}

.avatar {
  background-color: #d2b4f5;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-weight: bold;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
}

.info strong {
  font-size: 1rem;
}

.desc {
  font-size: 0.9rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: capitalize;
  white-space: nowrap;
}

.status.new {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status.in_progress {
  background-color: #fff3e0;
  color: #f57c00;
}

.status.pending {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.status.completed {
  background-color: #e8f5e9;
  color: #388e3c;
}

.arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.card-body {
  margin-top: 1rem;
  will-change: transform, opacity, max-height;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  overflow: hidden;
}
</style> 