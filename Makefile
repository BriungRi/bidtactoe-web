all:
	make web
	make backend
web:
	docker build -t bidtactoe-web .
	docker run -p 80:3000 -d bidtactoe-web
backend:
	docker run -p 3001:3001 -d briungri/bidtactoe-backend