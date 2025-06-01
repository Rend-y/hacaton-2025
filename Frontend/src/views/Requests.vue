<template>
  <div class="requests-page">
    <div class="thank-you-container">
      <div class="thank-you-content">
        <h1 class="gradient-title">Спасибо за вашу заявку!</h1>
        <p class="message">Мы получили вашу заявку и в ближайшее время свяжемся с вами для обсуждения деталей.</p>
        <div class="status-info">
          <p>Статус вашей заявки: <span class="status">В обработке</span></p>
        </div>
        <button class="back-button" @click="goBack">Вернуться на главную</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.requests-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 20px;
}

.thank-you-container {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(80, 36, 143, 0.08), 0 0 0 1px #ede7fa;
  padding: 3rem 2.5rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.gradient-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #7b5cff 30%, #b86adf 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.message {
  color: #2c244d;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.status-info {
  background: #ede6fa;
  padding: 1.2rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.status {
  color: #7b5cff;
  font-weight: 700;
}

.back-button {
  background: linear-gradient(90deg, #7b5cff 30%, #b86adf 70%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(123, 92, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 92, 255, 0.3);
  background: linear-gradient(90deg, #8b6cff 30%, #c87aef 70%);
}

.back-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(123, 92, 255, 0.2);
}

@media (max-width: 600px) {
  .thank-you-container {
    padding: 2rem 1.5rem;
  }

  .gradient-title {
    font-size: 2rem;
  }

  .message {
    font-size: 1rem;
  }

  .back-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style> 