# Base comum
FROM node:22 AS base
WORKDIR /app
ENV NODE_ENV=production

# Estágio de dependências
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --cache .npm --prefer-offline

# Estágio de build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG API_URL
ENV NEXT_PUBLIC_API_URL=${API_URL}

RUN npm run build

# Estágio de produção
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001
CMD ["npm", "run", "start"]
