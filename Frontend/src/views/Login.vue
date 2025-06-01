<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1 class="login-title">
        <span class="gradient">Авторизация</span>
      </h1>
      <hr class="login-divider" />
      <CustomInput
        v-model="email"
        label="Email"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <CustomInput
        v-model="password"
        label="Пароль"
        type="password"
        id="password"
        required
        placeholder="Password"
      />
      <div class="form-footer">
        <button type="submit" class="login-button">Войти</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import CustomInput from '@/components/CustomInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const password = ref('')
const email = ref('')

const handleLogin = () => {
  userStore.login(email.value, password.value)
  router.push('/admin')
}
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

.login-title .gradient {
  background: linear-gradient(90deg, #7b5cff 30%, #b86adf 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 900;
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}

.login-button {
  width: 100%;
  max-width: 100%;
  padding: 0.8rem 1rem;
  background: linear-gradient(90deg, #7b5cff 30%, #b86adf 70%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(123, 92, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-sizing: border-box;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 92, 255, 0.3);
  background: linear-gradient(90deg, #8b6cff 30%, #c87aef 70%);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(123, 92, 255, 0.2);
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
  .login-button {
    padding: 0.7rem 1rem;
    font-size: 1rem;
    border-radius: 6px;
  }
}
</style>
