FROM node:25-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci