<template>
  <main class="task-request">
    <h1 class="task-request__title">Создание заявки на IT-продукт</h1>
    
    <form @submit.prevent="submitRequest" role="form" aria-label="Форма создания заявки" class="task-request__form">
      <div v-if="error" role="alert" aria-live="polite" class="task-request__error">
        {{ error }}
      </div>

      <div class="task-request__content">
        <!-- Основная информация -->
        <section aria-labelledby="main-info-heading" class="task-request__section task-request__section--main-info">
          <h2 id="main-info-heading" class="task-request__section-title">Основная информация</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <label for="project-name" class="task-request__label">Название проекта</label>
              <input 
                id="project-name"
                v-model="formData.projectName"
                type="text"
                required
                aria-required="true"
                class="task-request__input"
              >
            </div>

            <div class="task-request__field">
              <label for="project-description" class="task-request__label">Описание проекта</label>
              <textarea 
                id="project-description"
                v-model="formData.description"
                rows="4"
                required
                aria-required="true"
                class="task-request__textarea"
              ></textarea>
            </div>
          </div>
        </section>

        <!-- Тип приложения -->
        <section aria-labelledby="app-type-heading" class="task-request__section task-request__section--app-type">
          <h2 id="app-type-heading" class="task-request__section-title">Тип приложения</h2>
          
          <div role="radiogroup" aria-labelledby="app-type-heading" class="task-request__radio-group">
            <div v-for="type in applicationTypes" :key="type.value" class="task-request__radio-option">
              <input 
                :id="type.value"
                v-model="formData.applicationType"
                :value="type.value"
                type="radio"
                required
                aria-required="true"
                :aria-label="type.label"
                class="task-request__radio-input"
              >
              <label :for="type.value" class="task-request__radio-label">
                <div class="task-request__radio-title">{{ type.label }}</div>
                <div class="task-request__radio-description">{{ type.description }}</div>
              </label>
            </div>
          </div>
        </section>

        <!-- Сроки и бюджет -->
        <section aria-labelledby="timeline-budget-heading" class="task-request__section task-request__section--timeline-budget">
          <h2 id="timeline-budget-heading" class="task-request__section-title">Сроки и бюджет</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <label for="estimated-time" class="task-request__label">Ориентировочные сроки (в месяцах)</label>
              <input 
                id="estimated-time"
                v-model="formData.estimatedTime"
                type="number"
                min="1"
                required
                aria-required="true"
                class="task-request__input"
              >
            </div>

            <div class="task-request__field">
              <label for="estimated-budget" class="task-request__label">Ориентировочный бюджет (в рублях)</label>
              <input 
                id="estimated-budget"
                v-model="formData.estimatedBudget"
                type="number"
                min="0"
                required
                aria-required="true"
                class="task-request__input"
              >
            </div>
          </div>
        </section>

        <!-- Контактная информация -->
        <section aria-labelledby="contact-info-heading" class="task-request__section task-request__section--contact-info">
          <h2 id="contact-info-heading" class="task-request__section-title">Контактная информация</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <label for="email" class="task-request__label">Email</label>
              <input 
                id="email"
                v-model="formData.email"
                type="email"
                required
                aria-required="true"
                class="task-request__input"
              >
            </div>

            <div class="task-request__field">
              <label for="phone" class="task-request__label">Телефон</label>
              <input 
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                aria-required="true"
                class="task-request__input"
              >
            </div>
          </div>
        </section>

        <!-- Кнопка отправки -->
        <div class="task-request__submit-wrapper">
          <button 
            type="submit"
            :disabled="loading"
            aria-busy="loading"
            class="task-request__submit-button"
          >
            <span v-if="loading" class="task-request__submit-text">Отправка...</span>
            <span v-else class="task-request__submit-text">Отправить заявку</span>
          </button>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskRequestStore } from '@/stores/taskRequestStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTaskRequestStore()

const applicationTypes = [
  {
    value: 'web',
    label: 'Веб-приложение',
    description: 'Сайт или веб-приложение, доступное через браузер'
  },
  {
    value: 'mobile',
    label: 'Мобильное приложение',
    description: 'Приложение для iOS и/или Android'
  },
  {
    value: 'desktop',
    label: 'Десктопное приложение',
    description: 'Приложение для Windows, macOS или Linux'
  },
  {
    value: 'other',
    label: 'Другое',
    description: 'Иной тип приложения или сервиса'
  }
]

const formData = ref({
  projectName: '',
  description: '',
  applicationType: '',
  estimatedTime: '',
  estimatedBudget: '',
  email: '',
  phone: ''
})

const loading = computed(() => store.isLoading)
const error = computed(() => store.getError)

const submitRequest = async () => {
  try {
    await store.createRequest(formData.value)
    // После успешного создания заявки перенаправляем на страницу со списком заявок
    router.push('/requests')
  } catch (error) {
    // Ошибка уже обработана в store
    console.error('Error submitting request:', error)
  }
}
</script>
