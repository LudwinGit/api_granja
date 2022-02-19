FROM node:12-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm","run","start:prod"]
# FROM node:12-alpine As development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=development

# COPY . .

# RUN npm run build

# FROM node:12-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]

# FROM node:12-alpine As development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN yarn install

# COPY . .

# RUN yarn run build

# FROM node:12-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN yarn install

# COPY . .

# COPY --from=developmest /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]
