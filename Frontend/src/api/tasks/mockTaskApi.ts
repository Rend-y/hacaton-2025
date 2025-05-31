import type { TaskRequest, TaskStatus } from './mockData'
import { bigMockTasks } from './mockData'

/**
 * Имитация задержки сети
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Получение списка задач с пагинацией
 */
export async function fetchMockTasks(page = 1, pageSize = 10): Promise<TaskRequest[]> {
  await delay(500) // Имитация задержки сети
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return bigMockTasks().slice(start, end)
}

/**
 * Получение задачи по ID
 */
export async function fetchMockTaskById(id: number): Promise<TaskRequest | null> {
  await delay(300)
  const index = Math.floor(Math.random() * bigMockTasks().length)
  const task = bigMockTasks()[index]
  return {
    ...task,
    id
  }
}

export async function updateMockTask(id: number, task: TaskRequest): Promise<TaskRequest | null> {
  await delay(300)
  return {
    ...task,
    id
  }
}

/**
 * Обновление статуса задачи
 */
export async function updateMockTaskStatus(id: number, status: TaskStatus): Promise<boolean | null> {
  await delay(300)
  return true
}

/**
 * Создание новой задачи
 */
export async function createMockTask(task: Omit<TaskRequest, 'id' | 'status'>): Promise<TaskRequest> {
  await delay(500)
  const newTask: TaskRequest = {
    ...task,
    id: Math.floor(Math.random() * 1000000),
    status: 'new' as TaskStatus,
  }
  return newTask
}

/**
 * Удаление задачи
 */
export async function deleteMockTask(id: number): Promise<number | null> {
  await delay(300)
  
  return id
} 