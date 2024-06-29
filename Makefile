install:
	npm install
	cd client && npm install

build:
	npm run build
	cd client &&  npm run tw && npm run build
	
run:
	npm run dev

# migrate:
# 	dbmate up
