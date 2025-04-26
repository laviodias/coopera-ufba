#!/bin/bash

set -e

# Configurações
REMOTE_USER=ubuntu
REMOTE_HOST=100.24.7.198
REMOTE_PATH=/home/ubuntu
SSH_KEY_PATH=~/Downloads/lavio-coopera.pem

# Nomes
BACKEND_IMAGE_NAME=coopera-backend
FRONTEND_IMAGE_NAME=coopera-frontend
IMAGE_TAG=prod
BACKEND_TAR=backend-image.tar
FRONTEND_TAR=frontend-image.tar

echo "🚧 Buildando imagens localmente..."

docker build -t $BACKEND_IMAGE_NAME:$IMAGE_TAG -f apps/api/Dockerfile apps/api
docker build -t $FRONTEND_IMAGE_NAME:$IMAGE_TAG -f apps/web/Dockerfile apps/web

echo "📦 Salvando imagens em .tar..."
docker save -o $BACKEND_TAR $BACKEND_IMAGE_NAME:$IMAGE_TAG
docker save -o $FRONTEND_TAR $FRONTEND_IMAGE_NAME:$IMAGE_TAG

echo "🚀 Enviando imagens para EC2..."
scp -i "$SSH_KEY_PATH" $BACKEND_TAR $FRONTEND_TAR $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "📂 Carregando imagens e subindo containers na EC2..."
ssh -i "$SSH_KEY_PATH" $REMOTE_USER@$REMOTE_HOST <<'EOF'
  set -e
  cd /home/ubuntu
  docker load -i backend-image.tar
  docker load -i frontend-image.tar
  docker-compose -f docker-compose.prod.yml down
  docker-compose -f docker-compose.prod.yml up -d
  rm backend-image.tar frontend-image.tar
EOF

echo "✅ Deploy concluído!"
#rm $BACKEND_TAR $FRONTEND_TAR
