.PHONY: build run stop restart logs clean

# Build the docker image
build:
	docker-compose build

# Run the containers in background
run:
	docker-compose up -d

# Stop the containers
stop:
	docker-compose down

# Restart the containers
restart:
	docker-compose down && docker-compose up -d

# View logs
logs:
	docker-compose logs -f

# Remove all build artifacts and containers
clean:
	docker-compose down --rmi all --volumes --remove-orphans
	rm -rf .next
	rm -rf node_modules
