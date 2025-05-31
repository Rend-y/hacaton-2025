<template>
  <div class="wrapper">
    <!-- Сайдбар -->
    <aside class="sidebar" :class="{ 'sidebar-compact': !isSidebarExpanded }">
      <h2 class="title" :class="{ 'title-compact': !isSidebarExpanded }">
        <span v-if="isSidebarExpanded">Панель администратора</span>
        <span v-else class="logo">⚡</span>
      </h2>
      <div class="sidebar-divider"></div>
      <nav>
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.key"
            :class="{ active: activeTab === item.key }"
            @click="activeTab = item.key as 'requests' | 'teams' | 'projects'"
          >
            <span class="icon">{{ item.icon }}</span>
            <span class="label" v-show="isSidebarExpanded">{{ item.label }}</span>
            <span v-if="item.badge && isSidebarExpanded" class="badge">{{ item.badge }}</span>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer">
        <div class="sidebar-divider"></div>
        <button class="toggle-btn" @click="toggleSidebar">
          {{ isSidebarExpanded ? '◀' : '▶' }}
        </button>
      </div>
    </aside>

    <!-- Контент -->
    <main class="content" :class="{ 'content-expanded': !isSidebarExpanded }">
      <RequestsList v-if="activeTab === 'requests'" />
      <TeamsList v-else-if="activeTab === 'teams'" />
      <ProjectsList v-else-if="activeTab === 'projects'" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import RequestsList from '@/components/admin/RequestsList.vue'
import TeamsList from '@/components/admin/TeamsList.vue'
import ProjectsList from '@/components/admin/ProjectsList.vue'

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
const isSidebarExpanded = ref(true)

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
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
  justify-content: center;
  align-items: center;
  background: #f8f6ff;
}

.sidebar {
  width: 320px;
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 24px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px 0 rgba(80, 36, 143, 0.08), 0 0 0 1px #ede7fa;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.sidebar-compact {
  width: 80px;
  padding: 2rem 0.5rem;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1rem;
}

.toggle-btn {
  width: 100%;
  background: #f6f1fa;
  border: 2px solid #b084dc;
  color: #7c3aed;
  padding: 0.8rem;
  border-radius: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.toggle-btn:hover {
  background: #fff;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(176, 132, 220, 0.2);
}

.sidebar-compact .toggle-btn {
  padding: 0.8rem 0.5rem;
}

.title {
  font-weight: 800;
  margin-bottom: 1.2rem;
  font-size: 1.15rem;
  color: #a259f7;
  text-align: center;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-compact {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.title-compact .logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-10deg);
  filter: drop-shadow(0 2px 4px rgba(162, 89, 247, 0.2));
  width: 100%;
  height: 100%;
}

.sidebar-divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #e7d8fa 0%, #f7effa 100%);
  border-radius: 2px;
  margin-bottom: 2rem;
  box-shadow: 0 1px 4px 0 rgba(162, 89, 247, 0.04);
}

nav {
  width: 100%;
  box-sizing: border-box;
}

nav ul {
  list-style: none;
  padding: 0;
  width: 100%;
  margin: 0;
  min-width: 0;
  box-sizing: border-box;
}

nav li {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1.1rem;
  border-radius: 18px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4b3b6b;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  background: #f6f1fa;
  border: 2px solid transparent;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  gap: 0.5rem;
}

nav li:hover {
  border: 2px solid #b084dc;
}

nav li.active {
  background: #fff;
  color: #7c3aed;
  box-shadow: 0 6px 24px 0 rgba(176, 132, 220, 0.18);
  border: 2px solid #b084dc;
  transform: scale(1.03);
}

nav li.active:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 28px 0 rgba(176, 132, 220, 0.25);
}

nav li.active:active {
  transform: scale(1.02);
  box-shadow: 0 4px 16px 0 rgba(176, 132, 220, 0.2);
}

.sidebar-compact nav li {
  padding: 1.1rem 0.5rem;
  justify-content: center;
}

nav li .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  min-width: 28px;
  margin-right: 0;
  font-size: 1.4rem;
}

.sidebar-compact nav li .icon {
  margin-right: 0;
}

nav li .label {
  flex: 1;
  text-align: left;
  transition: all 0.3s ease;
}

nav li.active .icon {
  color: #7c3aed;
}

nav li.active .badge {
  background: linear-gradient(90deg, #a259f7 0%, #6a82fb 100%);
  color: #fff;
}

nav li span.badge {
  margin-left: 0.5rem;
}

.badge {
  background: linear-gradient(90deg, #a259f7 0%, #6a82fb 100%);
  color: white;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 700;
  margin-left: 0.5rem;
  box-shadow: 0 1px 4px 0 rgba(162, 89, 247, 0.10);
}

.content {
  flex: 1;
  min-width: 340px;
  height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(80, 36, 143, 0.08), 0 0 0 1px #ede7fa;
  padding: 2.5rem 2rem;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.content-expanded {
  margin-left: 0.5rem;
}

@media (max-width: 900px) {
  .toggle-btn {
    display: none;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    align-items: stretch;
  }
  
  .sidebar-compact {
    width: 100%;
    padding: 2rem 1.5rem;
  }
  
  .title-compact {
    font-size: 1.35rem;
  }
  
  .content {
    height: auto;
    margin-left: 0;
    padding: 1.5rem 1rem;
  }
  
  .sidebar-footer {
    display: none;
  }
}
</style>
