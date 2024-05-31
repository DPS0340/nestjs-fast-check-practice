FROM node:lts-alpine as builder

WORKDIR /builder

RUN apk add curl bash

RUN curl -fsSL https://bun.sh/install | bash

COPY . .

RUN ~/.bun/bin/bun i

RUN ~/.bun/bin/bun build

FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN ~/.bun/bin/bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
