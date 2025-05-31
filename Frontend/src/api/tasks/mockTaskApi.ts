import axios from 'axios'
import type { TaskRequest, TaskStatus } from './mockData'
import { bigMockTasks } from './mockData'

/**
 * Имитация задержки сети
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Получение списка задач с пагинацией
 */
export async function fetchTasks(token: string): Promise<TaskRequest[]> {
  const response = await axios.get('/api/tasks', {
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

export async function updateMockTask(id: number, task: TaskRequest): Promise<TaskRequest | null> {
  await delay(300)
  return {
    id,
    preview: task.preview,
    title: task.title,
    description: task.description,
    status: task.status,
    deadline: task.deadline,
    companyName: task.companyName,
  }
}

/**
 * Обновление статуса задачи
 */
export async function updateMockTaskStatus(id: number, status: TaskStatus): Promise<boolean | null> {
  await delay(300)
  return true
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
 * Удаление задачи
 */
export async function deleteMockTask(id: number): Promise<number | null> {
  await delay(300)
  
  return id
} 