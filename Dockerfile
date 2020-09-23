FROM node:12-alpine as BUILD_IMAGE

RUN apk update && apk add yarn curl bash make && rm -rf /var/cache/apk/*

WORKDIR /usr/share/otasoft-mail

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

FROM node:12-alpine

WORKDIR /usr/share/otasoft-mail

RUN npm prune --production

RUN /usr/local/bin/node-prune

FROM node:12-alpine

WORKDIR /usr/share/microservices/otasoft-mail

COPY --from=BUILD_IMAGE /usr/share/microservices/otasoft-mail/dist ./dist
COPY --from=BUILD_IMAGE /usr/share/microservices/otasoft-mail/node_modules ./node_modules

EXPOSE 60324

CMD ["node", "dist/main"]
