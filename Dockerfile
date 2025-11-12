FROM node:25-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN chown -R node:node /usr/app

USER node

CMD npm run dev