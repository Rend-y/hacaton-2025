<template>
  <v-card variant="outlined">
    <v-card-title class="text-h6">Предварительная оценка сложности</v-card-title>
    <v-card-text>
      <div class="d-flex align-center">
        <v-progress-linear
          :model-value="value"
          max="20"
          height="20"
          :color="complexityColor"
          rounded
          class="mr-4"
        >
          <template #default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        
        <div>
          <v-chip :color="complexityColor" label>
            {{ complexityLevel }}
          </v-chip>
        </div>
      </div>
      
      <div class="mt-2 text-caption">
        <v-icon :color="complexityColor" size="small">mdi-information</v-icon>
        Сложность: {{ value }} из 20 ({{ complexityDescription }})
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number
}>();

const complexityLevel = computed(() => {
  if (props.value > 15) return 'Очень высокая';
  if (props.value > 10) return 'Высокая';
  return 'Средняя';
});

const complexityColor = computed(() => {
  if (props.value > 15) return 'error';
  if (props.value > 10) return 'warning';
  return 'success';
});

const complexityDescription = computed(() => {
  if (props.value > 15) return 'требуется опытная команда и больше времени';
  if (props.value > 10) return 'рекомендуется выделить дополнительные ресурсы';
  return 'стандартная реализация';
});
</script>