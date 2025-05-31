import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TeamMember {
  id: string
  name: string
  role: string
}

export interface Team {
  id: string
  name: string
  projectType: string
  status: 'available' | 'in_project' | 'on_break'
  members: TeamMember[]
  techStack: string[]
}

export const useTeamStore = defineStore('team', () => {
  const teams = ref<Team[]>([])

  // Temporary mock data for demonstration
  const mockTeams: Team[] = [
    {
      id: '1',
      name: 'Команда Alpha',
      projectType: 'Веб-приложение',
      status: 'available',
      members: [
        { id: '1', name: 'Иван Петров', role: 'Frontend Developer' },
        { id: '2', name: 'Мария Сидорова', role: 'Backend Developer' },
        { id: '3', name: 'Алексей Иванов', role: 'UI/UX Designer' }
      ],
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Figma']
    },
    {
      id: '2',
      name: 'Команда Beta',
      projectType: 'Мобильное приложение',
      status: 'in_project',
      members: [
        { id: '4', name: 'Анна Козлова', role: 'Mobile Developer' },
        { id: '5', name: 'Дмитрий Волков', role: 'Backend Developer' },
        { id: '6', name: 'Елена Морозова', role: 'QA Engineer' }
      ],
      techStack: ['Flutter', 'Firebase', 'Swift', 'Kotlin']
    },
    {
      id: '3',
      name: 'Команда Gamma',
      projectType: 'Десктопное приложение',
      status: 'on_break',
      members: [
        { id: '7', name: 'Павел Соколов', role: 'C++ Developer' },
        { id: '8', name: 'Ольга Новикова', role: 'System Architect' },
        { id: '9', name: 'Сергей Попов', role: 'QA Engineer' }
      ],
      techStack: ['C++', 'Qt', 'SQLite', 'CMake']
    }
  ]

  const fetchTeams = async () => {
    // In a real application, this would be an API call
    // For now, we'll just use mock data
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    teams.value = mockTeams
  }

  return {
    teams,
    fetchTeams
  }
}) 