start:
	cd ./app && npm start
build:
	cd ./app && npm run build
lint:
	npx eslint ./app/src --ext js,jsx --fix