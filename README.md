# Infrastructure Kata

This project demonstrates a complete infrastructure setup for a web application with:
- Frontend: Next.js with SSR
- Backend: NestJS microservice
- Auth Service: Custom NestJS JWT auth server
- PostgreSQL database with migrations
- NGINX for static assets and load balancing
- Docker for containerization
- GitHub Actions for CI/CD
- K6 for load testing

## Project Structure
```
project/
├── frontend/          # React
├── backend/           # NestJS (микросервис)
├── auth-service/      # Самописный сервер авторизации (NestJS + JWT)
├── nginx/             # Конфигурации для статики и балансировки
├── postgres/          # SQL-миграции, дампы, резервное копирование
├── scripts/           # Скрипты для резервного копирования, деплоя
├── k6/                # Нагрузочные тесты
├── .github/workflows/ # GitHub Actions (линтинг, тесты, сборка, деплой)
└── .env.*             # Переменные окружения (dev, test, prod)
```

## Getting Started

1. Clone the repository
2. Set up environment variables
3. Run `docker-compose -f docker-compose.dev.yml up --build` for development

## Phases

1. **Development Environment** - Local development setup with hot-reload
2. **CI/CD Pipeline** - GitHub Actions for linting, testing, building and deployment
3. **Test Environment** - Separate test environment for integration testing
4. **Production Environment** - Production-ready setup with replicas and backups
5. **Load Testing & Monitoring** - K6 load tests and monitoring setup