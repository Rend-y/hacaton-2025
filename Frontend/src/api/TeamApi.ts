import axios from 'axios';

export interface ITeamData {
   id: number
  name: string,
   members: Array<{ name: string; position: string }>,
   status: 'available'| 'in_project'| 'on_break',
  techStack: Array<string>
  description: string
}

export async function createTeam(token: string, teamData: Omit<ITeamData, 'id'>): Promise<any> {
  return axios.post('/api/teams', teamData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

export async function getTeamData(page: number, limit: number, skip: number, token: string): Promise<Array<ITeamData>> {
   const req = await axios.get('/api/teams', {
      params: {
         page,
         limit,
         skip,
      },
      headers: {
         'Authorization': `Bearer ${token}`,
      },
   })
   return req.data
}