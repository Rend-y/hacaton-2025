<template>
  <main class="task-request">
    <h1 class="task-request__title">Создание заявки на IT-продукт</h1>
    <div class="task-request__divider"></div>
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
              <CustomInput
                id="project-name"
                v-model="formData.projectName"
                label="Название проекта"
                type="text"
                required
                placeholder="Введите название проекта"
              />
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
                placeholder="Опишите ваш проект"
              ></textarea>
            </div>
          </div>
        </section>

        <!-- Дополнительные параметры для расчета срока -->
        <section aria-labelledby="extra-params-heading" class="task-request__section task-request__section--extra-params">
          <h2 id="extra-params-heading" class="task-request__section-title">Параметры для расчёта срока</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <label for="complexity" class="task-request__label">Сложность проекта</label>
              <select id="complexity" v-model="formData.complexity" class="task-request__input">
                <option value="simple">Простая</option>
                <option value="medium">Средняя</option>
                <option value="hard">Сложная</option>
              </select>
            </div>

            <div class="task-request__field">
              <CustomInput
                id="features-count"
                v-model="formData.featuresCount"
                label="Количество ключевых функций"
                type="number"
                min="1"
                placeholder="Введите число функций"
              />
            </div>

            <div class="task-request__field task-request__checkbox-field">
              <label class="task-request__checkbox-label">
                <input type="checkbox" v-model="formData.needDesign" />
                <span>Нужен дизайн</span>
              </label>
            </div>

            <div class="task-request__field task-request__checkbox-field">
              <label class="task-request__checkbox-label">
                <input type="checkbox" v-model="formData.needIntegration" />
                <span>Нужна интеграция с внешними сервисами</span>
              </label>
            </div>

            <div class="task-request__field task-request__checkbox-field">
              <label class="task-request__checkbox-label">
                <input type="checkbox" v-model="formData.hasSpec" />
                <span>Есть техническое задание</span>
              </label>
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
              <CustomInput
                id="estimated-time"
                v-model="formData.estimatedTime"
                label="Ориентировочные сроки (в месяцах)"
                type="number"
                required
                placeholder="Введите срок"
                :readonly="true"
              />
            </div>

            <div class="task-request__field">
              <CustomInput
                id="estimated-budget"
                v-model="formData.estimatedBudget"
                label="Ориентировочный бюджет (в рублях)"
                type="number"
                required
                placeholder="Введите бюджет"
              />
            </div>
          </div>
        </section>

        <!-- Контактная информация -->
        <section aria-labelledby="contact-info-heading" class="task-request__section task-request__section--contact-info">
          <h2 id="contact-info-heading" class="task-request__section-title">Контактная информация</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <CustomInput
                id="email"
                v-model="formData.email"
                label="Email"
                type="email"
                required
                placeholder="Введите email"
              />
            </div>

            <div class="task-request__field">
              <CustomInput
                id="phone"
                v-model="formData.phone"
                label="Телефон"
                type="tel"
                required
                placeholder="Введите телефон"
              />
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
import { ref, computed, watch } from 'vue'
import { useTaskRequestStore } from '@/stores/taskRequestStore'
import { useRouter } from 'vue-router'
import CustomInput from '@/components/CustomInput.vue'

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
  phone: '',
  complexity: 'simple',
  featuresCount: 1,
  needDesign: false,
  needIntegration: false,
  hasSpec: false
})

const loading = computed(() => store.isLoading)
const error = computed(() => store.getError)

watch(
  () => [
    formData.value.applicationType,
    formData.value.complexity,
    formData.value.featuresCount,
    formData.value.needDesign,
    formData.value.needIntegration,
    formData.value.hasSpec
  ],
  ([type, complexity, featuresCount, needDesign, needIntegration, hasSpec]) => {
    let base = 0
    if (type === 'web') base = 2
    else if (type === 'mobile') base = 3
    else if (type === 'desktop') base = 4
    else if (type === 'other') base = 2
    else base = 0
    // Сложность
    if (complexity === 'medium') base += 1
    if (complexity === 'hard') base += 2
    // Количество функций
    if (Number(featuresCount) > 5) base += 1
    // Дизайн
    if (needDesign) base += 1
    // Интеграция
    if (needIntegration) base += 1
    // ТЗ
    if (hasSpec) base -= 1
    if (base < 1) base = 1
    formData.value.estimatedTime = base
  }
)

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

<style scoped>
.task-request {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 32px 0 rgba(136,95,255,0.08);
  padding: 2.5rem 2rem;
  max-width: 540px;
  margin: 2.5rem auto;
}

.task-request__title {
  font-size: 1.9rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(90deg, #885fff 0%, #b16fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.task-request__divider {
  width: 90%;
  height: 2px;
  margin: 1.2rem auto 2rem auto;
  background: #e5d6fa;
  opacity: 0.7;
  border-radius: 1px;
  box-shadow: none;
}

.task-request__form {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}

.task-request__section {
  background: transparent;
  border-radius: 18px;
  padding: 0;
  margin-bottom: 0.5rem;
  box-shadow: none;
}

.task-request__section-title {
  font-size: 1.15rem;
  color: #885fff;
  margin-bottom: 1.2rem;
  font-weight: 700;
}

.task-request__section-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.task-request__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-request__label {
  font-size: 1rem;
  color: #2c244d;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.task-request__input,
.task-request__textarea,
.task-request__section select {
  background: #ede6fa;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  color: #2c244d;
  margin-bottom: 0.2rem;
  box-shadow: 0 1px 4px 0 rgba(136,95,255,0.04);
  transition: box-shadow 0.2s;
  height: 48px;
  appearance: none;
}

.task-request__textarea {
  min-height: 96px;
  resize: vertical;
  height: auto;
}

.task-request__input:focus,
.task-request__textarea:focus,
.task-request__section select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #b16fff;
}

.task-request__input::placeholder,
.task-request__textarea::placeholder {
  color: #b6a9d6;
  opacity: 1;
}

.task-request__radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.task-request__radio-option {
  position: relative;
  flex: 1 1 180px;
  min-width: 160px;
}

.task-request__radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.task-request__radio-label {
  display: block;
  background: #fff;
  border: 2px solid #ede6fa;
  border-radius: 14px;
  padding: 1rem 1.2rem;
  cursor: pointer;
  font-weight: 700;
  color: #885fff;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 4px 0 rgba(136,95,255,0.04);
}

.task-request__radio-input:checked + .task-request__radio-label {
  border-color: #885fff;
  background: #f3f0ff;
  box-shadow: 0 2px 8px 0 rgba(136,95,255,0.12);
}

.task-request__radio-title {
  font-weight: 700;
  color: #885fff;
  margin-bottom: 0.3rem;
  font-size: 1.05rem;
}

.task-request__radio-description {
  font-size: 0.93rem;
  color: #7b6fa9;
}

.task-request__submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.task-request__submit-button {
  background: linear-gradient(90deg, #885fff 0%, #b16fff 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(136,95,255,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  height: 48px;
}

.task-request__submit-button:hover {
  background: linear-gradient(90deg, #7a4fff 0%, #a16fff 100%);
}

.task-request__submit-button:disabled {
  background: #d1c4f7;
  cursor: not-allowed;
}

.task-request__error {
  background: #ffe6e6;
  color: #ff6f6f;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  border: 1.5px solid #ffd6d6;
}

@media (max-width: 700px) {
  .task-request {
    margin: 1rem;
    padding: 1rem;
  }
  .task-request__radio-group {
    flex-direction: column;
    gap: 0.7rem;
  }
}

.vertical-separator {
  width: 2px;
  background: linear-gradient(180deg, #ede6fa 0%, #b16fff 100%);
  border-radius: 2px;
  margin: 0 2.5rem;
  min-height: 100vh;
  box-shadow: 0 0 16px 0 rgba(136,95,255,0.10);
  opacity: 0.7;
  filter: blur(0.5px);
}

.task-request__checkbox-field {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.2rem;
}

.task-request__checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  color: #2c244d;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.task-request__checkbox-label input[type='checkbox'] {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #b6a9d6;
  background: #ede6fa;
  accent-color: #885fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-right: 0.5rem;
}

.task-request__checkbox-label input[type='checkbox']:focus {
  outline: none;
  border-color: #885fff;
  box-shadow: 0 0 0 2px #b16fff;
}
</style>
