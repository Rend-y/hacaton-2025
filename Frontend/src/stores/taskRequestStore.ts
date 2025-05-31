import { deleteMockTask, fetchMockTaskById, fetchMockTasks, updateMockTask } from '@/api/tasks/mockTaskApi'
import { defineStore } from 'pinia'

export interface TaskRequest {
  id: number
  preview: string
  title: string
  description: string
  status: RequestStatus
}

export enum RequestStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export const statusLabels: Record<RequestStatus, string> = {
  [RequestStatus.NEW]: 'Новая',
  [RequestStatus.IN_PROGRESS]: 'В работе',
  [RequestStatus.PENDING]: 'В ожидании',
  [RequestStatus.COMPLETED]: 'Выполнено'
}

interface TaskRequestState {
  requests: TaskRequest[]
  currentRequest: TaskRequest | null
  loading: boolean
  error: string | null,
}

export const useTaskRequestStore = defineStore('taskRequest', {
  state: (): TaskRequestState => ({
    requests: [],
    currentRequest: null,
    loading: false,
    error: null,
  }),

  getters: {
    getRequests: (state): TaskRequest[] => state.requests,
    getCurrentRequest: (state): TaskRequest | null => state.currentRequest,
    isLoading: (state): boolean => state.loading,
    getError: (state): string | null => state.error
  },

  actions: {
    async createRequest(requestData: Partial<TaskRequest>): Promise<TaskRequest> {
      this.loading = true
      this.error = null
      
      try {
        // Mock response
        const newRequest = {
          id: Date.now(),
          ...requestData
        } as TaskRequest
        
        this.requests.push(newRequest)
        this.currentRequest = newRequest
        return newRequest
      } catch (error: any) {
        this.error = 'Произошла ошибка при создании заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchRequests(): Promise<void> {
      this.loading = true
      this.error = null
      
      try {
        const requests = await fetchMockTasks(1, 10)
        const convertedRequests = requests.map(request => ({
          ...request,
          status: request.status as RequestStatus
        }))
        this.requests.push(...convertedRequests)
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявок';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchRequestById(id: number): Promise<void> {
      this.loading = true
      this.error = null
      
      try {
        const request = await fetchMockTaskById(id)
        if (!request) {
          throw new Error('Заявка не найдена')
        }
        this.currentRequest = request as TaskRequest
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateRequest(id: number, requestData: TaskRequest): Promise<TaskRequest> {
      this.loading = true
      this.error = null
      
      try {
        // Mock response
        const updatedRequest = await updateMockTask(id, requestData)
        if (!updatedRequest) {
          throw new Error('Заявка не найдена')
        }
      
        const index = this.requests.findIndex(request => request.id === id)
        if (index !== -1) {
          this.requests[index] = updatedRequest as TaskRequest
        }
        this.currentRequest = updatedRequest as TaskRequest
        return updatedRequest as TaskRequest
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