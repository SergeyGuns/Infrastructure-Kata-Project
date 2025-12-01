# Multi-stage build for NestJS app
# Stage 1: Build
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI globally
RUN npm install --legacy-peer-deps && \
    npm ci --legacy-peer-deps && \
    npm install -g @nestjs/cli

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 4000

###############################################
# Stage 2: Development
FROM node:23-alpine AS development

WORKDIR /app

COPY package*.json ./
COPY package-lock.json* ./

# Install all dependencies (including dev dependencies) to have nest CLI available for development
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]

###############################################
# Stage 3: Runtime
FROM node:23-alpine AS runtime

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:prod"]