# Etapa de Build
FROM node:22-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_MAX_WORKERS=2

# Copiar apenas a pasta web e arquivos de config necessários
COPY apps/web/package*.json ./
COPY apps/web/tsconfig.json ./
COPY apps/web/next.config.mjs ./
COPY apps/web/postcss.config.mjs ./
COPY apps/web/tailwind.config.ts ./
COPY apps/web/ ./

# Debug: listar todos os arquivos e paths
RUN echo "=== Estrutura de arquivos ===" && \
    find . -type f | sort && \
    echo "=== Arquivos card* ===" && \
    find . -iname 'card*' && \
    echo "=== Arquivos input* ===" && \
    find . -iname 'input*' && \
    echo "=== Arquivos label* ===" && \
    find . -iname 'label*' && \
    echo "=== Arquivos button* ===" && \
    find . -iname 'button*' && \
    echo "=== Arquivos use-toast* ===" && \
    find . -iname 'use-toast*' && \
    echo "=== tsconfig.json ===" && \
    cat tsconfig.json

RUN npm install --legacy-peer-deps
RUN npm run build

# Etapa de Produção
FROM node:22-alpine AS runner

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3001

# Copiar package.json
COPY --from=builder /app/package*.json ./

# Instalar apenas dependências de produção
RUN npm install --only=production --legacy-peer-deps --no-audit --progress=false && npm cache clean --force

# Copiar o build gerado pela etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

# Expor a porta 3001
EXPOSE 3001

# Rodar o servidor Next.js
CMD ["npm", "start"]
