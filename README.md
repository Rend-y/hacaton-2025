# Hacaton 2025 Project

## Описание проекта
Проект состоит из трех основных компонентов:
- Frontend (React приложение)
- Backend (NestJS API)
- База данных (SQLite)

## Основные ссылки
- [Frontend приложение](http://localhost:3000)
- [Backend API](http://localhost:4000)
- [Swagger API документация](http://localhost:4000/api)

## Тестовые учетные данные
Для тестирования приложения можно использовать следующие учетные данные:
```
Email: admin@example.com
Пароль: admin123
```

## Требования
- Docker
- Docker Compose

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd hacaton-2025
```

### 2. Запуск с помощью Docker Compose
```bash
docker-compose up --build
```

После запуска приложение будет доступно по следующим адресам:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Структура проекта
```
.
├── Frontend/           # React приложение
├── backend-nest/       # NestJS API
├── database.sqlite     # База данных
├── docker-compose.yml  # Docker Compose конфигурация
└── README.md          # Документация
```

## Разработка

### Frontend
- Порт: 3000
- Технологии: React
- Переменные окружения:
  - REACT_APP_API_URL: URL для подключения к backend API

### Backend
- Порт: 4000
- Технологии: NestJS
- Переменные окружения:
  - DATABASE_URL: URL для подключения к базе данных

### База данных
- SQLite
- Файл базы данных монтируется как volume для сохранения данных

## Команды Docker

### Запуск
```bash
docker-compose up
```

### Запуск в фоновом режиме
```bash
docker-compose up -d
```

### Остановка
```bash
docker-compose down
```

### Просмотр логов
```bash
docker-compose logs -f
```

## Лицензия
MIT