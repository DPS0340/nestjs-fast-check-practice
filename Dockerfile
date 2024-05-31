FROM node:lts-alpine as builder

WORKDIR /builder

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build \
    && npm prune --omit=dev

FROM node:lts-alpine

WORKDIR /app

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]