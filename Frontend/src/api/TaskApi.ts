import axios from 'axios'
export type TaskStatus = 'new' | 'in_progress' | 'completed'

export interface TaskRequest {
  id: number
  name: string
  description: string
  content: object
  status: TaskStatus
  teamId: number
  deadline: string
}

/**
 * Получение списка задач с пагинацией
 */
export async function fetchTasks(searchQuery?: string, limit?: number, skip?: number, sort?: 'deadline' | 'status', token?: string): Promise<TaskRequest[]> {
  const response = await axios.get('/api/tasks', {
    params: {
      limit,
      skip,
      sort,
      query: searchQuery,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

/**
 * Получение задачи по ID
 */
export async function fetchMockTaskById(id: number, token: string): Promise<TaskRequest | null> {
  const response = await axios.get(`/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export async function updateTask(id: number, token: string, task: Omit<TaskRequest, 'id'>): Promise<void> {
  await axios.put(`/api/tasks/${id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function createTask(title: string, description: string, deadline: number, content: object): Promise<TaskRequest> {
  console.log(title, description, deadline, content)
  const response = await axios.post('/api/tasks', {
    name: title,
    description: description,
    deadline: new Date(Date.now() + (deadline * 24 * 60 * 60 * 1000)).toISOString(),
    content: content,
  })
  return response.data
}

/**
 * Назначение команды на задачу
 */
export async function assignTeamToTask(id: number, teamId: number, token: string): Promise<void> {
  await axios.post(`/api/tasks/${id}/assign-team`, {
    id: teamId
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Удаление задачи
 */
export async function deleteMockTask(id: number): Promise<number | null> {
  await delay(300)
  
  return id
} 