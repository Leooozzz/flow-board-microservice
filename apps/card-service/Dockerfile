FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/card-service

RUN pnpm --filter card-services build

CMD ["pnpm", "--filter", "card-services", "start"]
