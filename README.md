## Docker

> docker-compose up --build -d
> docker ps

### How to start docker up
- make run
- To enter the container:
  - docker exec -it photoDB sh 

### Psql for debugging

- Login
  - psql -h 127.0.0.1 -U sarah -d artful
- show all tables
  - \dt