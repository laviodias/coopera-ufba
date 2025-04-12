FROM node:22-alpine AS base

# Instala dependências básicas
RUN apk add --no-cache openssl

# Instala dependências do projeto
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Build da aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Imagem final de produção
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/start.sh ./start.sh
RUN chmod +x start.sh
EXPOSE 8080
CMD ["./start.sh"]
