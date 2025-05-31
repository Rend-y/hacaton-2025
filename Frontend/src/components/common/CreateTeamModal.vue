<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2 class="modal-title">{{ isEditMode ? 'Редактировать команду' : 'Создать команду' }}</h2>
      <form @submit.prevent="handleSubmit" class="team-form">
        <CustomInput
          id="name"
          v-model="formData.name"
          label="Название команды"
          placeholder="Введите название команды"
          required
        />

        <CustomInput
          id="projectType"
          v-model="formData.projectType"
          label="Тип команды"
          placeholder="Введите тип команды"
          required
        />

        <CustomInput
          id="techStack"
          v-model="techStackInput"
          label="Технологии (через запятую)"
          placeholder="React, Vue, Node.js"
          @input="updateTechStack"
        />

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
                <CustomInput
                  :id="'member-name-' + index"
                  v-model="member.name"
                  label="Имя участника"
                  placeholder="Введите имя участника"
                  required
                />
                <CustomInput
                  :id="'member-role-' + index"
                  v-model="member.role"
                  label="Роль"
                  placeholder="Введите роль"
                  required
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
          <button type="submit" class="submit-btn">{{ isEditMode ? 'Сохранить' : 'Создать' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Team, TeamMember } from '@/stores/teamStore'
import CustomInput from '@/components/CustomInput.vue'

const props = defineProps<{
  isOpen: boolean,
  team?: Team | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Partial<Team> & {id?: number}): void
}>()

const isEditMode = computed(() => !!props.team)

const formData = ref({
  name: '',
  projectType: '',
  techStack: [] as string[],
  members: [] as TeamMember[]
})

const techStackInput = ref('')

watch(() => props.team, (team) => {
  if (team) {
    formData.value = {
      name: team.name,
      projectType: team.projectType,
      techStack: [...team.techStack],
      members: team.members.map(m => ({ ...m }))
    }
    techStackInput.value = team.techStack.join(', ')
  } else {
    formData.value = {
      name: '',
      projectType: '',
      techStack: [],
      members: []
    }
    techStackInput.value = ''
  }
}, { immediate: true })

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
    ...(isEditMode.value ? { id: props.team!.id } : {}),
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

.member-inputs :deep(.custom-input) {
  flex: 1;
}

.remove-member-btn {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  padding: 0;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 1.7rem;
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