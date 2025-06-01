<template>
  <div class="custom-input">
    <label :for="id" class="custom-input__label">{{ label }}</label>
    <select
      v-if="type === 'select'"
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :readonly="readonly"
      class="custom-input__select"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      class="custom-input__textarea"
    ></textarea>
    <input
      v-else
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      :min="min"
      class="custom-input__input"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  rows: {
    type: Number,
    default: 4
  },
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref(null)

onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.style.setProperty('--rows', props.rows)
    textareaRef.value.style.setProperty('--maxRows', props.maxRows)
  }
})

watch(() => [props.rows, props.maxRows], ([rows, maxRows]) => {
  if (textareaRef.value) {
    textareaRef.value.style.setProperty('--rows', rows)
    textareaRef.value.style.setProperty('--maxRows', maxRows)
  }
})
</script>

<style scoped>
.custom-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.custom-input__label {
  font-size: 1rem;
  color: #2c244d;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.custom-input__input,
.custom-input__select,
.custom-input__textarea {
  background: #ede6fa;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  color: #2c244d;
  margin-bottom: 0.2rem;
  box-shadow: 0 1px 4px 0 rgba(136,95,255,0.04);
  transition: box-shadow 0.2s;
  width: 100%;
  min-height: 48px;
  height: 48px;
  box-sizing: border-box;
}

.custom-input__textarea {
  min-height: unset;
  height: auto;
  line-height: 1.5;
  resize: none;
  /* Высота по rows, максимум по maxRows */
  height: calc(var(--rows, 4) * 1.5em);
  max-height: calc(var(--maxRows, 6) * 1.5em);
  overflow-y: auto;
}

.custom-input__input:focus,
.custom-input__textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px #b16fff;
}

.custom-input__input::placeholder,
.custom-input__textarea::placeholder {
  color: #b6a9d6;
  opacity: 1;
}

.custom-input__select {
  background: #ede6fa;
  border: none;
  border-radius: 12px;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  color: #2c244d;
  margin-bottom: 0.2rem;
  box-shadow: 0 1px 4px 0 rgba(136,95,255,0.04);
  transition: box-shadow 0.2s;
  width: 100%;
  appearance: none;
}

.custom-input__select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #b16fff;
}
</style> 