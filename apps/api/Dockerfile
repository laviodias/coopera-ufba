# Etapa base com Node 20 Alpine
FROM node:20-alpine AS base
WORKDIR /app

# Etapa de dependências (todas)
FROM base AS deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --progress=false \
  && npm cache clean --force

# Etapa de build
FROM base AS builder
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Etapa de dependências apenas de produção
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps --no-audit --progress=false \
  && npm cache clean --force

# Etapa final (imagem leve)
FROM node:20-alpine AS runner
WORKDIR /app

# Copia apenas o necessário para rodar a aplicação
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/start.sh ./start.sh

# 👇 Se o Prisma Client estiver gerado dentro do node_modules (com npx prisma generate)
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Configuração do ambiente
ENV NODE_ENV=production
EXPOSE 8080

# Comando para iniciar o app
CMD ["node", "dist/src/main.js"]
