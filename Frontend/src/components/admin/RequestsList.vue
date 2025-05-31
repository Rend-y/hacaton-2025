<template>
  <div class="requests-list">
    <div class="sorting-controls">
      <div class="sort-wrapper">
        <svg class="sort-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 17H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <select v-model="sortBy" class="sort-select">
          <option value="status">По статусу</option>
          <option value="deadline">По дедлайну</option>
        </select>
      </div>
    </div>
    
    <div class="requests-container">
      <VirtualScroll
        :items="sortedRequests"
        :loading="loading"
        ref="virtualScroll"
        @loadMore="loadMoreItems"
      >
        <template #default="{ item }">
          <RequestCard
            :id="item.id"
            :preview="item.preview"
            :title="item.title"
            :description="item.description"
            :status="item.status"
            :deadline="item.deadline"
            :assigned-team-id="item.assignedTeamId"
            :is-expanded="!!expandedRequestIds[item.id]"
            :company-name="item.companyName"
            @toggle="toggleRequest(item)"
            @assignTeam="handleAssignTeam(item)"
            @statusChange="handleStatusChange"
          />
        </template>
      </VirtualScroll>
    </div>

    <AssignTeamModal
      :is-open="isAssignModalOpen"
      :request-id="selectedRequestId"
      @close="closeAssignModal"
      @assign="handleTeamAssigned"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import RequestCard from './RequestCard.vue'
import AssignTeamModal from './AssignTeamModal.vue'
import VirtualScroll from '../common/VirtualScroll.vue'
import { useTaskRequestStore } from '@/stores/taskRequestStore'
import type { TaskRequest } from '@/stores/taskRequestStore'
import { RequestStatus } from '@/stores/taskRequestStore'
import type { Team } from '@/stores/teamStore'
import { useTeamStore } from '@/stores/teamStore'

const taskRequestStore = useTaskRequestStore()
const loading = ref(false)
const virtualScroll = ref<InstanceType<typeof VirtualScroll> | null>(null)
const sortBy = ref<'status' | 'deadline'>('status')
const isAssignModalOpen = ref(false)
const selectedRequestId = ref<number | undefined>(undefined)
const expandedRequestIds = reactive<Record<number, boolean>>({})
const teamStore = useTeamStore()

const handleAssignTeam = (request: TaskRequest) => {
  selectedRequestId.value = request.id
  isAssignModalOpen.value = true
}

const closeAssignModal = () => {
  isAssignModalOpen.value = false
  selectedRequestId.value = undefined
}

const handleTeamAssigned = async ({ teamId, team }: { teamId: string, team: Team }) => {
  if (selectedRequestId.value) {
    const request = taskRequestStore.requests.find(r => r.id === selectedRequestId.value)
    if (request) {
      try {
        // Создаем обновленную версию заявки
        const updatedRequest = {
          ...request,
          status: RequestStatus.IN_PROGRESS,
          assignedTeamId: teamId
        }
        
        // Обновляем заявку в store
        await taskRequestStore.updateRequest(request.id, updatedRequest)
        
        // Принудительно обновляем состояние в store
        const index = taskRequestStore.requests.findIndex(r => r.id === request.id)
        if (index !== -1) {
          taskRequestStore.requests[index] = {
            ...taskRequestStore.requests[index],
            status: RequestStatus.IN_PROGRESS,
            assignedTeamId: teamId
          }
        }
        
        // Сворачиваем заявку
        expandedRequestIds[request.id] = false
        
        // Закрываем модальное окно
        closeAssignModal()
      } catch (error) {
        console.error('Error assigning team:', error)
        // TODO: Добавить уведомление об ошибке
      }
    }
  }
}

const toggleRequest = (request: TaskRequest) => {
  if (expandedRequestIds[request.id]) {
    expandedRequestIds[request.id] = false
  } else {
    expandedRequestIds[request.id] = true
  }
}

const handleStatusChange = async ({ id, status }: { id: number, status: RequestStatus }) => {
  const request = taskRequestStore.requests.find(r => r.id === id)
  if (request) {
    try {
      const updatedRequest = {
        ...request,
        status
      }
      await taskRequestStore.updateRequest(id, updatedRequest)
    } catch (error) {
      console.error('Error updating request status:', error)
      // TODO: Добавить уведомление об ошибке
    }
  }
}

const sortedRequests = computed(() => {
  const requests = [...taskRequestStore.requests]
  
  if (sortBy.value === 'status') {
    return requests.sort((a, b) => {
      const statusOrder: Record<RequestStatus, number> = {
        [RequestStatus.NEW]: 0,
        [RequestStatus.IN_PROGRESS]: 1,
        [RequestStatus.COMPLETED]: 2
      }
      return statusOrder[a.status] - statusOrder[b.status]
    })
  } else {
    return requests.sort((a, b) => {
      const dateA = new Date(a.deadline).getTime()
      const dateB = new Date(b.deadline).getTime()
      return dateA - dateB
    })
  }
})

// Функция для загрузки элементов
const loadMoreItems = async () => {
  console.log('loadMoreItems')
  if (loading.value) return
  
  loading.value = true

  const newRequests = await taskRequestStore.fetchRequests()
  
  // Имитация задержки загрузки
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log(taskRequestStore.requests.length)
  
  loading.value = false
}

// Инициализация
onMounted(async () => {
  await Promise.all([
    loadMoreItems(),
    teamStore.fetchTeams()
  ])
})
</script>

<style scoped>
.requests-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.sorting-controls {
  padding: 1.25rem;
  background: white;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

.requests-container {
  flex: 1;
  min-height: 0;
  position: relative;
}

:deep(.virtual-scroll-container) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

:deep(.virtual-scroll-content) {
  padding: 1rem;
}

.sort-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 0.5rem;
  transition: all 0.2s ease;
  max-width: 200px;
}

.sort-wrapper:hover {
  background: #ede6fa;
}

.sort-wrapper:focus-within {
  background: #ede6fa;
  box-shadow: 0 0 0 2px #7b5cff40;
}

.sort-icon {
  color: #7b5cff;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.sort-select {
  appearance: none;
  border: none;
  background: transparent;
  padding: 0.5rem;
  padding-right: 2rem;
  font-size: 0.95rem;
  color: #2a262b;
  cursor: pointer;
  width: 100%;
  font-weight: 500;
}

.sort-select:focus {
  outline: none;
}

.sort-wrapper::after {
  content: '';
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #7b5cff;
  pointer-events: none;
}

@media (max-width: 600px) {
  .sorting-controls {
    padding: 1rem;
  }

  .sort-wrapper {
    max-width: none;
    width: 100%;
  }

  .sort-select {
    font-size: 0.9rem;
  }
}
</style> 