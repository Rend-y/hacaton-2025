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
    requests: [
  {
    id: 1,
    preview: 'Разработка мобильного приложения для доставки еды с функцией отслеживания заказа...',
    title: 'FoodDelivery App',
    description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.',
    status: RequestStatus.COMPLETED
  },
    {
    id: 2,
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    status: RequestStatus.COMPLETED
  },
  {
    id: 3,
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    status: RequestStatus.COMPLETED
  },
  {
    id: 4,
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 5,
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    status: RequestStatus.NEW
  },
  {
    id: 6,
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 7,
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    status: RequestStatus.NEW
  },
    {
    id: 8,
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    status: RequestStatus.COMPLETED
  },
  {
    id: 9,
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    status: RequestStatus.COMPLETED
  },
  {
    id: 10,
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 11,
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    status: RequestStatus.NEW
  },
      {
    id: 12,
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 13,
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    status: RequestStatus.NEW
  },
    {
    id: 14,
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    status: RequestStatus.COMPLETED
  },
  {
    id: 15,
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    status: RequestStatus.COMPLETED
  },
  {
    id: 16,
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 17,
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    status: RequestStatus.NEW
  },
  {
    id: 18,
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 19,
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    status: RequestStatus.NEW
  },
  {
    id: 20,
    preview: 'Создание платформы для краудфандинга...',
    title: 'Crowdfunding Platform',
    description: 'Разработка платформы для сбора средств на проекты с системой верификации и автоматическим распределением средств.',
    status: RequestStatus.IN_PROGRESS
  },
  {
    id: 21,
    preview: 'Разработка системы управления контентом для медиа...',
    title: 'Media CMS',
    description: 'Создание системы управления контентом для медиа-компаний с поддержкой мультимедиа и автоматической публикацией.',
    status: RequestStatus.NEW
  },
  {
    id: 22,
    preview: 'Создание платформы для онлайн-консультаций...',
    title: 'Online Consultation Platform',
    description: 'Разработка платформы для проведения онлайн-консультаций с поддержкой видеозвонков и системой оплаты.',
    status: RequestStatus.IN_PROGRESS
  }
],
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

    async fetchRequests(): Promise<TaskRequest[]> {
      this.loading = true
      this.error = null
      
      try {
        // Generate random tasks
        const taskTemplates: Array<Partial<Omit<TaskRequest, 'id' | 'status'>>> = [
          {
            title: 'FoodDelivery App',
            preview: 'Разработка мобильного приложения для доставки еды с функцией отслеживания заказа...',
            description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.'
          },
          {
            title: 'EduPlatform',
            preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
            description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.'
          },
          {
            title: 'Warehouse Management System',
            preview: 'Разработка системы управления складом с интеграцией RFID...',
            description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.'
          },
          {
            title: 'Digital Marketplace',
            preview: 'Создание маркетплейса для продажи цифровых товаров...',
            description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.'
          },
          {
            title: 'Health Monitoring System',
            preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
            description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.'
          }
        ];

        const statuses = Object.values(RequestStatus);
        const mockRequests: TaskRequest[] = Array.from({ length: 20 }, (_, index) => {
          const template: Partial<Omit<TaskRequest, 'id' | 'status'>> = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
          const status:RequestStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          return {
            id: this.requests.length + 1,
            ...template,
            status
          } as TaskRequest;
        });

        return mockRequests;
      } catch (error: any) {
        this.error = 'Произошла ошибка при загрузке заявок';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchRequestById(id: number): Promise<TaskRequest> {
      this.loading = true
      this.error = null
      
      try {
        // Mock data
        const mockRequest: TaskRequest = {
          id,
          preview: 'Разработка мобильного приложения для доставки еды с функцией отслеживания заказа...',
          title: 'FoodDelivery App',
          description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.',
          status: RequestStatus.COMPLETED
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