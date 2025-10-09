# Multi-stage build for NestJS app
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI globally
RUN npm install && \
    npm ci && \
    npm install -g @nestjs/cli && \
    ln -s /usr/local/bin/nest /usr/bin/nest

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 
EXPOSE 4000

###############################################
# Stage 2: Runtime
FROM node:22-alpine AS runtime

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:prod"]