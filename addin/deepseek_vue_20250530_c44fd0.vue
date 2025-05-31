<template>
  <div>
    <v-card-title class="text-h5 mb-4">Основная информация о проекте</v-card-title>
    
    <v-text-field
      v-model="modelValue.projectName"
      label="Название проекта"
      variant="outlined"
      class="mb-4"
      required
      :rules="[requiredRule]"
    ></v-text-field>
    
    <v-textarea
      v-model="modelValue.description"
      label="Описание проекта"
      variant="outlined"
      class="mb-4"
      rows="3"
      required
      :rules="[requiredRule]"
    ></v-textarea>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea
          v-model="modelValue.goals"
          label="Цели проекта"
          variant="outlined"
          rows="3"
          required
          :rules="[requiredRule]"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea
          v-model="modelValue.features"
          label="Ключевые функции"
          variant="outlined"
          rows="3"
          hint="Перечислите основные функции через запятую"
          persistent-hint
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ProjectFormData } from '@/types';

const props = defineProps<{
  modelValue: ProjectFormData
}>();

const requiredRule = (v: string) => !!v || 'Обязательное поле';
</script>