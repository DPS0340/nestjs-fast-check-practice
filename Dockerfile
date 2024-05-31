FROM node:lts-alpine as builder

WORKDIR /builder

COPY package.json yarn.lock ./

RUN corepack install -g yarn@4.2.2
RUN corepack yarn set version 4.2.2

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:lts-alpine

WORKDIR /app

RUN corepack install -g yarn@4.2.2
RUN corepack yarn set version 4.2.2

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]