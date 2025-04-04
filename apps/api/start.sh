#!/bin/sh
set -e

echo "Aplicando migrações do Prisma..."
if ! npx prisma migrate deploy; then
  echo "Erro ao aplicar migrações. Abortando."
  exit 1
fi

# Criar diretório para o arquivo de controle se necessário
mkdir -p $(dirname ./.seeds-executed-v3)

if [ ! -f ./.seeds-executed-v3 ]; then
  echo "Executando seeds do banco de dados..."
  if ! node dist/prisma/seed.js; then
    echo "Erro ao executar seeds. Abortando."
    exit 1
  fi
  touch ./.seeds-executed-v3
else
  echo "Seeds já foram executados anteriormente."
fi

echo "Iniciando a aplicação..."
exec npm run start:prod
