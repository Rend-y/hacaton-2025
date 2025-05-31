<template>
  <div class="not-found-wrapper">
    <div class="not-found-card">
      <h1 class="gradient-title">404</h1>
      <h2 class="gradient-subtitle">Страница не найдена</h2>
      <p class="desc">Извините, запрашиваемая страница не существует.</p>
      <router-link to="/" class="home-button">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style scoped>
.not-found-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.not-found-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: 2rem;
}

.gradient-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.gradient-subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.desc {
  color: #7f8c8d;
  margin-bottom: 2.5rem;
}

.home-button {
  display: block;
  width: 100%;
  padding: 0.9rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%);
  border: none;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 2px 8px 0 rgba(162, 89, 255, 0.10);
  transition: background 0.3s, box-shadow 0.3s;
  letter-spacing: 1px;
}

.home-button:hover {
  background: linear-gradient(90deg, #6a82fb 0%, #a259ff 100%);
  box-shadow: 0 4px 16px 0 rgba(162, 89, 255, 0.18);
}
</style> 