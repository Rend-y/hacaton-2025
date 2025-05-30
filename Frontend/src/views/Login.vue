<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1 class="login-title">
        <span class="bold">А</span>вт<span class="gradient">оризация</span>
      </h1>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Email"
          class="custom-input"
        />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Password"
          class="custom-input"
        />
      </div>
      <div class="form-footer">
        <a href="#" class="forgot-link">Не помню пароль</a>
        <button type="submit" class="login-button">Войти</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const password = ref('')
const email = ref('')

const handleLogin = () => userStore.login(email.value, password.value)
</script>

<style scoped>
.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
}

.login-form {
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(123, 92, 255, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.07);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  width: min(500px, 95%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.login-title {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 2.5rem;
  text-align: left;
  letter-spacing: 0.01em;
  line-height: 1;
  margin-top: 1.5rem;
  margin-left: 0.5rem;
  position: relative;
  width: fit-content;
  border-bottom: 4px solid #2196f3;
  padding-bottom: 0.2em;
  user-select: none;
}
.login-title .bold {
  color: #444;
  font-weight: 900;
  font-size: 1.1em;
}
.login-title .gradient {
  background: linear-gradient(90deg, #7b5cff 30%, #b86adf 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 900;
}

.form-group {
  width: 100%;
  margin-bottom: 0.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #222;
  font-size: 1.5rem;
  font-weight: 700;
}

.custom-input {
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  border: none;
  border-bottom: 2px solid #8884;
  border-radius: 8px 8px 0 0;
  background: #e7e1ec;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2a262b;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.custom-input:focus {
  outline: none;
  border-bottom: 2.5px solid #7b5cff;
}
::placeholder {
  color: #2a262b;
  opacity: 1;
  font-weight: 700;
  font-size: 1.2em;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.forgot-link {
  color: #0000ff;
  text-decoration: underline;
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 0.2rem;
  transition: color 0.2s;
}
.forgot-link:hover {
  color: #7b5cff;
}

.login-button {
  padding: 0.9rem 2.5rem;
  background-color: #e7e1ec;
  color: #2a262b;
  border: 2px solid #8884;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-left: 1.5rem;
}
.login-button:hover {
  background: #d1c6e6;
  color: #7b5cff;
}
</style>
