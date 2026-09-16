# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies cleanly
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Production runner stage (Serving with Node 'serve' - No Nginx)
FROM node:22-alpine AS runner

WORKDIR /app

# Install lightweight static file server 'serve'
RUN npm install -g serve

# Copy built static assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose server port
EXPOSE 3000

# Run 'serve' in Single Page Application (SPA) mode
CMD ["serve", "-s", "dist", "-l", "3000"]
