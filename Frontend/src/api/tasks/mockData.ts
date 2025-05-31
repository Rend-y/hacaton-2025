export type TaskStatus = 'new' | 'in_progress' | 'completed'

export interface TaskRequest {
  id: number
  preview: string
  title: string
  description: string
  status: TaskStatus
  deadline: string
  assignedTeamId?: string
  companyName: string
}

export const mockTasks: Array<Omit<TaskRequest, 'id' | 'status'>> = [
  {
    preview: 'Разработка мобильного приложения для доставки еды с функцией отслеживания заказа...',
    title: 'FoodDelivery App',
    description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'FoodTech Inc.'
  },
  {
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'EduTech Solutions'
  },
  {
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'LogiSmart'
  },
  {
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'DigitalGoods Ltd.'
  },
  {
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'HealthTech Systems'
  },
  {
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'RealEstate Pro'
  },
  {
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    deadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'TeamFlow Systems'
  },
  {
    preview: 'Создание платформы для краудфандинга...',
    title: 'Crowdfunding Platform',
    description: 'Разработка платформы для сбора средств на проекты с системой верификации и автоматическим распределением средств.',
    deadline: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'CrowdCapital'
  },
  {
    preview: 'Разработка системы управления контентом для медиа...',
    title: 'Media CMS',
    description: 'Создание системы управления контентом для медиа-компаний с поддержкой мультимедиа и автоматической публикацией.',
    deadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'MediaTech Solutions'
  },
  {
    preview: 'Создание платформы для онлайн-консультаций...',
    title: 'Online Consultation Platform',
    description: 'Разработка платформы для проведения онлайн-консультаций с поддержкой видеозвонков и системой оплаты.',
    deadline: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(),
    companyName: 'ConsultPro'
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