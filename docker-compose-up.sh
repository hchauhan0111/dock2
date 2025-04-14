#!/bin/bash
read -p "Enter the image tag version (e.g., v1, v1-build-18): " TAG

COMPOSE_FILE="docker-compose.yaml"
cp $COMPOSE_FILE "${COMPOSE_FILE}.bak"

sed -i "s|himanshuchauhan1/backend_service:.*|himanshuchauhan1/backend_service:$TAG|g" $COMPOSE_FILE
sed -i "s|himanshuchauhan1/my-react-app:.*|himanshuchauhan1/my-react-app:$TAG|g" $COMPOSE_FILE

docker-compose up -d
