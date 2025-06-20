<template>
  <div class="teams-container">
    <div class="teams-header">
      <h2>Команды</h2>
      <button class="create-team-btn" @click="openCreateModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Создать команду
      </button>
    </div>

    <VirtualScroll
      :items="teamStore.teams"
      :loading="loading"
      ref="virtualScroll"
      @loadMore="loadMoreItems"
    >
      <template #default="{ item }: { item: Team }">
        <div class="team-card" @click="toggleTeam(item.id)">
          <div class="team-card-header">
            <div class="team-avatar">
              {{ item.name[0].toUpperCase() }}
            </div>
            <div class="team-info">
              <strong>{{ item.name }}</strong>
              <div v-if="!expandedTeams[item.id]" class="team-preview">
                {{ item.projectType }}
              </div>
            </div>
            <div class="team-status" :class="item.status">
              {{ statusLabels[item.status] }}
            </div>
            <div class="arrow" :class="{ 'arrow-up': expandedTeams[item.id] }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <button class="edit-team-btn" @click.stop="openEditModal(item)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 0 0 .707-.293l9.414-9.414a2 2 0 0 0 0-2.828l-3.172-3.172a2 2 0 0 0-2.828 0l-9.414 9.414A1 1 0 0 0 4 20z" stroke="#7b5cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <transition name="expand">
            <div v-if="expandedTeams[item.id]" class="team-card-body">
              <div class="team-section">
                <h4>Состав команды:</h4>
                <div class="team-members">
                  <div v-for="member in item.members" :key="member.id" class="team-member">
                    <div class="member-avatar">{{ member.name[0].toUpperCase() }}</div>
                    <div class="member-info">
                      <div class="member-name">{{ member.name }}</div>
                      <div class="member-role">{{ member.role }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="team-section">
                <h4>Стек технологий:</h4>
                <div class="tech-stack">
                  <span v-for="tech in item.techStack" :key="tech" class="tech-badge">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </template>
    </VirtualScroll>

    <CreateTeamModal
      :is-open="isCreateModalOpen"
      :team="editTeam"
      @close="closeCreateModal"
      @submit="handleTeamModalSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import VirtualScroll from '../common/VirtualScroll.vue'
import CreateTeamModal from '../common/CreateTeamModal.vue'
import { useTeamStore } from '../../stores/teamStore'
import type { Team } from '../../stores/teamStore'

const teamStore = useTeamStore()
const loading = ref(false)
const virtualScroll = ref<InstanceType<typeof VirtualScroll> | null>(null)
const expandedTeams = ref<Record<string | number, boolean>>({})
const isCreateModalOpen = ref(false)
const editTeam = ref<Team | null>(null)

const statusLabels: Record<Team['status'], string> = {
  'available': 'Доступна',
  'in_project': 'В проекте',
  'on_break': 'На перерыве'
}

const toggleTeam = (teamId: string | number) => {
  expandedTeams.value[teamId] = !expandedTeams.value[teamId]
}

const loadMoreItems = async () => {
  if (loading.value) return
  
  loading.value = true
  await teamStore.fetchTeams()
  loading.value = false
}

const openCreateModal = () => {
  isCreateModalOpen.value = true
  editTeam.value = null
}

const openEditModal = (team: Team) => {
  editTeam.value = team
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  editTeam.value = null
}

const handleTeamModalSubmit = (teamData: Team) => {
  if (teamData.id !== undefined) {
    teamStore.updateTeam(teamData)
  } else {
    teamStore.createTeam(teamData)
  }
}

onMounted(() => {
  loadMoreItems()
})
</script>

<style scoped>
.teams-container {
  padding: 1rem;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.teams-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.teams-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2a262b;
}

.create-team-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #7b5cff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-team-btn:hover {
  background: #6a4de8;
  transform: translateY(-1px);
}

.create-team-btn svg {
  width: 20px;
  height: 20px;
}

.team-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #eaeaea;
}

.team-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d2b4f5;
}

.team-card-header {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1.25rem;
  align-items: center;
}

.team-avatar {
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

.team-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow: hidden;
}

.team-info strong {
  font-size: 1.1rem;
  color: #2a262b;
  font-weight: 600;
}

.team-preview {
  font-size: 0.95rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.team-status {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
}

.team-status.available {
  background-color: #e8f5e9;
  color: #388e3c;
}

.team-status.in_project {
  background-color: #fff3e0;
  color: #f57c00;
}

.team-status.on_break {
  background-color: #f3e5f5;
  color: #7b1fa2;
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

.team-card-body {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eaeaea;
}

.team-section {
  margin-bottom: 1.5rem;
}

.team-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2a262b;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.team-member:hover {
  background: #f3f4f6;
}

.member-avatar {
  background-color: #6366f1;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-weight: 500;
  font-size: 0.9rem;
}

.member-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-weight: 500;
  color: #2a262b;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.member-role {
  font-size: 0.85rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tech-badge:hover {
  background: #e0e7ff;
  transform: translateY(-1px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px;
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

.edit-team-btn {
  background: #ede6fa;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s, box-shadow 0.2s;
}
.edit-team-btn:hover {
  background: #d2b4f5;
  box-shadow: 0 2px 8px rgba(123, 92, 255, 0.08);
}

@media (max-width: 600px) {
  .team-card {
    padding: 1rem;
  }
  
  .team-card-header {
    gap: 0.75rem;
  }
  
  .team-avatar {
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 0.9rem;
  }
  
  .team-info strong {
    font-size: 1rem;
  }
  
  .team-preview {
    font-size: 0.85rem;
  }
  
  .team-status {
    padding: 4px 8px;
    font-size: 0.85rem;
  }
  
  .team-members {
    grid-template-columns: 1fr;
  }
}

.virtual-scroll-container {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
}

.requests-container {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style> 