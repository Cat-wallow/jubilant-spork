# Stage 1: Install dependencies and build
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy manifests and lockfile. This leverages Docker cache.
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY frontend/package.json ./

COPY packages/ ./packages/
COPY frontend/package.json ./frontend/package.json

COPY frontend/ ./frontend/

# Install all workspace dependencies
RUN pnpm install

# Build the frontend application
RUN pnpm --filter horizon-tailwind-react-nextjs build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app/frontend ./frontend
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/frontend/node_modules ./frontend/node_modules

EXPOSE 3000

# The command to start the Next.js production server
CMD ["pnpm", "--filter", "horizon-tailwind-react-nextjs", "start"]
