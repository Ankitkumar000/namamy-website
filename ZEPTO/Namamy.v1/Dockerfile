# Multi-stage Dockerfile for Namamy E-commerce Website
# Optimized for Hostinger + Coolify deployment

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create namamy user for security
RUN addgroup --system --gid 1001 namamy
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:namamy .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:namamy /app/.next/standalone ./
COPY --from=builder --chown=nextjs:namamy /app/.next/static ./.next/static

# Copy Prisma files for production
COPY --from=builder --chown=nextjs:namamy /app/prisma ./prisma
COPY --from=builder --chown=nextjs:namamy /app/node_modules/.prisma ./node_modules/.prisma

# Create directories for uploads and logs
RUN mkdir -p /app/public/images/products/uploads
RUN mkdir -p /var/log/namamy
RUN chown -R nextjs:namamy /app/public/images/products/uploads
RUN chown -R nextjs:namamy /var/log/namamy

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check for Coolify monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]