# Etapa de Build
FROM node:22-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_MAX_WORKERS=2

# Copiar arquivos de dependências e instalar
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copiar o código-fonte e rodar o build
COPY . .
RUN npm run build

# Etapa de Produção
FROM node:22-alpine AS runner

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente
ENV NODE_ENV=production

# Instalar apenas dependências de produção
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps --no-audit --progress=false && npm cache clean --force

# Copiar o build gerado pela etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expor a porta padrão do Next.js
EXPOSE 3000

# Rodar o servidor Next.js
CMD ["npm", "start"]
