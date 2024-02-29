FROM node:lts as node

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./

RUN npm install

EXPOSE 3000 3000

COPY . .

RUN ["npm", "run", "build"]
