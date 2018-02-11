all: node_modules/justified-layout/package.json

node_modules/.bin/browserify:
	npm install browserify

node_modules/justified-layout/package.json: node_modules/.bin/browserify
	PATH=${PATH}:$(pwd)/node_modules/.bin npm install justified-layout
