import { getTeamData, type ITeamData, createTeam as createTeamApi, updateTeam as updateTeamApi } from '@/api/TeamApi'
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
  projectType: apiData.description,
  status: apiData.status,
  members: apiData.members.map((item, index) => ({
    id: index.toString(),
    name: item.name,
    role: item.position
  })),
  techStack: apiData.techStack
})

const fromStoreTypeToApi = (storeType: Team): ITeamData => ({
  id: storeType.id,
  name: storeType.name,
  description: storeType.projectType,
  status: storeType.status,
  members: storeType.members.map((item) => ({
    name: item.name,
    position: item.role
  })),
  techStack: storeType.techStack
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

  const createTeam = async (teamData: Omit<Team, 'id' | 'status'>) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] as string
    await createTeamApi(token, {
      name: teamData.name,
      description: teamData.projectType,
      members: teamData.members.map((item) => ({
        name: item.name,
        position: item.role
      })),
      techStack: teamData.techStack
    })
    clearTeams()
    fetchTeams()
  }

  const updateTeam = async (teamData: Team) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] as string
    await updateTeamApi(token, teamData.id, {
      name: teamData.name,
      description: teamData.projectType,
      members: teamData.members.map((item) => ({
        name: item.name,
        position: item.role
      })),
      techStack: teamData.techStack
    })
    clearTeams()
    fetchTeams()
  }
  
  const clearTeams = () => (teams.value = [])

  return {
    teams,
    fetchTeams,
    createTeam,
    updateTeam
  }
}) 