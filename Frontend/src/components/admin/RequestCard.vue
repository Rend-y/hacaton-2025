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
      <div class="arrow">{{ expanded ? '▲' : '▼' }}</div>
    </div>

    <div v-if="expanded" class="card-body">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.avatar {
  background-color: #d2b4f5;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-weight: bold;
  margin-right: 1rem;
}

.info {
  flex: 1;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 1rem;
  text-transform: capitalize;
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
  margin-left: auto;
}

.card-body {
  margin-top: 1rem;
}
</style> 