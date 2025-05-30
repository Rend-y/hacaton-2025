<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div class="input-wrapper">
      <div class="input-inner">
        <input
          :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
          :id="id"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :required="required"
          :placeholder="placeholder"
          class="custom-input"
        />
        <button
          v-if="type === 'password'"
          type="button"
          class="toggle-password"
          @click="showPassword = !showPassword"
          :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
        >
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPassword = ref(false)

defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-group {
  width: 100%;
  margin-bottom: 0.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #222;
  font-size: 1.1rem;
  font-weight: 700;
}

.input-wrapper {
  position: relative;
  width: 100%;
  z-index: 1;
}

.input-inner {
  position: relative;
  border-radius: 7px;
  background: #e7e1ec;
  padding: 0;
}

.custom-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 1rem;
  border: none;
  border-radius: 7px;
  background: transparent;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2a262b;
  margin: 0.2rem 0 0.2rem 0;
  box-sizing: border-box;
  transition: box-shadow 0.3s;
  padding-right: 2.5rem;
  position: relative;
  z-index: 3;
  outline: none;
}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #7b5cff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 5;
  pointer-events: auto;
}

.toggle-password:hover {
  color: #b86adf;
}

::placeholder {
  color: #888;
  opacity: 0.8;
  font-weight: 500;
  font-size: 1rem;
}

@media (max-width: 600px) {
  label {
    font-size: 0.95rem;
  }
  .custom-input {
    padding: 0.6rem 0.7rem 0.6rem 0.7rem;
    font-size: 0.95rem;
    border-radius: 5px;
    padding-right: 2.2rem;
  }
  .toggle-password {
    padding: 0.3rem;
  }
}
</style> 