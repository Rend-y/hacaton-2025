<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Выберите команду</h3>
        <button class="close-button" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="teams-list">
        <div 
          v-for="team in availableTeams" 
          :key="team.id" 
          class="team-item"
          :class="{ 'selected': selectedTeamId === team.id }"
          @click="selectTeam(team)"
        >
          <div class="team-info">
            <div class="team-name">{{ team.name }}</div>
            <div class="team-details">
              <span class="team-type">{{ team.projectType }}</span>
              <span class="team-stack">{{ team.techStack.join(', ') }}</span>
            </div>
            <div class="team-members">
              {{ team.members.length }} участников
            </div>
          </div>
          <div class="team-status" :class="team.status">
            {{ statusLabels[team.status] }}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-button" @click="closeModal">Отмена</button>
        <button 
          class="assign-button" 
          :disabled="!selectedTeamId" 
          @click="assignSelectedTeam"
        >
          Назначить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import type { Team } from '@/stores/teamStore'

interface Props {
  isOpen: boolean
  requestId?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'assign'])

const teamStore = useTeamStore()
const selectedTeamId = ref<string | null>(null)

const statusLabels = {
  'available': 'Доступна',
  'in_project': 'В проекте',
  'on_break': 'На перерыве'
}

const availableTeams = ref<Team[]>([])

onMounted(async () => {
  await teamStore.fetchTeams()
  availableTeams.value = teamStore.teams
})

const selectTeam = (team: Team) => {
  selectedTeamId.value = team.id
}

const closeModal = () => {
  selectedTeamId.value = null
  emit('close')
}

const assignSelectedTeam = () => {
  if (selectedTeamId.value) {
    const selectedTeam = availableTeams.value.find(team => team.id === selectedTeamId.value)
    emit('assign', { teamId: selectedTeamId.value, team: selectedTeam })
    closeModal()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2a262b;
}

.close-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #f3f4f6;
  color: #2a262b;
}

.teams-list {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.team-item {
  padding: 1rem;
  border: 2px solid #eaeaea;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.team-item:hover {
  border-color: #7b5cff;
  background: #f8f7ff;
}

.team-item.selected {
  border-color: #7b5cff;
  background: #f8f7ff;
}

.team-info {
  flex: 1;
  min-width: 0;
}

.team-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2a262b;
  margin-bottom: 0.5rem;
}

.team-details {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.team-stack {
  color: #7b5cff;
}

.team-members {
  font-size: 0.9rem;
  color: #666;
}

.team-status {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
}

.team-status.available {
  background: #e8f5e9;
  color: #388e3c;
}

.team-status.in_project {
  background: #fff3e0;
  color: #f57c00;
}

.team-status.on_break {
  background: #f3e5f5;
  color: #7b1fa2;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  border: 1px solid #eaeaea;
  background: white;
  border-radius: 12px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.assign-button {
  padding: 0.75rem 1.5rem;
  background: #7b5cff;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.assign-button:hover:not(:disabled) {
  background: #6344eb;
}

.assign-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .modal-content {
    width: 95%;
  }

  .team-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .team-status {
    align-self: flex-start;
  }
}
</style> 