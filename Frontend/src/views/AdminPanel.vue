<template>
  <div class="wrapper">
    <!-- Сайдбар -->
    <aside class="sidebar">
      <h2 class="title">Панель администратора</h2>
      <nav>
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.key"
            :class="{ active: activeTab === item.key }"
            @click="activeTab = item.key as 'requests' | 'teams' | 'projects'"
          >
            {{ item.icon }} {{ item.label }}
            <span v-if="item.badge" class="badge">{{ item.badge }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Контент -->
    <main class="content">
      <template v-if="activeTab === 'requests'">
        <div
          v-for="(request, index) in requests"
          :key="index"
          class="card"
          @click="toggle(index)"
        >
          <div class="card-header">
            <div class="avatar">A</div>
            <div class="info">
              <strong>Заявка</strong>
              <div v-if="!request.expanded" class="desc">
                {{ request.preview }}
              </div>
            </div>
            <div class="arrow">{{ request.expanded ? '▲' : '▼' }}</div>
          </div>

          <div v-if="request.expanded" class="card-body">
            <h4>{{ request.title }}</h4>
            <p>{{ request.description }}</p>
          </div>
        </div>
      </template>

      <template v-else-if="activeTab === 'teams'">
        <p>Список команд будет здесь</p>
      </template>

      <template v-else-if="activeTab === 'projects'">
        <p>Активные проекты будут здесь</p>
      </template>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuItems = [
  {
    key: 'requests',
    icon: '🖥️',
    label: 'Заявки',
    badge: 24,
  },
  {
    key: 'teams',
    icon: '👥',
    label: 'Команды',
  },
  {
    key: 'projects',
    icon: '📅',
    label: 'Проекты в работе',
  },
]

const activeTab = ref<'requests' | 'teams' | 'projects'>('requests')

const requests = ref([
  {
    preview: 'Начало описания задачи бла бла бла бла...',
    title: 'Название проекта',
    description: 'Описание проекта бла бла',
    expanded: false,
  },
  {
    preview: 'Ещё одна задача — текст бла бла...',
    title: 'Второй проект',
    description: 'Описание второго проекта',
    expanded: false,
  },
])

function toggle(index: number) {
  requests.value[index].expanded = !requests.value[index].expanded
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  height: calc(100vh - 2rem);
  box-sizing: border-box;
}

.sidebar {
  width: 240px;
  background: #f7effa;
  padding: 1rem;
  border-radius: 10px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 1px #ddd;
}

.title {
  font-weight: bold;
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
}

nav li.active {
  background-color: #d8c8f0;
}

.badge {
  background-color: #b084dc;
  color: white;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
}

.content {
  flex: 1;
  min-width: 300px;
  height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  background: #f7effa;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #ddd;
  padding: 2rem;
}

.card {
  background: #f7effa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 0 0 1px #ddd;
}

.card-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.avatar {
  background-color: #d2b4f5;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-weight: bold;
  margin-right: 1rem;
}

.info {
  flex: 1;
}

.arrow {
  font-size: 1.2rem;
  margin-left: auto;
}

.card-body {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    padding: 1rem;
    min-height: 100vh;
    height: auto;
  }

  .sidebar {
    width: 100%;
    height: auto;
  }
  .content {
    height: auto;
  }
}
</style>
