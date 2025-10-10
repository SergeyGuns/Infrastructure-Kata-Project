# Migration Service

This service handles database migrations for the infrastructure kata project using TypeORM.

## Overview

The migration service uses TypeORM to manage database schema changes. Rather than rewriting the SQL migrations in TypeScript, this service reads the original SQL migration files and applies them through TypeORM's migration system.

## Architecture

- **TypeORM-based**: Uses TypeORM's migration system for consistent migration handling
- **SQL file-based**: Reuses existing SQL migration files to maintain compatibility
- **Docker container**: Runs as a separate container in the Docker ecosystem

## Migration Files

The service uses the original SQL migration files located in:
- `src/migrations/common-sql/001_initial_schema__up.sql` - Initial schema creation
- `src/migrations/common-sql/001_initial_schema_down.sql` - Initial schema removal
- `src/migrations/common-sql/002_user_add_name__up.sql` - Add name column to users table
- `src/migrations/common-sql/002_user_add_name_down.sql` - Remove name column from users table

## Environment Variables

The migration service uses the following environment variables:

- `DB_HOST`: Database host (default: postgres)
- `DB_PORT`: Database port (default: 5432)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_NAME`: Database name (default: kata_db)

## Usage

### Running Migrations

The migration service runs migrations automatically when the container starts by executing:

```bash
npm run migration:run
```

### Manual Migration Commands

To run migrations manually in development:

```bash
# Run pending migrations
npm run migration:run

# Generate a new migration
npm run migration:generate -- src/migrations/NewMigrationName

# Revert the last migration
npm run migration:revert
```

## Integration with Docker Compose

The migration service is integrated into all docker-compose files:
- `docker-compose.dev.yml` - Development environment
- `docker-compose.prod.yml` - Production environment
- `docker-compose.test.yml` - Test environment
- `docker-compose.backend-test.yml` - Backend-specific tests

In all environments, other services depend on the migration service to ensure the database schema is up-to-date before starting.

## Docker Image

The service builds a Docker image using multi-stage build to:
1. Install dependencies
2. Compile TypeScript to JavaScript
3. Run migrations when the container starts