<template>
  <div>
    <div v-for="(item, index) in requests" :key="index" class="card" @click="toggle(index)">
      <div class="card-header">
        <div class="avatar">A</div>
        <div class="info">
          <strong>Заявка</strong>
          <div v-if="!item.expanded" class="desc">
            {{ item.preview }}
          </div>
        </div>
        <div class="status" :class="item.status">{{ statusLabels[item.status] }}</div>
        <div class="arrow">{{ item.expanded ? '▲' : '▼' }}</div>
      </div>

      <div v-if="item.expanded" class="card-body">
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

enum RequestStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  COMPLETED = 'completed'
}

const statusLabels = {
  [RequestStatus.NEW]: 'Новая',
  [RequestStatus.IN_PROGRESS]: 'В работе',
  [RequestStatus.PENDING]: 'В ожидании',
  [RequestStatus.COMPLETED]: 'Выполнено'
}

const requests = ref([
  {
    preview: 'Разработка мобильного приложения для доставки еды с функцией отслеживания заказа...',
    title: 'FoodDelivery App',
    description: 'Необходимо разработать кроссплатформенное мобильное приложение для доставки еды с функциями: геолокация, отслеживание заказа в реальном времени, система рейтингов и отзывов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Создание платформы для онлайн-обучения с поддержкой видеоконференций...',
    title: 'EduPlatform',
    description: 'Разработка веб-платформы для проведения онлайн-курсов с интеграцией видеоконференций, системой тестирования и отслеживания прогресса студентов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Разработка системы управления складом с интеграцией RFID...',
    title: 'Warehouse Management System',
    description: 'Создание комплексной системы управления складом с поддержкой RFID-меток, автоматическим учетом товаров и генерацией отчетов.',
    expanded: false,
    status: RequestStatus.COMPLETED
  },
  {
    preview: 'Создание маркетплейса для продажи цифровых товаров...',
    title: 'Digital Marketplace',
    description: 'Разработка платформы для продажи цифровых товаров с системой защиты авторских прав и автоматической доставкой.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы мониторинга состояния здоровья пациентов...',
    title: 'Health Monitoring System',
    description: 'Создание системы для удаленного мониторинга жизненных показателей пациентов с оповещением врачей в критических ситуациях.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для управления арендой недвижимости...',
    title: 'Property Management Platform',
    description: 'Разработка системы для управления арендой недвижимости с автоматизацией платежей, договоров и коммуникации между арендодателем и арендатором.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления задачами для команд...',
    title: 'Team Task Manager',
    description: 'Создание платформы для управления проектами с интеграцией календаря, системой уведомлений и аналитикой производительности.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для краудфандинга...',
    title: 'Crowdfunding Platform',
    description: 'Разработка платформы для сбора средств на проекты с системой верификации и автоматическим распределением средств.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления контентом для медиа...',
    title: 'Media CMS',
    description: 'Создание системы управления контентом для медиа-компаний с поддержкой мультимедиа и автоматической публикацией.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-консультаций...',
    title: 'Online Consultation Platform',
    description: 'Разработка платформы для проведения онлайн-консультаций с поддержкой видеозвонков и системой оплаты.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления транспортным парком...',
    title: 'Fleet Management System',
    description: 'Создание системы для управления транспортным парком с GPS-трекингом и оптимизацией маршрутов.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для управления мероприятиями...',
    title: 'Event Management Platform',
    description: 'Разработка платформы для организации мероприятий с системой продажи билетов и управления участниками.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления рестораном...',
    title: 'Restaurant Management System',
    description: 'Создание системы для управления рестораном с учетом заказов, инвентаря и персонала.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-торговли...',
    title: 'E-commerce Platform',
    description: 'Разработка платформы для онлайн-торговли с поддержкой различных способов оплаты и доставки.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления персоналом...',
    title: 'HR Management System',
    description: 'Создание системы для управления персоналом с учетом рабочего времени, отпусков и зарплат.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-банкинга...',
    title: 'Online Banking Platform',
    description: 'Разработка платформы для онлайн-банкинга с поддержкой различных финансовых операций.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления проектами...',
    title: 'Project Management System',
    description: 'Создание системы для управления проектами с учетом задач, сроков и ресурсов.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-образования...',
    title: 'Online Education Platform',
    description: 'Разработка платформы для онлайн-образования с поддержкой различных форматов обучения.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления клиентами...',
    title: 'CRM System',
    description: 'Создание системы для управления клиентами с учетом взаимодействий и продаж.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-конференций...',
    title: 'Online Conference Platform',
    description: 'Разработка платформы для проведения онлайн-конференций с поддержкой различных форматов.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления документами...',
    title: 'Document Management System',
    description: 'Создание системы для управления документами с поддержкой различных форматов и версий.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-игр...',
    title: 'Online Gaming Platform',
    description: 'Разработка платформы для онлайн-игр с поддержкой различных жанров и мультиплеера.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления контентом...',
    title: 'Content Management System',
    description: 'Создание системы для управления контентом с поддержкой различных форматов и версий.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-магазина...',
    title: 'Online Store Platform',
    description: 'Разработка платформы для онлайн-магазина с поддержкой различных способов оплаты и доставки.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления задачами...',
    title: 'Task Management System',
    description: 'Создание системы для управления задачами с учетом приоритетов и сроков.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-консультаций...',
    title: 'Online Consultation Platform',
    description: 'Разработка платформы для проведения онлайн-консультаций с поддержкой различных специалистов.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления проектами...',
    title: 'Project Management System',
    description: 'Создание системы для управления проектами с учетом задач, сроков и ресурсов.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-образования...',
    title: 'Online Education Platform',
    description: 'Разработка платформы для онлайн-образования с поддержкой различных форматов обучения.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  },
  {
    preview: 'Разработка системы управления клиентами...',
    title: 'CRM System',
    description: 'Создание системы для управления клиентами с учетом взаимодействий и продаж.',
    expanded: false,
    status: RequestStatus.NEW
  },
  {
    preview: 'Создание платформы для онлайн-конференций...',
    title: 'Online Conference Platform',
    description: 'Разработка платформы для проведения онлайн-конференций с поддержкой различных форматов.',
    expanded: false,
    status: RequestStatus.IN_PROGRESS
  }
])

function toggle(index: number) {
  requests.value[index].expanded = !requests.value[index].expanded
}
</script>

<style scoped>
.card {
  background: #f7effa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 0 0 1px #ddd;
}

.card-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.avatar {
  background-color: #d2b4f5;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-weight: bold;
  margin-right: 1rem;
}

.info {
  flex: 1;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 1rem;
  text-transform: capitalize;
}

.status.new {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status.in_progress {
  background-color: #fff3e0;
  color: #f57c00;
}

.status.pending {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.status.completed {
  background-color: #e8f5e9;
  color: #388e3c;
}

.arrow {
  font-size: 1.2rem;
  margin-left: auto;
}

.card-body {
  margin-top: 1rem;
}
</style> 