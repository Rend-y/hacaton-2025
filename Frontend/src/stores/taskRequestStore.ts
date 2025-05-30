import { defineStore } from 'pinia'

interface TaskRequest {
  id: number
  [key: string]: any // Add other properties as needed
}

interface TaskRequestState {
  requests: TaskRequest[]
  currentRequest: TaskRequest | null
  loading: boolean
  error: string | null
}

export const useTaskRequestStore = defineStore('taskRequest', {
  state: (): TaskRequestState => ({
    requests: [],
    currentRequest: null,
    loading: false,
    error: null
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

    async fetchRequests(): Promise<TaskRequest[]> {
      this.loading = true
      this.error = null
      
      try {
        // Mock data
        const mockRequests: TaskRequest[] = [
          { id: 1, title: 'Заявка 1' },
          { id: 2, title: 'Заявка 2' }
        ]
        this.requests = mockRequests
        return mockRequests
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявок'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchRequestById(id: number): Promise<TaskRequest> {
      this.loading = true
      this.error = null
      
      try {
        // Mock data
        const mockRequest: TaskRequest = {
          id,
          title: `Заявка ${id}`
        }
        this.currentRequest = mockRequest
        return mockRequest
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявки'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateRequest(id: number, requestData: Partial<TaskRequest>): Promise<TaskRequest> {
      this.loading = true
      this.error = null
      
      try {
        // Mock response
        const updatedRequest = {
          id,
          ...requestData
        } as TaskRequest
        
        const index = this.requests.findIndex(request => request.id === id)
        if (index !== -1) {
          this.requests[index] = updatedRequest
        }
        this.currentRequest = updatedRequest
        return updatedRequest
      } catch (error: any) {
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
        // Mock deletion
        this.requests = this.requests.filter(request => request.id !== id)
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