#!/bin/bash

echo "🚀 Iniciando deploy com Docker..."

# Parar containers existentes
echo "📦 Parando containers existentes..."
docker-compose -f docker-compose.prod2.yml down

# Remover imagens antigas (opcional)
echo "🧹 Removendo imagens antigas..."
docker-compose -f docker-compose.prod2.yml down --rmi all

# Fazer build das imagens
echo "🔨 Fazendo build das imagens..."
docker-compose -f docker-compose.prod2.yml build --no-cache

# Subir os serviços
echo "⬆️ Subindo serviços..."
docker-compose -f docker-compose.prod2.yml up -d

# Verificar status
echo "📊 Verificando status dos containers..."
docker-compose -f docker-compose.prod2.yml ps

echo "✅ Deploy concluído!"
echo "🌐 API disponível em: http://localhost:8080"
echo "🎨 Frontend disponível em: http://localhost:3001"
echo "🗄️ Redis disponível em: localhost:6379"
echo "📊 PostgreSQL disponível em: localhost:5432" 