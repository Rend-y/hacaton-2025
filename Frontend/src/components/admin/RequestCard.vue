<template>
  <div class="card" @click="$emit('toggle')">
    <div class="card-header">
      <div class="avatar">A</div>
      <div class="info">
        <strong>Заявка #{{ id }} ({{ companyName }})</strong>
        <div class="deadline" :class="{ urgent: isDeadlineUrgent(deadline) }">
          {{ formatDeadline(deadline) }}
        </div>
      </div>
      <div class="status" :class="status">
        <select 
          class="status-select" 
          :value="status"
          @change="handleStatusChange"
          @click.stop
          :class="status"
        >
          <option 
            v-for="(label, value) in statusLabels" 
            :key="value" 
            :value="value"
          >
            {{ label }}
          </option>
        </select>
      </div>
      <button class="expand-button" :class="{ 'expanded': isExpanded }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <transition name="expand">
      <div v-if="isExpanded" class="card-body">
        <div class="card-content">
          <h4 class="card-title">{{ title }}</h4>
          <p class="card-desc">{{ description }}</p>
          <div v-if="assignedTeam" class="assigned-team">
            <div class="team-info">
              <svg class="team-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Назначенная команда: <strong>{{ assignedTeam.name }}</strong></span>
            </div>
          </div>
        </div>
        <div v-if="status === RequestStatus.NEW" class="card-actions">
          <button class="action-button" @click.stop="$emit('assignTeam')">
            <svg class="action-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Назначить команду
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import type { Team } from '@/stores/teamStore'
import { RequestStatus, statusLabels } from '@/stores/taskRequestStore'

interface Props {
  preview: string
  title: string
  description: string
  status: RequestStatus
  deadline: string
  isExpanded: boolean
  assignedTeamId?: string
  id: number
  companyName: string
}

const props = defineProps<Props>()
const emit = defineEmits(['toggle', 'assignTeam', 'statusChange'])
const teamStore = useTeamStore()

const assignedTeam = computed(() => {
  if (!props.assignedTeamId) return null
  return teamStore.teams.find(team => team.id === props.assignedTeamId)
})

const isDeadlineUrgent = (deadline: string) => {
  const deadlineDate = new Date(deadline)
  const now = new Date()
  const diffTime = deadlineDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays < 10
}

const formatDeadline = (deadline: string) => {
  const deadlineDate = new Date(deadline)
  const now = new Date()
  const diffTime = deadlineDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(deadlineDate)
  
  return `Дедлайн: ${formattedDate} (осталось ${diffDays} дн.)`
}

const handleStatusChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('statusChange', {
    id: props.id,
    status: target.value as RequestStatus
  })
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
  grid-template-columns: auto 1fr auto auto auto;
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
  padding: 0;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
}

.status-select {
  appearance: none;
  border: none;
  padding: 6px 24px 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  color: inherit;
  width: 100%;
  text-align: center;
  position: relative;
}

.status-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(123, 92, 255, 0.2);
}

.status-select option {
  background-color: white;
  color: #2a262b;
}

.status.new {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status.in_progress {
  background-color: #fff3e0;
  color: #f57c00;
}

.status.completed {
  background-color: #e8f5e9;
  color: #388e3c;
}

.expand-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50%;
}

.expand-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.expand-button.expanded svg {
  transform: rotate(180deg);
}

.expand-button svg {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-body {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eaeaea;
  will-change: transform, opacity, max-height;
  display: flex;
  gap: 2rem;
}

.card-content {
  flex: 1;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
  justify-content: center;
  align-self: center;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #7b5cff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #6344eb;
  transform: translateY(-1px);
}

.action-button:active {
  transform: translateY(0);
}

.action-icon {
  color: currentColor;
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

.deadline {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

.deadline.urgent {
  color: #dc2626;
  font-weight: 500;
}

.assigned-team {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eaeaea;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #666;
  font-size: 0.95rem;
}

.team-info strong {
  color: #2a262b;
}

.team-icon {
  color: #7b5cff;
  flex-shrink: 0;
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

@media (max-width: 768px) {
  .card-body {
    flex-direction: column;
    gap: 1rem;
  }

  .card-actions {
    min-width: 0;
  }
}
</style> 