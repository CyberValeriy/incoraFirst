FROM node:16.15.1

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 9090

CMD ["npm","run","start:dev"]