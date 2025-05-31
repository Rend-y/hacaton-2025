import { getTeamData, type ITeamData } from '@/api/TeamApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TeamMember {
  id: string
  name: string
  role: string
}

export interface Team {
  id: number
  name: string
  projectType: string
  status: 'available' | 'in_project' | 'on_break'
  members: TeamMember[]
  techStack: string[]
}

const formatApiTypeToStore = (apiData: ITeamData): Team => ({
  id: apiData.id,
  name: apiData.name,
  projectType: 'Frontend',
  status: apiData.status,
  members: apiData.members.map((item, index) => ({
    id: index.toString(),
    name: item.name,
    role: item.position
  })),
  techStack: apiData.techStack
})

export const useTeamStore = defineStore('team', () => {
  const teams = ref<Team[]>([])

  const fetchTeams = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] as string
    const lastId = teams.value[teams.value.length - 1]?.id || 0
    const req = await getTeamData(0, 10, lastId, token)
    const mapType = req.map(item => formatApiTypeToStore(item))
    teams.value.push(...mapType)
  }

  const createTeam = (teamData: Partial<Team>) => {
    const newTeam: Team = {
      id: teams.value.length + 1,
      name: teamData.name || '',
      projectType: teamData.projectType || '',
      status: 'available',
      members: teamData.members || [],
      techStack: teamData.techStack || []
    }
    teams.value.push(newTeam)
  }

  const updateTeam = (teamData: Partial<Team> & { id: number }) => {
    const idx = teams.value.findIndex(t => t.id === teamData.id)
    if (idx !== -1) {
      teams.value[idx] = {
        ...teams.value[idx],
        ...teamData,
        id: teams.value[idx].id, // id не меняем
        status: teams.value[idx].status // статус не меняем
      }
    }
  }

  return {
    teams,
    fetchTeams,
    createTeam,
    updateTeam
  }
}) 