FROM node:lts-alpine AS builder
WORKDIR /builder

RUN npm i -g bun

COPY . .

RUN bun install

RUN bun build

FROM node:lts
WORKDIR /app

RUN npm i -g bun

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
