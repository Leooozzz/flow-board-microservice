FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/gateway

RUN pnpm --filter gateway build

CMD ["pnpm", "--filter", "gateway", "start"]
