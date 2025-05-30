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
      <div class="arrow" :class="{ 'arrow-up': expanded }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
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
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #eaeaea;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d2b4f5;
}

.card-header {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1.25rem;
  align-items: center;
}

.avatar {
  background-color: #7b5cff;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: 600;
  font-size: 1.1rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow: hidden;
}

.info strong {
  font-size: 1.1rem;
  color: #2a262b;
  font-weight: 600;
}

.desc {
  font-size: 0.95rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
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
  color: #666;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow svg {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-up svg {
  transform: rotate(180deg);
}

.card-body {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eaeaea;
  will-change: transform, opacity, max-height;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2a262b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  font-size: 1rem;
  line-height: 1.5;
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

@media (max-width: 600px) {
  .card {
    padding: 1rem;
  }
  
  .card-header {
    gap: 0.75rem;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 0.9rem;
  }
  
  .info strong {
    font-size: 1rem;
  }
  
  .desc {
    font-size: 0.85rem;
  }
  
  .status {
    padding: 4px 8px;
    font-size: 0.85rem;
  }
}
</style> 