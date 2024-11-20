FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./ 
COPY ./libs/prisma ./libs/prisma 

RUN npm install

COPY . .

RUN npx prisma generate --schema=./libs/prisma/prisma/schema.prisma
RUN npm run build:example

CMD [ "npm", "run", "start", "example" ]
