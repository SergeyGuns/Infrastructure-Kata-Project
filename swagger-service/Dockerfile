# Multi-stage build for optimized image size

# Builder stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install && npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runtime

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3002

# Set environment variables
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/main.js"]