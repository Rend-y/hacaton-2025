<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Вход в систему</h2>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Введите ваш email"
        />
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Введите ваш пароль"
        />
      </div>

      <button type="submit" class="login-button">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // TODO: Implement login logic here
    console.log('Login attempt with:', { email: email.value, password: password.value })
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>

<style scoped>

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: rebeccapurple;
}

.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
}

.login-form {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: min(400px, 90%);
  margin: 0 auto;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
  }
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #45a049;
}
</style>
