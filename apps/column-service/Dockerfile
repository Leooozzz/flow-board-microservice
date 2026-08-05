FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/column-service

RUN pnpm --filter column-services build

CMD ["pnpm", "--filter", "column-services", "start"]