# syntax=docker/dockerfile:1

# ============================================
# Base configuration
# ============================================

ARG NODE_VERSION=22.14.0-alpine3.21


# ============================================
# Stage 1: Dependencies
# ============================================

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* ./

RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    if [ -f package-lock.json ]; then \
        npm ci --no-audit --no-fund; \
    elif [ -f yarn.lock ]; then \
        corepack enable yarn && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && pnpm install --frozen-lockfile; \
    else \
        echo "No lockfile found." && exit 1; \
    fi


# ============================================
# Stage 2: Builder
# ============================================

FROM node:${NODE_VERSION} AS builder

ARG TARGET_ENV=production

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Optional:
# If you maintain files such as:
# .env.development
# .env.staging
# .env.production
#
# COPY .env.${TARGET_ENV} .env.production

RUN --mount=type=cache,target=/app/.next/cache \
    if [ -f package-lock.json ]; then \
        npm run build; \
    elif [ -f yarn.lock ]; then \
        corepack enable yarn && yarn build; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && pnpm build; \
    else \
        echo "No lockfile found." && exit 1; \
    fi


# ============================================
# Stage 3: Runner
# ============================================

FROM node:${NODE_VERSION} AS runner

ARG TARGET_ENV=production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN mkdir -p .next && \
    chown node:node .next

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

LABEL app.environment="${TARGET_ENV}"

CMD ["node", "server.js"]