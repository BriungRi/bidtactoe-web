all:
	docker build -t briungri/bidtactoe-web .
	docker push briungri/bidtactoe-web