#!/bin/sh
echo "Executando migrações do Prisma..."
npx prisma db push

# Criando diretório para o arquivo de controle, se necessário
mkdir -p $(dirname $HOME/.seeds-executed)

if [ ! -f $HOME/.seeds-executed ]; then
  echo "Executando seeds do banco de dados..."
  npm run seed-db
  touch $HOME/.seeds-executed
else
  echo "Seeds já foram executados anteriormente."
fi

echo "Iniciando a aplicação..."
npm run start:prod