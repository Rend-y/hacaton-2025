<template>
  <div class="projects-gantt">
    <h2>График занятости команд</h2>
    <div v-if="teams.length" class="gantt-wrapper">
      <div class="gantt-header">
        <div class="team-header">Команды</div>
        <div class="months-header">
          <div v-for="month in months" :key="month" class="month-cell">
            {{ month }}
          </div>
        </div>
      </div>
      
      <div class="gantt-body">
        <div v-for="team in teams" :key="team.id" class="gantt-row">
          <div class="team-name">
            {{ team.name }}
            <div class="team-status" :class="team.status">
              {{ statusLabels[team.status] }}
            </div>
          </div>
          <div class="timeline">
            <div 
              v-for="task in teamTasks(team.id)" 
              :key="task.id"
              class="project-bar"
              :style="getTaskStyle(task)"
              :title="`${task.name} (${formatDate(task.deadline)})`"
            >
              {{ task.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      Нет данных о командах
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useTeamStore, type Team } from '@/stores/teamStore';
import type { TaskRequest } from '@/api/TaskApi';

const teamStore = useTeamStore();
const tasks = ref<TaskRequest[]>([]);

const teams = computed(() => teamStore.teams);

const statusLabels: Record<string, string> = {
  available: 'Доступна',
  in_project: 'В проекте',
  on_break: 'На перерыве'
};

// Calculate months range
const months = computed(() => {
  if (!tasks.value.length) return [];
  
  const dates = tasks.value.map(t => new Date(t.deadline));
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  const months: string[] = [];
  const currentDate = new Date(minDate);
  currentDate.setDate(1); // Start from the first day of the month
  
  while (currentDate <= maxDate) {
    months.push(new Intl.DateTimeFormat('ru', { month: 'long', year: 'numeric' }).format(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return months;
});

// Get tasks for a specific team
const teamTasks = (teamId: number) => {
  return tasks.value.filter(t => t.teamId === teamId);
};

// Calculate task bar style (position and width)
const getTaskStyle = (task: TaskRequest) => {
  const startDate = new Date(); // Используем текущую дату как начало задачи
  const endDate = new Date(task.deadline);
  const monthsList = months.value;
  
  if (!monthsList.length) return {};
  
  // Calculate start position
  const startMonth = startDate.getMonth() + startDate.getFullYear() * 12;
  const firstMonth = new Date(monthsList[0].split(' ')[1]);
  const firstMonthValue = firstMonth.getMonth() + firstMonth.getFullYear() * 12;
  const startPosition = startMonth - firstMonthValue;
  
  // Calculate width (in months)
  const endMonth = endDate.getMonth() + endDate.getFullYear() * 12;
  const width = endMonth - startMonth + 1;
  
  const colors = {
    new: '#4ECDC4',
    in_progress: '#45B7D1',
    completed: '#96CEB4'
  };
  
  return {
    backgroundColor: colors[task.status] || '#FF6B6B',
    gridColumn: `${startPosition + 1} / span ${width}`
  };
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

// Fetch data from backend
const fetchData = async () => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      console.error('No token found');
      return;
    }

    // Fetch teams
    await teamStore.fetchTeams();

    // Fetch tasks
    const response = await axios.get('/api/tasks', {
      params: {
        limit: 100, // Получаем больше задач для полноты данных
        sort: 'deadline'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    tasks.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.projects-gantt {
  padding: 20px;
  height: 100%;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.gantt-wrapper {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: auto;
}

.gantt-header {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 2;
}

.team-header {
  width: 250px;
  padding: 12px;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
}

.months-header {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(150px, 1fr);
}

.month-cell {
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
}

.gantt-body {
  min-height: 400px;
}

.gantt-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  min-height: 60px;
}

.team-name {
  width: 250px;
  padding: 12px;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.team-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.team-status.available {
  background-color: #4CAF50;
  color: white;
}

.team-status.in_project {
  background-color: #2196F3;
  color: white;
}

.team-status.on_break {
  background-color: #FF9800;
  color: white;
}

.timeline {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(150px, 1fr);
  position: relative;
  flex: 1;
  padding: 4px 0;
}

.project-bar {
  position: relative;
  margin: 4px 0;
  padding: 8px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}
</style> 