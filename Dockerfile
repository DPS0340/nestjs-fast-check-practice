FROM node:lts-alpine AS builder
WORKDIR /builder

# Original code from https://github.com/oven-sh/bun/issues/5545#issuecomment-1722337415
# Add dependencies to get Bun working on Alpine
RUN apk --no-cache add ca-certificates wget
RUN wget https://raw.githubusercontent.com/athalonis/docker-alpine-rpi-glibc-builder/master/glibc-2.26-r1.apk
RUN apk add --allow-untrusted --force-overwrite glibc-2.26-r1.apk
RUN rm glibc-2.26-r1.apk

RUN npm i -g bun

COPY . .

RUN bun install

RUN bun build

FROM node:lts
WORKDIR /app

# Original code from https://github.com/oven-sh/bun/issues/5545#issuecomment-1722337415
# Add dependencies to get Bun working on Alpine
RUN apk --no-cache add ca-certificates wget
RUN wget https://raw.githubusercontent.com/athalonis/docker-alpine-rpi-glibc-builder/master/glibc-2.26-r1.apk
RUN apk add --allow-untrusted --force-overwrite glibc-2.26-r1.apk
RUN rm glibc-2.26-r1.apk

RUN npm i -g bun

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
