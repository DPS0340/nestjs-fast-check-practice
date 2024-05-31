FROM node:lts-alpine as builder

WORKDIR /builder

RUN apk add curl bash

RUN curl -fsSL https://bun.sh/install | bash

COPY . .

RUN echo -e 'export BUN_INSTALL="$HOME/.bun"\n\
    export PATH="$BUN_INSTALL/bin:$PATH"' > ~/.bashrc

SHELL ["/bin/bash", "-c"]

RUN bun i

RUN bun build

FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
