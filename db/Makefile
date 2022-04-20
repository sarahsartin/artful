
run: ## Run container on port set in docker-compose
	docker-compose up --build -d

enter:
	docker exec -it usersDB sh

down:
	docker-compose down

clean: 
	docker stop usersDB
	docker rm usersDB

clobber: clean
	docker volume rm -f users_pgdata

status:
	docker ps -a

test:
	node listUsers.js