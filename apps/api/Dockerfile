# Base para build
FROM node:22-alpine AS base
WORKDIR /app

# Instala apenas dependências
FROM base AS deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --progress=false && npm cache clean --force

# Gera o dist e prisma client
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Só dependências de produção
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps --no-audit --progress=false && npm cache clean --force

# Final super leve
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app

# Copiar apenas os artefatos necessários
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/start.sh ./start.sh

ENV NODE_ENV=production
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
