<template>
  <div>
    <v-card-title class="text-h5 mb-4">Технические детали</v-card-title>
    
    <v-select
      v-model="modelValue.projectType"
      label="Тип проекта"
      :items="projectTypes"
      variant="outlined"
      class="mb-4"
      required
      :rules="[requiredRule]"
    ></v-select>
    
    <v-combobox
      v-model="modelValue.technologies"
      label="Технологии"
      :items="techOptions"
      variant="outlined"
      multiple
      chips
      clearable
    >
      <template #chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-icon="getTechIcon(item.title)"
        ></v-chip>
      </template>
    </v-combobox>
    
    <v-alert type="info" variant="tonal" class="mt-4">
      На основе выбранных технологий система предложит подходящие команды разработчиков
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ProjectFormData } from '@/types';

const props = defineProps<{
  modelValue: ProjectFormData,
  techOptions: string[]
}>();

const projectTypes = [
  { title: 'Веб-приложение', value: 'web' },
  { title: 'Мобильное приложение', value: 'mobile' },
  { title: 'Десктопное приложение', value: 'desktop' },
  { title: 'Искусственный интеллект', value: 'ai' },
  { title: 'Блокчейн решение', value: 'blockchain' },
  { title: 'Другое', value: 'other' }
];

const requiredRule = (v: any) => !!v || 'Обязательное поле';

const getTechIcon = (tech: string) => {
  const icons: Record<string, string> = {
    'React': 'mdi-react',
    'Vue.js': 'mdi-vuejs',
    'Angular': 'mdi-angular',
    'Node.js': 'mdi-nodejs',
    'Python': 'mdi-language-python',
    'Docker': 'mdi-docker',
    'Kubernetes': 'mdi-kubernetes',
    'TensorFlow': 'mdi-tensorflow',
    'Blockchain': 'mdi-link'
  };
  return icons[tech] || 'mdi-code-braces';
};
</script>