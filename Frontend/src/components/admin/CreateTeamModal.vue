<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2 class="modal-title">Создать команду</h2>
      <form @submit.prevent="handleSubmit" class="team-form">
        <div class="form-group">
          <label for="name" class="form-label">Название команды</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Введите название команды"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="projectType" class="form-label">Тип команды</label>
          <input
            id="projectType"
            v-model="formData.projectType"
            type="text"
            required
            placeholder="Введите тип команды"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="techStack" class="form-label">Технологии (через запятую)</label>
          <input
            id="techStack"
            v-model="techStackInput"
            type="text"
            placeholder="React, Vue, Node.js"
            @input="updateTechStack"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <div class="members-header">
            <label class="form-label">Участники команды</label>
            <button type="button" class="add-member-btn" @click="addMember">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Добавить участника
            </button>
          </div>
          
          <div class="members-list">
            <div v-for="(member, index) in formData.members" :key="index" class="member-item">
              <div class="member-inputs">
                <input
                  v-model="member.name"
                  type="text"
                  placeholder="Имя участника"
                  required
                  class="form-input"
                />
                <input
                  v-model="member.role"
                  type="text"
                  placeholder="Роль"
                  required
                  class="form-input"
                />
              </div>
              <button type="button" class="remove-member-btn" @click="removeMember(index)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="closeModal">Отмена</button>
          <button type="submit" class="submit-btn">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Team, TeamMember } from '@/stores/teamStore'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Omit<Team, 'id' | 'status'>): void
}>()

const formData = ref({
  name: '',
  projectType: '',
  techStack: [] as string[],
  members: [] as TeamMember[]
})

const techStackInput = ref('')

const updateTechStack = () => {
  formData.value.techStack = techStackInput.value
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
}

const addMember = () => {
  formData.value.members.push({
    id: Date.now().toString(),
    name: '',
    role: ''
  })
}

const removeMember = (index: number) => {
  formData.value.members.splice(index, 1)
}

const handleSubmit = () => {
  emit('submit', {
    name: formData.value.name,
    projectType: formData.value.projectType,
    techStack: formData.value.techStack,
    members: formData.value.members
  })
  closeModal()
}

const closeModal = () => {
  formData.value = {
    name: '',
    projectType: '',
    techStack: [],
    members: []
  }
  techStackInput.value = ''
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 36, 77, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(44, 36, 77, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c244d;
  margin-bottom: 1.5rem;
}

.team-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 1rem;
  color: #2c244d;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.form-input {
  background: #ede6fa;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  color: #2c244d;
  margin-bottom: 0.2rem;
  box-shadow: 0 1px 4px 0 rgba(136,95,255,0.04);
  transition: box-shadow 0.2s;
  width: 100%;
  min-height: 48px;
  height: 48px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #b16fff;
}

.form-input::placeholder {
  color: #b6a9d6;
  opacity: 1;
}

.members-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-member-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #7b5cff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-member-btn:hover {
  background: #6a4de8;
  transform: translateY(-1px);
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.member-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.member-inputs {
  flex: 1;
  display: flex;
  gap: 0.75rem;
}

.member-inputs input {
  flex: 1;
}

.remove-member-btn {
  padding: 0.75rem;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-member-btn:hover {
  background: #fecaca;
  transform: translateY(-1px);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #ede6fa;
  color: #2c244d;
  border: none;
}

.submit-btn {
  background: #7b5cff;
  color: white;
  border: none;
}

.submit-btn:hover {
  background: #6a4de8;
  transform: translateY(-1px);
}

.cancel-btn:hover {
  background: #e0d5f7;
  transform: translateY(-1px);
}
</style> 