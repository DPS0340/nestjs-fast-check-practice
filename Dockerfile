FROM node:lts-alpine as builder

WORKDIR /builder

RUN curl -fsSL https://bun.sh/install | sh && \
    export PATH="~/.bun/bin/bun:$PATH"

COPY . .

RUN bun i

RUN bun build

FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
