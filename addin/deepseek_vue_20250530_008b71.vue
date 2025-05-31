<template>
  <div>
    <v-card-title class="text-h5 mb-4">Сроки и приоритет</v-card-title>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="modelValue.timeline"
          label="Срочность проекта"
          :items="timelineOptions"
          variant="outlined"
        ></v-select>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-select
          v-model="modelValue.priority"
          label="Приоритет проекта"
          :items="priorityOptions"
          variant="outlined"
        ></v-select>
      </v-col>
      
      <v-col cols="12">
        <v-text-field
          v-model.number="modelValue.budget"
          label="Бюджет (опционально)"
          variant="outlined"
          type="number"
          prefix="₽"
        ></v-text-field>
      </v-col>
    </v-row>
    
    <v-alert type="warning" variant="tonal" class="mt-4">
      Приоритет и срочность влияют на оценку трудозатрат и выбор команды
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ProjectFormData } from '@/types';

defineProps<{
  modelValue: ProjectFormData
}>();

const timelineOptions = [
  { title: 'Гибкие сроки', value: 'flexible' },
  { title: 'Стандартные сроки', value: 'moderate' },
  { title: 'Срочный проект', value: 'urgent' }
];

const priorityOptions = [
  { title: 'Низкий', value: 'low' },
  { title: 'Средний', value: 'medium' },
  { title: 'Высокий', value: 'high' },
  { title: 'Критический', value: 'critical' }
];
</script>