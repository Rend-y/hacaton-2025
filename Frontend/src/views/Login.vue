<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1 class="login-title">
        <span class="bold">А</span>вт<span class="gradient">оризация</span>
      </h1>
      <hr class="login-divider" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(123, 92, 255, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.07);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 14px;
  width: min(420px, 98%);
  margin: 0 auto;
  gap: 2rem;
}

.login-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.7rem;
  text-align: center;
  letter-spacing: 0.01em;
  line-height: 1;
  margin-top: 1rem;
  margin-left: 0;
  position: relative;
  width: 100%;
  border: none;
  padding-bottom: 0;
  user-select: none;
}

.login-divider {
  width: 100%;
  border: none;
  border-top: 2px solid #e7e1ec;
  margin: 0 0 1.2rem 0;
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
  font-size: 1.1rem;
  font-weight: 700;
}

.custom-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 1rem;
  border: none;
  border-bottom: 2px solid #8884;
  border-radius: 7px 7px 0 0;
  background: #e7e1ec;
  font-size: 1.1rem;
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
  margin-top: 1rem;
}

.forgot-link {
  color: #0000ff;
  text-decoration: underline;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.2rem;
  transition: color 0.2s;
}
.forgot-link:hover {
  color: #7b5cff;
}

.login-button {
  padding: 0.7rem 1.5rem;
  background-color: #e7e1ec;
  color: #2a262b;
  border: 2px solid #8884;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-left: 1rem;
}
.login-button:hover {
  background: #d1c6e6;
  color: #7b5cff;
}

@media (max-width: 600px) {
  .login-form {
    width: 98%;
    padding: 0.7rem 0.5rem 0.7rem 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(123, 92, 255, 0.10), 0 1px 4px 0 rgba(0,0,0,0.07);
    gap: 1.2rem;
    align-items: center;
  }
  .login-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    border-bottom-width: 0;
    padding-bottom: 0;
    text-align: center;
  }
  .login-divider {
    margin-bottom: 0.7rem;
  }
  label {
    font-size: 0.95rem;
  }
  .custom-input {
    padding: 0.6rem 0.7rem 0.6rem 0.7rem;
    font-size: 0.95rem;
    border-radius: 5px 5px 0 0;
  }
  .form-footer {
    margin-top: 0.7rem;
  }
  .forgot-link {
    font-size: 0.9rem;
  }
  .login-button {
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
    border-radius: 3px;
    margin-left: 0.5rem;
  }
}
</style>
