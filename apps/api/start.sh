#!/bin/sh
echo "Esperando o banco de dados estar acessível..."
sleep 5
npx prisma migrate deploy;

# Criando diretório para o arquivo de controle, se necessário
mkdir -p $(dirname ./.seeds-executed)

if [ ! -f ./.seeds-executed ]; then
  echo "Executando seeds do banco de dados..."
  node dist/prisma/seed.js
  touch ./.seeds-executed
else
  echo "Seeds já foram executados anteriormente."
fi

echo "Iniciando a aplicação..."
npm run start:prod
