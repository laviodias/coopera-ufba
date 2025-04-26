#!/bin/sh
set -e

# Função para verificar se o banco de dados está acessível
wait_for_db() {
  until nc -z -v -w30 db 5432; do
    echo "Aguardando banco de dados..."
    sleep 1
  done
  echo "Banco de dados disponível!"
}

echo "Aplicando migrações do Prisma..."
wait_for_db

if ! npx prisma migrate deploy; then
  echo "Erro ao aplicar migrações. Abortando."
  exit 1
fi

# Criar diretório para o arquivo de controle se necessário
mkdir -p $(dirname ./.seeds-executed)

if [ ! -f ./.seeds-executed ]; then
  echo "Executando seeds do banco de dados..."
  if ! node dist/prisma/seed.js; then
    echo "Erro ao executar seeds. Abortando."
    exit 1
  fi
  touch ./.seeds-executed
else
  echo "Seeds já foram executados anteriormente."
fi

echo "Iniciando a aplicação..."
exec npm run start:prod
