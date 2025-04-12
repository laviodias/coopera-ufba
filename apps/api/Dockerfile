# Base comum
FROM node:22 AS base
WORKDIR /app
ENV NODE_ENV=production

# Instala apenas as dependências
FROM base AS deps
COPY package*.json ./
RUN npm install --legacy-peer-deps --cache .npm --prefer-offline

# Build da aplicação
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Imagem final de produção
FROM node:22-slim AS final
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
