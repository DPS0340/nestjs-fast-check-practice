FROM node:lts-alpine as builder

WORKDIR /builder

COPY package.json yarn.lock ./

RUN corepack install -g yarn@4.2.2
RUN corepack yarn set version 4.2.2

RUN corepack yarn install

COPY . .

RUN corepack yarn build

FROM node:lts-alpine

WORKDIR /app

RUN corepack install -g yarn@4.2.2
RUN corepack yarn set version 4.2.2

RUN corepack yarn install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
