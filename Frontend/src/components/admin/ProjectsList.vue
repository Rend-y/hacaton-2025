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
          <div class="team-name">{{ team.name }}</div>
          <div class="timeline">
            <div 
              v-for="project in teamProjects(team.id)" 
              :key="project.id"
              class="project-bar"
              :style="getProjectStyle(project)"
              :title="project.name"
            >
              {{ project.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      Нет данных о проектах
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

interface Team {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  teamId: number;
  startDate: string;
  endDate: string;
}

const teams = ref<Team[]>([]);
const projects = ref<Project[]>([]);

// Generate random color for projects
const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Calculate months range
const months = computed(() => {
  if (!projects.value.length) return [];
  
  const dates = projects.value.flatMap(p => [new Date(p.startDate), new Date(p.endDate)]);
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

// Get projects for a specific team
const teamProjects = (teamId: number) => {
  return projects.value.filter(p => p.teamId === teamId);
};

// Calculate project bar style (position and width)
const getProjectStyle = (project: Project) => {
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const monthsList = months.value;
  
  // Calculate start position
  const startMonth = startDate.getMonth() + startDate.getFullYear() * 12;
  const firstMonth = new Date(monthsList[0].split(' ')[1]);
  const firstMonthValue = firstMonth.getMonth() + firstMonth.getFullYear() * 12;
  const startPosition = startMonth - firstMonthValue;
  
  // Calculate width (in months)
  const endMonth = endDate.getMonth() + endDate.getFullYear() * 12;
  const width = endMonth - startMonth + 1;
  
  return {
    backgroundColor: getRandomColor(),
    gridColumn: `${startPosition + 1} / span ${width}`
  };
};

// Fetch data from backend
const fetchData = async () => {
  try {
    // Mock data for testing
    teams.value = [
      { id: 1, name: 'Команда разработки' },
      { id: 2, name: 'Команда дизайна' },
      { id: 3, name: 'Команда тестирования' }
    ];
    
    projects.value = [
      {
        id: 1,
        name: 'Проект А',
        teamId: 1,
        startDate: '2024-03-01',
        endDate: '2024-05-30'
      },
      {
        id: 2,
        name: 'Проект Б',
        teamId: 2,
        startDate: '2024-04-15',
        endDate: '2024-07-15'
      },
      {
        id: 3,
        name: 'Проект В',
        teamId: 3,
        startDate: '2024-05-01',
        endDate: '2024-08-30'
      },
      {
        id: 4,
        name: 'Проект Г',
        teamId: 1,
        startDate: '2024-06-01',
        endDate: '2024-09-30'
      }
    ];
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
}

.team-header {
  width: 200px;
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
}

.team-name {
  width: 200px;
  padding: 12px;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

.timeline {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(150px, 1fr);
  position: relative;
  flex: 1;
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
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}
</style> 