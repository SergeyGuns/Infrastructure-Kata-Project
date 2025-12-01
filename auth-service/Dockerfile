# Multi-stage build for NestJS app
# Stage 1: Build
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI globally
RUN npm install --legacy-peer-deps && \
    npm ci --legacy-peer-deps && \
    npm install -g @nestjs/cli && \
    ln -s /usr/local/bin/nest /usr/bin/nest

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 4000

###############################################
FROM node:23-alpine AS runtime

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 4001

CMD ["npm", "run", "start:prod"]