FROM node:12-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:12-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --from=developmest /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
