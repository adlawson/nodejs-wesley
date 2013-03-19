all: install

install:
	@npm install

tests:
	@./node_modules/.bin/mocha --ui tdd --reporter spec --colors --recursive ./test