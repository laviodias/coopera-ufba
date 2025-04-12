# Estágio base
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Estágio de dependências
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Estágio de build
FROM base AS builder
ARG API_URL
ENV NEXT_PUBLIC_API_URL=${API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Estágio final
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001
CMD ["npm", "run", "start"]
