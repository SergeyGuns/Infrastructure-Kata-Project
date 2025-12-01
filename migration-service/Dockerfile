FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies to have typeorm CLI available
RUN npm ci

COPY . .

# Build the TypeScript files before running migrations
RUN npm run build

CMD ["npm", "run", "migration:run"]