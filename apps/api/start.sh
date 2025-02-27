#!/bin/sh
set -e

echo "Esperando o banco de dados estar acessível..."
# Loop para testar a conexão com o banco de dados
until npx prisma db pull >/dev/null 2>&1; do
  echo "Banco de dados não está acessível, aguardando 3 segundos..."
  sleep 3
done

echo "Banco de dados disponível!"

echo "Aplicando migrações do Prisma..."
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
