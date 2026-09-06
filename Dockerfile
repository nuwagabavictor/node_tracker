# =========================
# 1. Build stage
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first
# This allows Docker to cache npm ci
COPY package.json package-lock.json ./

RUN npm ci

# Copy application source
COPY . .

# Build TypeScript
RUN npm run build


# =========================
# 2. Production stage
# =========================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy dependency files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Application port
EXPOSE 4000

# Start application
CMD ["node", "dist/server.js"]