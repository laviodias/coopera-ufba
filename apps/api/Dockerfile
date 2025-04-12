# Estágio base
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Estágio de dependências
FROM base AS deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Estágio de build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Estágio final
FROM node:22-alpine AS final
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
