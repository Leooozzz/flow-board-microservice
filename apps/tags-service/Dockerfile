FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/tags-service

RUN pnpm --filter tags-services build

CMD ["pnpm", "--filter", "tags-services", "start"]
