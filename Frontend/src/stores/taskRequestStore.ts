import { assignTeamToTask, createTask, deleteMockTask, fetchMockTaskById, fetchTasks, updateTask } from '@/api/TaskApi'
import type { TaskRequest as ApiTaskRequest, TaskStatus } from '@/api/TaskApi'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface FormTaskRequest {
  id: number;
  project: {
    name: string;
    description: string;
    type: string;
  };
  features: {
    core: string[];
    custom: string | null;
  };
  requirements: {
    design: boolean;
    externalIntegration: boolean;
    support: boolean;
    paymentIntegration: boolean;
    adminPanel: boolean;
  };
  estimation: {
    time: {
      months: number;
      recommended: number;
    };
    budget: {
      amount: number;
      recommended: number;
    };
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  status: RequestStatus;
  preview: string;
  assignedTeamId?: string;
  deadline?: string;
}

export enum RequestStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export const statusLabels: Record<RequestStatus, string> = {
  [RequestStatus.NEW]: 'Новая',
  [RequestStatus.IN_PROGRESS]: 'В работе',
  [RequestStatus.COMPLETED]: 'Выполнено',
}

interface TaskRequestState {
  requests: FormTaskRequest[];
  currentRequest: FormTaskRequest | null;
  loading: boolean;
  error: string | null;
}

// Функция для конвертации API формата в формат формы
function convertApiToFormRequest(apiRequest: ApiTaskRequest): FormTaskRequest {
  return {
    id: apiRequest.id,
    project: {
      name: apiRequest.name,
      description: apiRequest.description,
      type: 'web' // дефолтное значение
    },
    features: {
      core: [],
      custom: null
    },
    requirements: {
      design: false,
      externalIntegration: false,
      support: false,
      paymentIntegration: false,
      adminPanel: false
    },
    estimation: {
      time: {
        months: 3,
        recommended: 3
      },
      budget: {
        amount: 150000,
        recommended: 150000
      }
    },
    contact: {
      name: apiRequest?.companyName || 'Отсутствует компания', // используем название компании как имя контакта
      email: 'contact@example.com',
      phone: '+7 (999) 123-45-67'
    },
    status: apiRequest.status as RequestStatus,
    preview: apiRequest?.preview || apiRequest?.name || 'Отсутствует название',
    deadline: apiRequest.deadline,
    assignedTeamId: apiRequest?.teamId || '0'
  }
}

// Функция для конвертации формата формы в API формат
function convertFormToApiRequest(request: FormTaskRequest): ApiTaskRequest {
  return {
    id: request.id,
    name: request.project.name,
    description: request.project.description,
    status: request.status as TaskStatus,
    deadline: request.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    content: request,
  }
}

export const useTaskRequestStore = defineStore('taskRequest', {
  state: (): TaskRequestState => ({
    requests: [],
    currentRequest: null,
    loading: false,
    error: null
  }),

  getters: {
    getRequests: (state): FormTaskRequest[] => state.requests,
    getCurrentRequest: (state): FormTaskRequest | null => state.currentRequest,
    isLoading: (state): boolean => state.loading,
    getError: (state): string | null => state.error
  },

  actions: {
    async createRequest(requestData: FormTaskRequest): Promise<FormTaskRequest> {
      console.log('requestData', requestData)
        const newTask = await createTask(
          requestData.project.name,
          requestData.project.description,
          requestData.estimation.time.months,
          requestData
        );
        this.requests.push(convertApiToFormRequest(newTask))
        this.currentRequest = convertApiToFormRequest(newTask)
        return convertApiToFormRequest(newTask)
    },

    async fetchRequests(sort: 'deadline' | 'status' = 'status'): Promise<FormTaskRequest[]> {
      this.loading = true
      this.error = null
      
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
        const lastId = this.requests[this.requests.length - 1]?.id || 0

        const requests = await fetchTasks(undefined, 10, lastId, sort, token as string)
        const convertedRequests = requests.map(task => convertApiToFormRequest(task))
        this.requests.push(...convertedRequests)
        return convertedRequests
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявок'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchRequestById(id: number): Promise<void> {
      this.loading = true
      this.error = null
      
      try {
        const apiRequest = await fetchMockTaskById(id)
        if (!apiRequest) {
          throw new Error('Заявка не найдена')
        }
        this.currentRequest = convertApiToFormRequest(apiRequest)
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateRequest(id: number, requestData: FormTaskRequest) {
      this.loading = true
      this.error = null
      
      try {
        const apiRequest = convertFormToApiRequest(requestData)
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] as string
        await updateTask(id, token, apiRequest)
        
        this.clearCurrentRequest()
        this.fetchRequests();
      } catch (error) {
        this.error = 'Произошла ошибка при обновлении заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    async assignTeam(taskId: number, teamId: number) {
      this.loading = true
      this.error = null
      
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] as string
        await assignTeamToTask(taskId, teamId, token);
        
        this.clearCurrentRequest()
        this.fetchRequests();
      } catch (error) {
        this.error = 'Произошла ошибка при обновлении заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteRequest(id: number): Promise<void> {
      this.loading = true
      this.error = null
      
      try {
        const deletedId = await deleteMockTask(id)
        if (deletedId === null) {
          throw new Error('Заявка не найдена')
        }
        const index = this.requests.findIndex(request => request.id === id) 
        if (index !== -1) {
          this.requests.splice(index, 1)
        }
        if (this.currentRequest?.id === id) {
          this.currentRequest = null
        }
      } catch (error: any) {
        this.error = 'Произошла ошибка при удалении заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError(): void {
      this.error = null
    },

    clearRequests(): void {
      this.requests = []
    },

    clearCurrentRequest(): void {
      this.currentRequest = null
    }
  }
}) 