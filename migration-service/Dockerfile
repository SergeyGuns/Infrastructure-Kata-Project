FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Run migrations when container starts
CMD ["npm", "run", "migration:run"]