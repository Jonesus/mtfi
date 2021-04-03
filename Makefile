ifneq (,$(wildcard ./.env))
	include .env
	export $(shell sed 's/=.*//' .env)
endif


ifeq ($(ENV),prod)
	COMPOSE = docker-compose
	RUN = $(COMPOSE) up -d mtfi-database mtfi-cms mtfi-web mtfi-caddy
else
	# dev
	COMPOSE = docker-compose -f docker-compose.yml -f docker-compose.${ENV}.yml
	RUN = $(COMPOSE) up --build mtfi-database mtfi-cms mtfi-web
endif

install:
	npm install
	rm -rf node_modules/sharp

build: run-backend
	$(COMPOSE) build mtfi-web

run:
	$(RUN)

run-backend:
	$(COMPOSE) up -d mtfi-database mtfi-cms
	$(COMPOSE) run wait -c ${DB_HOST}:${DB_PORT} -c ${API_HOST}:${API_PORT}

kill:
	docker-compose kill mtfi-database mtfi-cms mtfi-web caddy

deploy:	install run-backend build run
