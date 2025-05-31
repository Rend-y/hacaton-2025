export type TaskStatus = 'new' | 'in_progress' | 'completed'

export interface TaskRequest {
  id: number
  title: string
  description: string
  status: TaskStatus
  deadline: string
}

export const mockTasks: Array<Omit<TaskRequest, 'id' | 'status'>> = [
  {
    title: 'FoodDelivery App',
    description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    deadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Crowdfunding Platform',
    description: 'Разработка платформы для сбора средств на проекты с системой верификации и автоматическим распределением средств.',
    deadline: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Media CMS',
    description: 'Создание системы управления контентом для медиа-компаний с поддержкой мультимедиа и автоматической публикацией.',
    deadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: 'Online Consultation Platform',
    description: 'Разработка платформы для проведения онлайн-консультаций с поддержкой видеозвонков и системой оплаты.',
    deadline: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(),
  }
]

// Генерация большого количества задач для теста виртуального скролла
export const bigMockTasks = () =>  Array.from({ length: 100 }, (_, i) => {
  const base = mockTasks[i % mockTasks.length]
  const status = ['new', 'in_progress', 'completed'][Math.floor(Math.random() * 3)] as TaskStatus
  const randomDays = Math.floor(Math.random() * 30) + 1 // Random deadline between 1-30 days
  return {
    ...base,
    title: base.title + ' #' + (i + 1),
    id: i + Math.random() * 1000000,
    status,
    deadline: new Date(Date.now() + randomDays * 24 * 60 * 60 * 1000).toISOString()
  }
})