all:
	docker build -t bidtactoe-web .
	docker run -p 3000:3000 -d bidtactoe-web