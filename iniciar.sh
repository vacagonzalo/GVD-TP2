#!/bin/bash

chmod +x destruir.sh

docker-compose up -d

printf "Espero 5 segundos para que se realicen las conexiones internas..."
sleep 5

docker-compose exec mongo sh -c "mongo < /scripts/finanzas.js"

printf "\n"
cat ./scripts/consulta01.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta01.js"

printf "\n"
cat ./scripts/consulta02.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta02.js"

printf "\n"
cat ./scripts/consulta03.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta03.js"

printf "\n"
cat ./scripts/consulta04.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta04.js"

printf "\n"
cat ./scripts/consulta05.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta05.js"

printf "\n"
cat ./scripts/consulta06.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta06.js"

printf "\n"
cat ./scripts/consulta07.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta07.js"

printf "\n"
cat ./scripts/consulta08.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta08.js"

printf "\n"
cat ./scripts/consulta09.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta09.js"

printf "\n"
cat ./scripts/consulta10.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta10.js"

printf "\n"
cat ./scripts/consulta11.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta11.js"

printf "\n"
cat ./scripts/consulta12.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta12.js"

printf "\n"
cat ./scripts/consulta13.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta13.js"

printf "\n"
cat ./scripts/consulta14.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta14.js"

printf "\n"
cat ./scripts/consulta15.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta15.js"

printf "\n"
cat ./scripts/consulta16.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta16.js"

printf "\n"
cat ./scripts/consulta17.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta17.js"

printf "\n"
cat ./scripts/consulta18.js
docker-compose exec mongo sh -c "mongo < /scripts/consulta18.js"