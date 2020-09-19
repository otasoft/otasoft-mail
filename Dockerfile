FROM node:12-alpine as dev

WORKDIR /usr/share/microservices/otasoft-mail

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build

# ADD dist package.json ./

# RUN yarn install --production

# FROM node:12-alpine

# WORKDIR /usr/share/microservices/otasoft-mail

# COPY --from=build /usr/share/microservices/otasoft-mail/dist ./dist

# EXPOSE 60234

# CMD ["node", "dist/main"]