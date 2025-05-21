# Configuración.
BASE_NAME := node_utils
SRC_FOLDER := $(PWD)/src
DOCKER_VOLUMES_FOLDER := $(PWD)/000_docker_volumes
NGINX_BUILD_PORT := 8090

# Atajos.
PWD := $(shell pwd)
INSIDE_CONTAINER := $(shell [ -f /.dockerenv ] && echo true || echo false)
RUFF_NO_COLOR ?= 0
RUFF_ENV := $(if $(filter 1,$(RUFF_NO_COLOR)),NO_COLOR=1,)

# Sesión en el main.
ifeq ($(INSIDE_CONTAINER),false)

main_exec:
	@docker exec -ti \
		--workdir $(PWD) \
		--user node \
		$(BASE_NAME)_typescript \
		/bin/bash ; \
	exit 0

endif

# Ejecuta el modo desarrollo.
ifeq ($(INSIDE_CONTAINER),false)

yarn_dev:
	@docker exec -ti \
		--workdir $(PWD)/$(BASE_NAME) \
		--user node \
		$(BASE_NAME)_typescript \
		/bin/bash -c "yarn dev"; \
	exit 0

endif

# Sirve el build con NGINX.
ifeq ($(INSIDE_CONTAINER),false)

nginx_test_build:
	@docker run -ti --rm \
		-p $(NGINX_BUILD_PORT):80 \
		-v $(PWD)/$(BASE_NAME)/dist:/usr/share/nginx/html:ro \
		nginx

endif

# Limpia activos.
ifeq ($(INSIDE_CONTAINER),false)

clean:
	@read -p "¿Eliminar infraestructura Docker [s/N]? " confirm && \
	if [ "$$confirm" = "s" ]; then \
		docker ps --filter name=$(BASE_NAME)* -q | xargs -r docker stop -t0; \
		docker ps -a --filter name=$(BASE_NAME)* -q | xargs -r docker rm; \
		docker image ls --filter reference=*$(BASE_NAME)* -q | xargs -r docker image rm; \
		docker network ls --filter name=$(BASE_NAME) -q | xargs -r docker network rm; \
	fi

endif

# Crear la aplicación.
ifeq ($(INSIDE_CONTAINER),true)

bootstrap_app:
	@yarn create vite $(BASE_NAME) --template react-ts
	@cd $(BASE_NAME) && yarn install && yarn add -D @types/node
	@sed -i 's|    "dev": "vite",|    "dev": "vite --host",|' $(BASE_NAME)/package.json

endif
