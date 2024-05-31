FROM node:lts-alpine as builder

WORKDIR /builder

RUN apk add curl bash

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="${PATH}:~/.bun/bin/bun"

COPY . .

RUN bun i

RUN bun build

FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
