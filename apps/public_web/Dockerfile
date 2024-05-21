FROM node:18.17.0-alpine as base

ENV PNPM_HOME="/var/lib/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN pnpm add -g turbo

# BUILDER ---------------------------------------------------------------------

FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .
COPY apps/public_web ./apps/public_web

RUN turbo prune public_web --docker
RUN pnpm install

WORKDIR /app/apps/public_web

RUN pnpm turbo run build

# RUNNER ----------------------------------------------------------------------

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/apps/public_web/.next/standalone /app

CMD node ./apps/public_web/server.js