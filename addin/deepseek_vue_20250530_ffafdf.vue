<template>
  <div>
    <v-card-title class="text-h5 mb-4">Проверка данных</v-card-title>
    
    <v-text-field
      v-model="modelValue.contactEmail"
      label="Ваш Email"
      variant="outlined"
      class="mb-4"
      type="email"
      required
      :rules="[requiredRule, emailRule]"
    ></v-text-field>
    
    <v-btn
      variant="outlined"
      color="primary"
      :loading="isCalculating"
      :disabled="!modelValue.projectType"
      @click="$emit('calculate')"
      class="mb-4"
    >
      <v-icon start>mdi-calculator</v-icon>
      Рассчитать сложность
    </v-btn>
    
    <complexity-meter 
      v-if="estimatedComplexity" 
      :value="estimatedComplexity" 
      class="mb-6"
    />
    
    <v-alert type="info" variant="tonal" class="mt-4">
      После отправки заявки наши менеджеры подберут оптимальную команду разработчиков
      и подготовят детальный план реализации проекта
    </v-alert>
    
    <v-card variant="outlined" class="mt-6">
      <v-card-title class="text-h6">Сводка заявки</v-card-title>
      <v-card-text>
        <v-list lines="two">
          <v-list-item>
            <template #prepend>
              <v-icon>mdi-text-box</v-icon>
            </template>
            <v-list-item-title>{{ modelValue.projectName }}</v-list-item-title>
            <v-list-item-subtitle>Название проекта</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <template #prepend>
              <v-icon>mdi-code-tags</v-icon>
            </template>
            <v-list-item-title>{{ projectTypeTitle }}</v-list-item-title>
            <v-list-item-subtitle>Тип проекта</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item v-if="modelValue.technologies.length">
            <template #prepend>
              <v-icon>mdi-cogs</v-icon>
            </template>
            <v-list-item-title>
              <v-chip v-for="(tech, i) in modelValue.technologies" :key="i" class="mr-2" size="small">
                {{ tech }}
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>Технологии</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import ComplexityMeter from './ComplexityMeter.vue';
import type { ProjectFormData } from '@/types';

const props = defineProps<{
  modelValue: ProjectFormData,
  estimatedComplexity: number | null,
  isCalculating: boolean
}>();

defineEmits(['calculate']);

const requiredRule = (v: string) => !!v || 'Обязательное поле';
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Некорректный email';

const projectTypeTitle = computed(() => {
  const types: Record<string, string> = {
    'web': 'Веб-приложение',
    'mobile': 'Мобильное приложение',
    'desktop': 'Десктопное приложение',
    'ai': 'Искусственный интеллект',
    'blockchain': 'Блокчейн решение',
    'other': 'Другое'
  };
  return props.modelValue.projectType ? types[props.modelValue.projectType] : 'Не указано';
});
</script>