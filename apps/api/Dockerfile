FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN apk add --no-cache --update \
    openssl1.1 \
    libcrypto1.1
RUN npm ci --legacy-peer-deps --no-audit --progress=false \
  && npm cache clean --force

FROM base AS builder
RUN apk add --no-cache --update \
    openssl1.1 \
    libcrypto1.1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps --no-audit --progress=false \
  && npm cache clean --force

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

COPY .env ./

ENV NODE_ENV=production
EXPOSE 8080

CMD ["sh", "-c", "npx prisma generate && node dist/src/main.js"]