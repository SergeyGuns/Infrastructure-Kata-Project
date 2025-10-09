# Auth Service

This is a NestJS-based authentication service that provides JWT-based user authentication.

## Features

- User registration
- User login
- JWT token generation and validation
- Protected routes
- User profile access

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user
- `GET /profile` - Get profile of authenticated user (requires JWT token)
- `GET /health` - Health check endpoint

## Environment Variables

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USER` - Database username (default: dev)
- `DB_PASSWORD` - Database password (default: dev)
- `DB_NAME` - Database name (default: dev_db)
- `JWT_SECRET` - Secret for JWT signing

## Running the Service

```bash
# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Run in production mode
npm run start:prod

# Run tests
npm test
npm run test:e2e
```

## Architecture

The service uses:
- NestJS framework
- TypeORM for database operations
- PostgreSQL database (or SQLite for tests)
- JWT for authentication
- Bcrypt for password hashing
- Class-validator and class-transformer for validation and transformation

## Docker

`docker-compose -f docker-compose.dev.yml build`

The service is containerized and can be run with Docker Compose as part of the infrastructure kata project.