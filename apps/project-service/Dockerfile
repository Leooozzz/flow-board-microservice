FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/project-service

RUN pnpm --filter project-services build

CMD ["pnpm", "--filter", "project-services", "start"]
