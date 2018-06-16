all:
	make clean
	make redis
	make backend
	make web
web:
	git pull
	docker build -t bidtactoe-web .
	docker run -it -p 80:80 -d bidtactoe-web
backend:
	docker pull briungri/bidtactoe-backend
	docker run -it --link btt-redis:redis -p 3001:3001 -d briungri/bidtactoe-backend
redis:
	docker run --name btt-redis -d redis
clean:
	docker ps -a -q | xargs -n 1 -P 8 -I {} docker stop {} | xargs -n 1 -P 8 -I {} docker rm {}
morespace:
	docker system prune