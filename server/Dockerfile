FROM node:lts as node

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3001 3001

COPY . .

RUN ["npm", "run", "build"]
