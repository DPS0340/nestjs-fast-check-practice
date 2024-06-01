FROM oven/bun:alpine AS builder
WORKDIR /builder

COPY . .

RUN bun install

RUN npm run build

FROM oven/bun:alpine
WORKDIR /app

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
