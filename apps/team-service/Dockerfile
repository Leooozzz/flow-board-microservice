FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/team-service

RUN pnpm --filter team-services build

CMD ["pnpm", "--filter", "team-services", "start"]
