<template>
  <div class="requests-list">
    <div class="controls">
      <CustomInput
        v-model="searchQuery"
        placeholder="Поиск по названию или описанию"
        icon="SearchIcon"
      />
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
        :items="taskRequestStore.getRequests"
        :loading="loading"
        ref="virtualScroll"
        @loadMore="loadMoreItems"
      >
        <template #default="{ item }">
          <RequestCard
            :id="item.id"
            :preview="item.preview"
            :title="item.project.name"
            :description="item.project.description"
            :status="item.status"
            :deadline="item.deadline"
            :assigned-team-id="item.assignedTeamId?.toString()"
            :is-expanded="!!expandedRequestIds[item.id]"
            :company-name="item.contact.name"
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
import { ref, computed, onMounted, reactive, watch } from 'vue'
import RequestCard from './RequestCard.vue'
import AssignTeamModal from './AssignTeamModal.vue'
import CustomInput from '@/components/CustomInput.vue'
import VirtualScroll from '../common/VirtualScroll.vue'
import { useTaskRequestStore } from '@/stores/taskRequestStore'
import type { FormTaskRequest } from '@/stores/taskRequestStore'
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
const searchQuery = ref('')

const handleAssignTeam = (request: FormTaskRequest) => {
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
        // Обновляем заявку в store
        await taskRequestStore.assignTeam(request.id, +teamId)
      
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

const toggleRequest = (request: FormTaskRequest) => {
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

// Функция для загрузки элементов
const loadMoreItems = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    await taskRequestStore.fetchRequests(searchQuery.value, sortBy.value)
    
  } catch (error) {
    console.error('Error loading requests:', error)
  } finally {
    loading.value = false
  }
}

watch(sortBy, async () => {
  taskRequestStore.clearRequests();
  loadMoreItems()
})

watch(searchQuery, async () => {
  taskRequestStore.clearRequests();
  loadMoreItems()
})

// Инициализация
onMounted(async () => {
  if (taskRequestStore.getRequests.length > 0) return
  loadMoreItems()
})
</script>

<style scoped>
.requests-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.controls {
  padding: 1.25rem;
  background: white;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
}

:deep(.custom-input) {
  max-width: 67rem;
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

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 0.5rem;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 400px;
}

.search-wrapper:hover {
  background: #ede6fa;
}

.search-wrapper:focus-within {
  background: #ede6fa;
  box-shadow: 0 0 0 2px #7b5cff40;
}

.search-icon {
  color: #7b5cff;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.search-input {
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 0.95rem;
  color: #2a262b;
  width: 100%;
  font-weight: 500;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #6c757d;
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
  .controls {
    padding: 1rem;
    flex-direction: column;
  }

  .sort-wrapper {
    max-width: none;
    width: 100%;
  }
}
</style> 