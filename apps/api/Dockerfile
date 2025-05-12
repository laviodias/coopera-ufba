# Base para build
FROM node:22-alpine AS base
WORKDIR /app

# Instala apenas dependências
FROM base AS deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --progress=false && npm cache clean --force

# Gera o dist e prisma client
FROM base AS builder
RUN apk add --no-cache openssl 
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Só dependências de produção
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps --no-audit --progress=false && npm cache clean --force

# Final super leve
FROM node:22-alpine AS runner
WORKDIR /app

# Copiar node_modules e dist
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/start.sh ./start.sh

# 👇 Adicione isso se o Prisma Client estiver sendo gerado em node_modules
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "dist/src/main.js"]
