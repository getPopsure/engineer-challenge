.PHONY: run-backend start-backend stop-backend run-frontend start-frontend stop-frontend start-all stop-all run-all-tests

project_home:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
backend_home:=${project_home}/backend
frontend_home:=${project_home}/frontend
yml_file:=${project_home}/docker-compose.yaml

prepare-env:
	cp ${backend_home}/.env.example ${backend_home}/.env

docker-build-backend:
	cd ${backend_home} && docker-compose build

docker-build-frontend:
	cd ${frontend_home} && docker-compose build

docker-compose-up-backend:
	cd ${backend_home} && docker-compose up -d backend

docker-compose-up-frontend:
	cd ${backend_home} && docker-compose up -d frontend

docker-compose-stop-backend:
	cd ${backend_home} && docker-compose stop backend

docker-compose-stop-frontend:
	cd ${backend_home} && docker-compose stop frontend

yarn-build-backend:
	cd ${backend_home} && yarn install && yarn prisma generate

yarn-build-frontend:
	cd ${frontend_home} && yarn install && yarn build

yarn-run-backend:
	cd ${backend_home} && yarn start

run-unit-tests-backend:
	cd ${backend_home} && yarn unit-tests

run-integration-tests-backend:
	cd ${backend_home} && yarn integration-tests

test-backend: run-unit-tests-backend run-integration-tests-backend

yarn-run-frontend:
	cd ${frontend_home} && yarn start

docker-compose-up:
	cd ${backend_home} && docker-compose up -d

docker-compose-down:
	cd ${backend_home} && docker-compose down

migrate:
	cd ${backend_home} && docker compose exec backend yarn prisma migrate dev

seed:
	cd ${backend_home} && docker compose exec backend yarn prisma db seed

prepare-backend: prepare-env docker-build-backend docker-compose-up-backend migrate seed docker-compose-stop-backend

run-all-tests: prepare-env yarn-build-backend docker-build-backend docker-compose-up-backend migrate docker-compose-stop-backend test-backend stop-all

run-backend: prepare-backend yarn-build-backend yarn-run-backend
start-backend: prepare-backend docker-compose-up-backend
stop-backend: docker-compose-stop-backend
run-frontend: yarn-build-frontend yarn-run-frontend
start-frontend: docker-compose-up-frontend
stop-frontend: docker-compose-stop-frontend
start-all: prepare-backend docker-compose-up
stop-all: docker-compose-down