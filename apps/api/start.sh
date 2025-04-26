#!/bin/sh
set -e

# Função para verificar se o banco de dados está acessível
wait_for_db() {
  echo "Aguardando banco de dados..."
  until nc -z -v -w30 db 5432; do
    echo "Aguardando banco de dados..."
    sleep 1
  done
}

echo "Aplicando migrações do Prisma..."
wait_for_db

if ! npx prisma migrate deploy; then
  echo "Erro ao aplicar migrações. Abortando."
  exit 1
fi

# Restante do seu script...
