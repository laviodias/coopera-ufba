#!/bin/bash

set -e

# Configurações
REMOTE_USER=ubuntu
REMOTE_HOST=18.208.211.41
REMOTE_PATH=/home/ubuntu
SSH_KEY_PATH=~/Downloads/lavio-coopera.pem

# Nomes
FRONTEND_IMAGE_NAME=coopera-frontend
IMAGE_TAG=prod
FRONTEND_TAR=frontend-image.tar

echo "🚧 Buildando imagem do frontend localmente..."

# Build da imagem do frontend
docker build -t $FRONTEND_IMAGE_NAME:$IMAGE_TAG -f apps/web/Dockerfile apps/web

echo "📦 Salvando imagem do frontend em .tar..."
docker save -o $FRONTEND_TAR $FRONTEND_IMAGE_NAME:$IMAGE_TAG

echo "🚀 Enviando alterações para o repositório Git..."

# Enviando as alterações para o Git
git add .
git commit -m "Atualizando frontend"
git push origin main

echo "📂 Entrando na instância EC2 e atualizando o repositório..."

ssh -i "$SSH_KEY_PATH" $REMOTE_USER@$REMOTE_HOST <<'EOF'
  set -e

  # Entrando no diretório do repositório
  cd coopera-ufba

  # Atualizando o repositório com o git pull
  git pull origin main

  echo "🚀 Carregando a imagem do frontend..."
  docker load -i frontend-image.tar

  echo "🚀 Subindo containers..."
  docker-compose -f docker-compose.prod.yml down
  docker-compose -f docker-compose.prod.yml build
  docker-compose -f docker-compose.prod.yml up -d
EOF

echo "✅ Processo concluído com sucesso!"
