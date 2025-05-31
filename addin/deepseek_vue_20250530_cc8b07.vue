<template>
  <v-container class="max-width-800">
    <v-card elevation="3" class="pa-6 rounded-lg">
      <v-card-title class="text-h4 text-center mb-6">Заявка на разработку ПО</v-card-title>
      
      <v-stepper v-model="step" alt-labels>
        <v-stepper-header>
          <v-stepper-item
            v-for="(stepItem, index) in steps"
            :key="index"
            :value="index + 1"
            :title="stepItem.title"
            :icon="stepItem.icon"
          ></v-stepper-item>
        </v-stepper-header>
        
        <v-stepper-window>
          <v-stepper-window-item :value="1">
            <project-info-step v-model="formData" />
          </v-stepper-window-item>
          
          <v-stepper-window-item :value="2">
            <technical-details-step v-model="formData" :tech-options="techOptions" />
          </v-stepper-window-item>
          
          <v-stepper-window-item :value="3">
            <timeline-step v-model="formData" />
          </v-stepper-window-item>
          
          <v-stepper-window-item :value="4">
            <review-step 
              v-model="formData" 
              :estimated-complexity="estimatedComplexity" 
              :is-calculating="isCalculating"
              @calculate="calculateComplexity"
            />
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
      
      <v-card-actions class="mt-4 justify-space-between">
        <v-btn 
          variant="outlined" 
          color="primary" 
          :disabled="step === 1" 
          @click="step--"
        >
          Назад
        </v-btn>
        
        <v-btn 
          variant="flat" 
          color="primary" 
          :loading="isSubmitting"
          @click="handleStepAction"
        >
          {{ step === steps.length ? 'Отправить заявку' : 'Продолжить' }}
          <v-icon end>{{ step === steps.length ? 'mdi-send' : 'mdi-arrow-right' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import ProjectInfoStep from '@/components/ProjectInfoStep.vue';
import TechnicalDetailsStep from '@/components/TechnicalDetailsStep.vue';
import TimelineStep from '@/components/TimelineStep.vue';
import ReviewStep from '@/components/ReviewStep.vue';

// Типы данных
type ProjectType = 'web' | 'mobile' | 'desktop' | 'ai' | 'blockchain' | 'other';
type Priority = 'low' | 'medium' | 'high' | 'critical';
type Timeline = 'flexible' | 'moderate' | 'urgent';

interface ProjectFormData {
  projectName: string;
  description: string;
  goals: string;
  features: string;
  projectType: ProjectType | null;
  technologies: string[];
  timeline: Timeline;
  priority: Priority;
  budget?: number;
  contactEmail: string;
}

// Состояние компонента
const step = ref(1);
const isSubmitting = ref(false);
const isCalculating = ref(false);
const estimatedComplexity = ref<number | null>(null);

const techOptions = [
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Django', 
  'Flask', 'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'Docker', 'Kubernetes', 'TensorFlow', 'Blockchain'
];

const steps = [
  { title: 'Основная информация', icon: 'mdi-text-box' },
  { title: 'Технические детали', icon: 'mdi-code-tags' },
  { title: 'Сроки и приоритет', icon: 'mdi-calendar-clock' },
  { title: 'Проверка и отправка', icon: 'mdi-check-circle' }
];

const formData = reactive<ProjectFormData>({
  projectName: '',
  description: '',
  goals: '',
  features: '',
  projectType: null,
  technologies: [],
  timeline: 'moderate',
  priority: 'medium',
  contactEmail: ''
});

// Расчет сложности проекта
const calculateComplexity = () => {
  isCalculating.value = true;
  estimatedComplexity.value = null;
  
  setTimeout(() => {
    let complexity = 5; // Базовый уровень
    
    // Добавляем сложность в зависимости от типа проекта
    switch(formData.projectType) {
      case 'web': complexity += 3; break;
      case 'mobile': complexity += 4; break;
      case 'ai': complexity += 8; break;
      case 'blockchain': complexity += 7; break;
      default: complexity += 2;
    }
    
    // Учитываем количество технологий
    complexity += Math.min(formData.technologies.length * 1.5, 10);
    
    // Учитываем приоритет
    if (formData.priority === 'high') complexity *= 1.3;
    if (formData.priority === 'critical') complexity *= 1.7;
    
    estimatedComplexity.value = Math.round(complexity);
    isCalculating.value = false;
  }, 800);
};

// Обработчик действий шага
const handleStepAction = () => {
  if (step.value === steps.length) {
    submitForm();
  } else {
    step.value++;
  }
};

// Отправка формы
const submitForm = () => {
  isSubmitting.value = true;
  
  // Здесь будет вызов API для отправки данных
  setTimeout(() => {
    console.log('Отправленные данные:', formData);
    isSubmitting.value = false;
    alert('Заявка успешно отправлена!');
  }, 1500);
};
</script>

<style scoped>
.max-width-800 {
  max-width: 800px;
  margin: 0 auto;
}
</style>