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
  
  // Ensure we have at least 6 months from current date
  const startDate = new Date();
  const endDates = tasks.value.map(t => new Date(t.deadline));
  const maxDate = new Date(Math.max(
    ...endDates.map(d => d.getTime()),
    new Date(startDate.getFullYear(), startDate.getMonth() + 5, 1).getTime()
  ));
  
  const months: string[] = [];
  const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  
  // Ensure we generate at least two months even if no tasks
  do {
    const monthStr = new Intl.DateTimeFormat('ru', { 
      month: 'long', 
      year: 'numeric' 
    }).format(currentDate);
    months.push(monthStr);
    
    currentDate.setMonth(currentDate.getMonth() + 1);
  } while (
    currentDate <= maxDate || 
    months.length < 2 // Minimum 2 months
  );
  
  console.log('Generated months:', months);
  console.log('Start date:', startDate);
  console.log('Max date:', maxDate);
  console.log('Tasks deadlines:', tasks.value.map(t => t.deadline));
  
  return months;
});

// Get tasks for a specific team
const teamTasks = (teamId: number) => {
  console.log('Getting tasks for team:', teamId);
  console.log('Available tasks:', tasks.value);
  return tasks.value.filter(t => t.teamId === teamId);
};

// Calculate task bar style (position and width)
const getTaskStyle = (task: TaskRequest) => {
  const startDate = new Date(); // Используем текущую дату как начало задачи
  const endDate = new Date(task.deadline);
  const monthsList = months.value;
  
  if (!monthsList.length) return {};
  
  // Parse first month date
  const [firstMonthName, firstYearStr] = monthsList[0].split(' ');
  const firstDate = new Date(parseInt(firstYearStr), getMonthNumber(firstMonthName), 1);
  
  // Debug logging
  console.log('Task:', task.name);
  console.log('Start date:', startDate.toISOString());
  console.log('End date:', endDate.toISOString());
  console.log('First grid date:', firstDate.toISOString());
  console.log('Months list:', monthsList);
  
  // Calculate start position (in months)
  const startPosition = (startDate.getFullYear() - firstDate.getFullYear()) * 12 + 
    (startDate.getMonth() - firstDate.getMonth());
    
  // Calculate total months in the grid
  const lastMonthStr = monthsList[monthsList.length - 1];
  const [lastMonthName, lastYearStr] = lastMonthStr.split(' ');
  const lastDate = new Date(parseInt(lastYearStr), getMonthNumber(lastMonthName) + 1, 0); // Last day of the month
  
  // Calculate months difference for width
  let monthsDiff = 0;
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    monthsDiff++;
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  console.log('Start position:', startPosition);
  console.log('Months difference:', monthsDiff);
  
  // Ensure the task doesn't extend beyond the grid
  const totalMonths = monthsList.length;
  if (startPosition + monthsDiff > totalMonths) {
    monthsDiff = totalMonths - startPosition;
  }
  
  const colors = {
    new: '#4ECDC4',
    in_progress: '#45B7D1',
    completed: '#96CEB4'
  };
  
  return {
    backgroundColor: colors[task.status] || '#FF6B6B',
    gridColumn: `${startPosition + 1} / span ${monthsDiff}`
  };
};

// Helper function to convert month name to number
const getMonthNumber = (monthName: string): number => {
  const months: { [key: string]: number } = {
    'январь': 0, 'февраль': 1, 'март': 2, 'апрель': 3,
    'май': 4, 'июнь': 5, 'июль': 6, 'август': 7,
    'сентябрь': 8, 'октябрь': 9, 'ноябрь': 10, 'декабрь': 11
  };
  return months[monthName.toLowerCase()] || 0;
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
  position: relative;
  height: calc(100vh - 200px);
}

.gantt-header {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 3;
  width: max-content;
  min-width: 100%;
}

.team-header {
  min-width: 250px;
  width: 250px;
  padding: 12px;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  position: sticky;
  left: 0;
  z-index: 4;
}

.team-name {
  min-width: 250px;
  width: 250px;
  padding: 12px;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  position: sticky;
  left: 0;
  z-index: 2;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.months-header {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(150px, 1fr);
  flex: 1;
  min-width: max-content;
}

.month-cell {
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

.gantt-body {
  position: relative;
  width: max-content;
  min-width: 100%;
}

.gantt-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  min-height: 60px;
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
  min-width: max-content;
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