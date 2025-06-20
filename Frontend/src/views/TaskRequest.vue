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
                v-model="formData.project.name"
                label="Название проекта"
                type="text"
                required
                placeholder="Введите название проекта"
              />
            </div>

            <!-- Тип приложения -->
            <section aria-labelledby="app-type-heading" class="task-request__section task-request__section--app-type" style="margin-bottom: 0;">
              <h2 id="app-type-heading" class="task-request__section-title">Тип приложения</h2>
              <div role="radiogroup" aria-labelledby="app-type-heading" class="task-request__radio-group">
                <div v-for="type in applicationTypes" :key="type.value" class="task-request__radio-option">
                  <input 
                    :id="type.value"
                    v-model="formData.project.type"
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

            <div class="task-request__field">
              <CustomInput
                id="project-description"
                v-model="formData.project.description"
                label="Описание проекта"
                type="textarea"
                required
                :rows="6"
                placeholder="Опишите ваш проект"
              />
            </div>

            <!-- Ключевые функции -->
            <div class="task-request__field">
              <label class="task-request__label">Ключевые функции</label>
              <div class="task-request__tags-group">
                <button
                  v-for="feature in featuresOptions"
                  :key="feature.value"
                  type="button"
                  class="task-request__tag"
                  :class="{ 'task-request__tag--active': formData.features.core.includes(feature.value) }"
                  @click="toggleFeature(feature.value)"
                >
                  {{ feature.label }}
                </button>
              </div>
            </div>

            <div v-if="formData.features.core.includes('other')" class="task-request__field">
              <CustomInput
                id="features-other"
                v-model="formData.features.custom"
                label="Опишите ключевые функции"
                type="textarea"
                :rows="3"
                required
                placeholder="Опишите, какие функции нужны"
              />
            </div>

            <div class="task-request__field">
              <label class="task-request__label">Дополнительные функции</label>
              <div class="task-request__tags-group">
                <button
                  v-for="param in extraParamsOptions"
                  :key="param.value"
                  type="button"
                  class="task-request__tag"
                  :class="{ 'task-request__tag--active': formData.requirements[param.value] }"
                  @click="toggleExtraParam(param.value)"
                >
                  {{ param.label }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Сроки и бюджет -->
        <section aria-labelledby="timeline-budget-heading" class="task-request__section task-request__section--timeline-budget">
          <h2 id="timeline-budget-heading" class="task-request__section-title">Сроки и бюджет</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <label class="task-request__label">Ориентировочные сроки (в месяцах)</label>
              <input
                type="range"
                min="1"
                :max="MAX_TIME"
                step="1"
                v-model="formData.estimation.time.months"
                class="task-request__slider"
              />
              <div class="task-request__slider-value">
                {{ formData.estimation.time.months }} мес.
              </div>
            </div>

            <div class="task-request__field">
              <label class="task-request__label">Ориентировочный бюджет (в рублях)</label>
              <input
                type="range"
                min="50000"
                :max="MAX_BUDGET"
                step="50000"
                v-model="formData.estimation.budget.amount"
                class="task-request__slider"
              />
              <div class="task-request__slider-value">
                {{ formData.estimation.budget.amount.toLocaleString() }} ₽
              </div>
            </div>
          </div>
        </section>

        <!-- Контактная информация -->
        <section aria-labelledby="contact-info-heading" class="task-request__section task-request__section--contact-info">
          <h2 id="contact-info-heading" class="task-request__section-title">Контактная информация</h2>
          
          <div class="task-request__section-content">
            <div class="task-request__field">
              <CustomInput
                id="contact-name"
                v-model="formData.contact.name"
                label="Как к вам обращаться"
                type="text"
                required
                placeholder="Введите ваше имя"
              />
            </div>

            <div class="task-request__field">
              <CustomInput
                id="email"
                v-model="formData.contact.email"
                label="Email"
                type="email"
                required
                placeholder="Введите email"
              />
            </div>

            <div class="task-request__field">
              <CustomInput
                id="phone"
                v-model="formData.contact.phone"
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

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTaskRequestStore, RequestStatus, type FormTaskRequest } from '@/stores/taskRequestStore'
import { useRouter } from 'vue-router'
import CustomInput from '@/components/CustomInput.vue'

interface FormData extends Omit<FormTaskRequest, 'id' | 'status' | 'preview'> {
  project: {
    name: string;
    description: string;
    type: string;
  };
  features: {
    core: string[];
    custom: string | null;
  };
  requirements: {
    design: boolean;
    externalIntegration: boolean;
    support: boolean;
    paymentIntegration: boolean;
    adminPanel: boolean;
  };
  estimation: {
    time: {
      months: number;
      recommended: number;
    };
    budget: {
      amount: number;
      recommended: number;
    };
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

const router = useRouter()
const store = useTaskRequestStore()

const formData = ref<FormData>({
  project: {
    name: '',
    description: '',
    type: ''
  },
  features: {
    core: [],
    custom: null
  },
  requirements: {
    design: false,
    externalIntegration: false,
    support: false,
    paymentIntegration: false,
    adminPanel: false
  },
  estimation: {
    time: {
      months: 1,
      recommended: 1
    },
    budget: {
      amount: 50000,
      recommended: 50000
    }
  },
  contact: {
    name: '',
    email: '',
    phone: ''
  }
})

const applicationTypes = [
  {
    value: 'web',
    label: 'Веб-приложение',
    description: 'Сайт или веб-приложение, доступное через браузер',
    basePrice: 100000,
    baseMonth: 2
  },
  {
    value: 'mobile',
    label: 'Мобильное приложение',
    description: 'Приложение для iOS и/или Android',
    basePrice: 150000,
    baseMonth: 3
  },
  {
    value: 'desktop',
    label: 'Десктопное приложение',
    description: 'Приложение для Windows, macOS или Linux',
    basePrice: 200000,
    baseMonth: 4
  },
  {
    value: 'cross-platform',
    label: 'Кросс-платформа',
    description: 'Приложение для всех платформ',
    basePrice: 200000,
    baseMonth: 4
  }
]

const featuresOptions = [
  { value: 'auth', label: 'Авторизация/регистрация', weight: 1.15 },
  { value: 'profile', label: 'Профиль пользователя', weight: 1.10 },
  { value: 'file-upload', label: 'Загрузка файлов', weight: 1.20 },
  { value: 'chat', label: 'Чат/мессенджер', weight: 1.35 },
  { value: 'notifications', label: 'Уведомления', weight: 1.15 },
  { value: 'search', label: 'Поиск', weight: 1.10 },
  { value: 'dashboard', label: 'Дашборд', weight: 1.20 },
  { value: 'other', label: 'Другое', weight: 1.00 }
]

const extraParamsOptions = [
  { value: 'needDesign', label: 'Нужен дизайн', weight: 1.5 },
  { value: 'needIntegration', label: 'Интеграция с внешними сервисами', weight: 2.0 },
  { value: 'needSupport', label: 'Поддержка после релиза', weight: 1.0 },
  { value: 'needPaymentIntegration', label: 'Интеграция с платёжными системами', weight: 1.5 },
  { value: 'hasAdminPanel', label: 'Нужна административная панель', weight: 1.0 }
]

const loading = computed(() => store.isLoading)
const error = computed(() => store.getError)

const baseTime = ref(1)
const baseBudget = ref(50000)

const MIN_TIME = 1
const MIN_BUDGET = 50000
const MAX_TIME = 36
const MAX_BUDGET = 5000000
const MONTH_COST_MULTIPLIER = 1.5
const K_SMOOTH = 0.5

let updating = false

const recommendedTime = computed(() => baseTime.value)
const recommendedBudget = computed(() => baseBudget.value)

watch(() => formData.value.estimation.time.months, (newTime) => {
  if (updating) return
  updating = true
  const t = Math.max(MIN_TIME, Math.min(Number(newTime), MAX_TIME))
  let newBudget = MONTH_COST_MULTIPLIER * baseBudget.value * Math.pow(baseTime.value / t, 1 / K_SMOOTH)
  newBudget = Math.max(MIN_BUDGET, Math.min(Math.round(newBudget), MAX_BUDGET))
  formData.value.estimation.budget.amount = newBudget
  updating = false
})

watch(() => formData.value.estimation.budget.amount, (newBudget) => {
  if (updating) return
  updating = true
  const b = Math.max(MIN_BUDGET, Math.min(Number(newBudget), MAX_BUDGET))
  let newTime = b === 0 ? MAX_TIME : baseTime.value * Math.pow(MONTH_COST_MULTIPLIER * baseBudget.value / b, K_SMOOTH)
  newTime = Math.max(MIN_TIME, Math.min(Math.round(newTime), MAX_TIME))
  formData.value.estimation.time.months = newTime
  updating = false
})

function recalculateEstimatedTime() {
  let base = 0
  let basePrice = 0
  const type = formData.value.project.type
  const featuresList = formData.value.features.core
  const extraParams = Object.entries(formData.value.requirements)
    .filter(([_, value]) => value)
    .map(([key]) => key)

  // Базовые значения для сроков и цены
  if (type === 'web') { base = 2; basePrice = 100000 }
  else if (type === 'mobile') { base = 3; basePrice = 150000 }
  else if (type === 'desktop') { base = 4; basePrice = 200000 }
  else if (type === 'cross-platform') { base = 4; basePrice = 200000 }
  else { base = 0; basePrice = 0 }

  // Учитываем количество функций
  const featuresCount = featuresList.filter(f => f !== 'other').length
  base += featuresCount * 0.5
  basePrice += featuresCount * 10000

  // Параметры с весами
  for (const param of extraParams) {
    const found = extraParamsOptions.find(opt => opt.value === param)
    if (found) {
      base += found.weight
      basePrice += found.weight * 15000 // вклад параметра в цену
    }
  }

  // Множители по функциям
  let multiplier = 1
  let priceMultiplier = 1
  for (const feature of featuresList) {
    const found = featuresOptions.find(opt => opt.value === feature)
    if (found) {
      multiplier *= found.weight
      priceMultiplier *= found.weight
    }
  }

  let result = Math.round(base * multiplier)
  if (result < 1) result = 1
  baseTime.value = result
  formData.value.estimation.time.months = result

  // Итоговая цена
  let price = Math.round(basePrice * priceMultiplier)
  baseBudget.value = price
  formData.value.estimation.budget.amount = price
  formData.value.estimation.budget.recommended = price
}

const submitRequest = async () => {
  try {
    const requestData: FormTaskRequest = {
      id: Date.now(),
      ...formData.value,
      status: RequestStatus.NEW,
      preview: formData.value.project.description.substring(0, 100) + '...'
    }
    
    await store.createRequest(requestData)
    router.push('/requests')
  } catch (error) {
    console.error('Error submitting request:', error)
  }
}

function toggleFeature(value: string) {
  const idx = formData.value.features.core.indexOf(value)
  if (idx === -1) {
    formData.value.features.core.push(value)
  } else {
    formData.value.features.core.splice(idx, 1)
  }
  recalculateEstimatedTime()
}

function toggleExtraParam(value: string) {
  const paramKey = value as keyof typeof formData.value.requirements
  formData.value.requirements[paramKey] = !formData.value.requirements[paramKey]
  recalculateEstimatedTime()
}

// watch для других важных параметров
watch(
  () => formData.value.project.type,
  recalculateEstimatedTime
)
</script>

<style scoped>
.task-request {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 32px 0 rgba(136,95,255,0.08);
  padding: 2.5rem 2rem;
  max-width: 1000px;
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
  display: flex;
}

.task-request__radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.task-request__radio-label {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

@media (max-width: 1040px) {
  .task-request {
    margin: 1rem;
    padding: 1.5rem;
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
.task-request__checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-bottom: 0.5rem;
}

.task-request__tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1rem;
  margin-bottom: 0.5rem;
}

.task-request__tag {
  background: #ede6fa;
  color: #885fff;
  border: none;
  border-radius: 16px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px 0 rgba(136,95,255,0.04);
  outline: none;
}

.task-request__tag--active {
  background: linear-gradient(90deg, #885fff 0%, #b16fff 100%);
  color: #fff;
  box-shadow: 0 2px 8px 0 rgba(136,95,255,0.12);
}

.task-request__slider {
  width: 100%;
  margin: 0.5rem 0;
}
.task-request__slider-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #885fff;
  margin-bottom: 0.2rem;
}
</style>
