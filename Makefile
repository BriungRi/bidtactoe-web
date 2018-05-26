ALLCONTAINERS=docker ps -a -q

all:
	make web
	make backend
web:
	docker build -t bidtactoe-web .
	docker run -p 80:3000 -d bidtactoe-web
backend:
	docker run -p 3001:3001 -d briungri/bidtactoe-backend
clean:
	docker ps -a -q | xargs -n 1 -P 8 -I {} docker stop {} | xargs -n 1 -P 8 -I {} docker rm {}