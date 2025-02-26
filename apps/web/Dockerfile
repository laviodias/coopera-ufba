FROM node:22-alpine AS base

# Estágio de dependências
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Estágio de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Adicionar variável para o endereço da API
ARG API_URL
ENV NEXT_PUBLIC_API_URL=${API_URL}
RUN npm run build

# Estágio de produção
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001
CMD ["npm", "run", "start"]