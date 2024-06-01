FROM oven/bun:alpine AS builder
WORKDIR /builder

RUN apk add nodejs npm

COPY . .

RUN bun install

RUN npm run build

FROM oven/bun:alpine
WORKDIR /app

COPY . .

RUN apk add nodejs npm

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
