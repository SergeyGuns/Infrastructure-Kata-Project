ВСЕГДА ОТВЕЧАЙ НА РУССКОМ!!!
# Infrastructure Kata Project - QWEN.md
NOT USE CODE COMMENTS BLOCK
## Project Overview

This is an infrastructure kata project that demonstrates a complete infrastructure setup for a modern web application. The architecture follows a microservices pattern with three main services connected through Docker and NGINX for load balancing and static asset serving.

### Architecture Components
- **Frontend**: Next.js application with server-side rendering (SSR)
- **Backend**: NestJS microservice for business logic
- **Auth Service**: Custom NestJS JWT authentication server
- **Database**: PostgreSQL with automated migrations
- **Load Balancer**: NGINX for static assets and API routing
- **Containerization**: Docker with multi-stage builds
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Monitoring**: K6 for load testing

## Project Structure
```
project/
├── frontend/          # React
├── backend-service/   # NestJS (microservice)
├── auth-service/      # Custom NestJS JWT auth server
├── nginx/             # Configurations for static assets and load balancing
├── postgres/          # SQL migrations, dumps, backup scripts
├── docker/            # Dockerfiles for each service
├── scripts/           # Backup and deployment scripts
├── k6/                # Load testing scripts
├── .github/workflows/ # GitHub Actions (linting, tests, build, deploy)
└── .env.*             # Environment variables (dev, test, prod)
```

## Building and Running

### Development Environment
```bash
# Start all services in development mode with hot-reload
docker-compose -f docker-compose.dev.yml up --build

# Services will be available at:
# - Frontend: http://localhost:3000
# - API via NGINX: http://localhost:8080
# - Backend: http://localhost:4000 (direct)
# - Auth service: http://localhost:5000 (direct)
```

### Production Environment
```bash
# Deploy production setup with replicas
docker-compose -f docker-compose.prod.yml up -d
```

### Testing
```bash
# Run integration tests
docker-compose -f docker-compose.test.yml up --build

# Run load tests with k6
k6 run k6/basic-test.js
```

## Development Conventions

### Docker Multi-stage Builds
- Each service uses multi-stage builds to optimize image size
- Builder stage handles dependencies and compilation
- Runtime stage only includes production dependencies

### Environment Configuration
- Development: `.env.dev`
- Production: `.env.prod`
- Environment-specific configurations are handled through docker-compose files

### Database Migrations
- Migrations are stored in `postgres/migrations/`
- Applied automatically when PostgreSQL container starts
- Follows numeric prefix convention (e.g., `001_initial_schema.sql`)

### CI/CD Pipeline
- Automated testing on pull requests
- Builds and pushes Docker images to GitHub Container Registry
- Deploys to production only on pushes to main/master branch
- Includes health checks and rollback capabilities

### Service Communication
- Services communicate over Docker network using service names as hostnames
- NGINX routes requests appropriately (API requests to backend, auth requests to auth service)
- All services can access PostgreSQL using the hostname "postgres"

### Authentication Service Security Features
- Password hashing with salt using Node.js crypto module
- Configurable password salt through environment variable (`PASSWORD_SALT`)
- Default fallback salt value if environment variable is not set
- Random salt generation per password for enhanced security

## Key Files

### Docker Compose Files
- `docker-compose.dev.yml`: Development setup with hot-reload
- `docker-compose.prod.yml`: Production setup with replicas
- `docker-compose.test.yml`: Test environment
- `docker-compose.backend-test.yml`: Backend-specific tests

### NGINX Configurations
- `nginx/dev.conf`: Development configuration with proxy pass
- `nginx/prod.conf`: Production configuration with compression and logging

### Service Files
- Each service (frontend, backend, auth-service) has:
  - Dockerfile with multi-stage build
  - package.json with dependencies and scripts
  - Basic application structure with health endpoints

### Database
- `postgres/migrations/001_initial_schema.sql`: Initial database schema
- Tables for users and sessions with proper indexing

### CI/CD
- `.github/workflows/ci-cd.yml`: Complete CI/CD pipeline

### Scripts
- `scripts/backup_db.sh`: PostgreSQL backup script with rotation
- Automated backup cleanup after 7 days

## Usage Notes

1. **Security**: JWT secrets and database passwords should be properly secured in production
2. **Scaling**: Backend service is configured with 2 replicas in production
3. **Monitoring**: The setup includes basic health checks and logging
4. **Backups**: PostgreSQL backup script is included with automatic cleanup
5. **Load Testing**: Basic k6 tests are provided as a starting point

## Extending the Project

This infrastructure kata provides a solid foundation that can be extended with:
- Additional microservices
- More sophisticated load balancing rules
- Advanced monitoring with Prometheus/Grafana
- Database sharding solutions
- Advanced security configurations
- More comprehensive testing strategies