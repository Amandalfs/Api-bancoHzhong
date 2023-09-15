FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run knex -- migrate:latest --env production

EXPOSE 8020

CMD ["npm", "run", "dev"]