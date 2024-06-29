FROM node:18-alpine AS build

WORKDIR /app

COPY client/package.json client/package-lock.json ./client/
COPY package.json package-lock.json ./

RUN npm install && \
    cd client && npm install

COPY . .

RUN npm run build && \
    cd client && npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]
