import { createTask, deleteMockTask, fetchMockTaskById, fetchTasks, updateMockTask } from '@/api/tasks/mockTaskApi'
import type { TaskRequest as ApiTaskRequest } from '@/api/tasks/mockData'
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
  COMPLETED = 'completed'
}

export const statusLabels: Record<RequestStatus, string> = {
  [RequestStatus.NEW]: 'Новая',
  [RequestStatus.IN_PROGRESS]: 'В работе',
  [RequestStatus.COMPLETED]: 'Выполнено'
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
      name: apiRequest.title,
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
      name: apiRequest.companyName, // используем название компании как имя контакта
      email: 'contact@example.com',
      phone: '+7 (999) 123-45-67'
    },
    status: apiRequest.status as RequestStatus,
    preview: apiRequest.preview,
    deadline: apiRequest.deadline,
    assignedTeamId: apiRequest.assignedTeamId
  }
}

// Функция для конвертации формата формы в API формат
function convertFormToApiRequest(request: FormTaskRequest): ApiTaskRequest {
  return {
    id: request.id,
    title: request.project.name,
    description: request.project.description,
    status: request.status,
    preview: request.preview,
    deadline: request.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: request.contact.name,
    assignedTeamId: request.assignedTeamId
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
        console.log(requestData.project.name, requestData.project.description, requestData.estimation.time, requestData.content)
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

    async fetchRequests(): Promise<FormTaskRequest[]> {
      this.loading = true
      this.error = null
      
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
        const requests = await fetchTasks(token as string)
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

    async updateRequest(id: number, requestData: FormTaskRequest): Promise<FormTaskRequest> {
      this.loading = true
      this.error = null
      
      try {
        const apiRequest = convertFormToApiRequest(requestData)
        const updatedApiRequest = await updateMockTask(id, apiRequest)
        
        if (!updatedApiRequest) {
          throw new Error('Заявка не найдена')
        }

        const convertedRequest = {
          ...requestData,
          id: updatedApiRequest.id,
          status: updatedApiRequest.status as RequestStatus
        }
      
        const index = this.requests.findIndex(request => request.id === id)
        if (index !== -1) {
          this.requests[index] = convertedRequest
        }
        this.currentRequest = convertedRequest
        return convertedRequest
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

    clearCurrentRequest(): void {
      this.currentRequest = null
    }
  }
}) 