FROM node:22-alpine AS base

# Estágio de dependências
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Estágio de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Estágio de produção
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copiar apenas arquivos necessários
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/nest-cli.json ./nest-cli.json
# Se você tiver outros arquivos de configuração, adicione-os aqui

# Script para inicialização
RUN echo '#!/bin/sh\necho "Executando migrações do Prisma..."\nnpx prisma db push\necho "Iniciando a aplicação..."\nnode dist/main.js' > start.sh
RUN chmod +x start.sh

EXPOSE 8080
CMD ["./start.sh"]