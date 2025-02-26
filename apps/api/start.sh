#!/bin/sh
echo "Esperando o banco de dados estar acessível..."
until npx prisma migrate deploy; do
  echo "Aguardando banco de dados..."
  sleep 3
done

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
