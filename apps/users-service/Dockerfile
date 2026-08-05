FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/users-service

RUN pnpm --filter users-services build

CMD ["pnpm", "--filter", "users-services", "start"]